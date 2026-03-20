from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate


def get_art_gallery_prompt() -> ChatPromptTemplate:
    """
    Returns a ChatPromptTemplate for the Art Gallery Chatbot.

    The model uses a short set of curated "gallery facts" to stay grounded.
    """

    human_prompt = HumanMessagePromptTemplate.from_template(
        "You are an expert art gallery assistant. Answer politely and provide interesting details "
        "about exhibitions, artists, or artworks using the provided gallery facts.\n\n"
        "Gallery facts:\n{context}\n\n"
        "User: {question}\nAssistant:"
        "\n\nKeep the answer 2-3 sentences long."
    )

    return ChatPromptTemplate.from_messages([human_prompt])

