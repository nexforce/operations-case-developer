import os
import requests
import pandas as pd
from dotenv import load_dotenv


def get_movies():
    load_dotenv()
    url = os.getenv("API_URL")
    response = requests.get(f"{url}/movies")
    movies = response.json()
    return movies


def analyze_movies(movies):
    df = pd.DataFrame(movies)
    all_movies = df.shape[0]
    avg_rating = df["rating"].mean()
    avg_year = df["year"].mean()

    return {"all_movies": all_movies, "avg_rating": avg_rating, "avg_year": avg_year}


def analyze_genres(movies):
    df = pd.DataFrame(movies)
    genres = df["genre"].value_counts()
    return genres


def main():
    movies = get_movies()
    movies_result = analyze_movies(movies)
    genres_result = analyze_genres(movies)
    df_genres = pd.DataFrame(genres_result)
    df_genres.to_excel("genres.xlsx")

    df_movies = pd.DataFrame(
        movies_result.items(), columns=["metric", "value"]
    ).set_index("metric")
    df_movies.to_excel("movies.xlsx")

    df_all_movies = pd.DataFrame(movies)
    df_all_movies.to_excel("all_movies.xlsx")


main()
