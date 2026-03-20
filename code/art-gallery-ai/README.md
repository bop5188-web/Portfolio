# Art Gallery AI Chatbot (Streamlit + LangChain)

This Streamlit app lets users ask about curated exhibitions and artists.

## Portfolio integration note

For this portfolio version, I also implemented an in-browser chatbot variant in:

- `scripts/app.js` (main site)
- mirrored copy: `code/portfolio-site/scripts/app.js`

That version keeps the same curated artist/exhibition logic so recruiters can test functionality instantly on GitHub Pages without external deployment.

## Local run

1. Create a `.env` file based on `.env.example`
2. Install dependencies: `pip install -r requirements.txt`
3. Run: `streamlit run app.py`

## What’s included

- `app.py`: Streamlit UI + OpenAI/LangChain call
- `prompts.py`: chat prompt template (2–3 sentence grounded answers)
- `gallery_api.py`: local curated dataset (exhibitions + artists)

