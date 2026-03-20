import logging
import os

import streamlit as st
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain

from gallery_api import ARTISTS, EXHIBITIONS, get_artist_info, get_exhibition_info
from prompts import get_art_gallery_prompt


# -------------------------
# Load environment variables
# -------------------------
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    st.error("No OpenAI API key found. Add it to `.env` as `OPENAI_API_KEY=...`")
    st.stop()

os.environ["OPENAI_API_KEY"] = api_key


# -------------------------
# Setup logging
# -------------------------
logging.basicConfig(
    filename="chatbot.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)


def build_context(user_question: str) -> str:
    """
    Creates a short "gallery facts" context from the local dataset.
    This keeps answers grounded in your curated info instead of hallucinating.
    """
    q = user_question.lower()
    facts = []

    for name in EXHIBITIONS.keys():
        if name.lower() in q:
            facts.append(f"Exhibition: {name}\n{get_exhibition_info(name)}")

    for name in ARTISTS.keys():
        if name.lower() in q:
            facts.append(f"Artist: {name}\n{get_artist_info(name)}")

    if not facts:
        # Provide at least one hint so the model stays helpful.
        return "We have curated info for exhibitions and artists. Try asking about a specific artist (e.g., Monet) or exhibition (e.g., Modern Art)."

    # Keep it compact—your prompt asks for short responses.
    return "\n\n".join(facts)


# -------------------------
# Streamlit UI
# -------------------------
st.set_page_config(page_title="Art Gallery AI Chatbot", page_icon="🎨", layout="centered")
st.title("🎨 Art Gallery AI Chatbot")
st.write("Ask questions about our gallery, exhibitions, or artists.")


if "history" not in st.session_state:
    st.session_state.history = []


user_input = st.text_input("Your question:", placeholder="Try: Tell me about Monet")

if user_input:
    try:
        context = build_context(user_input)
        prompt_template = get_art_gallery_prompt()

        llm = ChatOpenAI(temperature=0.2, model_name="gpt-3.5-turbo")
        chain = LLMChain(llm=llm, prompt=prompt_template)

        response = chain.run({"question": user_input, "context": context})

        st.write(response)

        st.session_state.history.append({"user": user_input, "bot": response})

        st.write("### Chat History")
        for chat in st.session_state.history:
            st.markdown(f"**You:** {chat['user']}")
            st.markdown(f"**Bot:** {chat['bot']}")

        logging.info("User asked: %s", user_input)
        logging.info("Bot responded: %s", response)
    except Exception as e:
        st.error(f"Oops, something went wrong: {e}")
        logging.exception("Chatbot error")

