import psycopg2
import json
import sys
import pandas as pd

def connect_to_db():
    """Connect to the PostgreSQL database."""
    try:
        connection = psycopg2.connect(
            dbname="",
            user="dba",
            password="password",
            host="localhost",
            port="5432"
        )
        return connection
    except psycopg2.Error as e:
        print(f"Error connecting to the database: {e}")
        sys.exit(1)

def fetch_data(connection, query):
    """Fetch data from the PostgreSQL database."""
    try:
        cursor = connection.cursor()
        cursor.execute(query)
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        data = [dict(zip(columns, row)) for row in rows]
        cursor.close()
        return data
    except psycopg2.Error as e:
        print(f"Error fetching data: {e}")
        sys.exit(1)

def export_to_json(data, filename):
    """Export data to a JSON file."""
    try:
        with open(filename, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Data exported successfully to {filename}")
    except IOError as e:
        print(f"Error writing JSON file: {e}")
        sys.exit(1)

def main():
    """Main function to connect to the database, fetch data, and export to JSON."""
    connection = connect_to_db()
    
    # Define your query here
    query = "SELECT * FROM Pet"
    
    data = fetch_data(connection, query)
    export_to_json(data, 'data_export.json')
    
    connection.close()

if __name__ == "__main__":
    main()