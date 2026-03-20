"""
Local curated dataset used to ground the chatbot answers.
In a future version, you can replace these dicts with a real database or museum API.
"""

EXHIBITIONS = {
    "Modern Art": "The Modern Art exhibition showcases abstract and contemporary pieces from artists worldwide.",
    "Impressionism": "The Impressionism exhibition features works by Monet, Degas, and Renoir.",
    "Sculpture Hall": "The Sculpture Hall displays 3D works from classical to modern sculptors.",
}

ARTISTS = {
    "Monet": "Claude Monet was a French painter and a founder of Impressionism, known for his water lilies series.",
    "Van Gogh": "Vincent van Gogh was a Dutch post-impressionist painter, famous for Starry Night.",
    "Picasso": "Pablo Picasso was a Spanish painter and sculptor, co-founder of Cubism.",
}


def get_exhibition_info(exhibition_name: str) -> str:
    return EXHIBITIONS.get(exhibition_name, "Sorry, we don't have information about that exhibition.")


def get_artist_info(artist_name: str) -> str:
    return ARTISTS.get(artist_name, "Sorry, we don't have information about that artist.")

