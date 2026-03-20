# Art Gallery AI Chatbot (Streamlit + LangChain)

This Streamlit app lets users ask about curated exhibitions and artists.

## Local run

1. Create a `.env` file based on `.env.example`
2. Install dependencies: `pip install -r requirements.txt`
3. Run: `streamlit run app.py`

## What’s included

- `app.py`: Streamlit UI + OpenAI/LangChain call
- `prompts.py`: chat prompt template (2–3 sentence grounded answers)
- `gallery_api.py`: local curated dataset (exhibitions + artists)

