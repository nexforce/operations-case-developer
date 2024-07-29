import json
import os
import csv

import requests
import matplotlib.pyplot as plt

from datetime import datetime
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

def parse_date(date_str):
    """Parse a date string into a datetime object."""
    return datetime.fromisoformat(date_str.replace('Z', '+00:00'))

def analyze_creation_dates(creation_dates):
    """Analyze and plot creation dates."""
    plt.figure(figsize=(12, 6))
    plt.hist(creation_dates, bins=30, edgecolor='black')
    plt.xlabel('Date')
    plt.ylabel('Frequency')
    plt.title('Distribution of Product Creation Dates')
    plt.xticks(rotation=45)
    plt.tight_layout()

    plt.savefig('creation_dates_histogram.png')
    plt.show()
    print("Graph successfully saved to creation_dates_histogram.png")

def getData():
    url = 'https://api.hubapi.com/crm/v3/objects/hardwares'
    headers = {
        'Authorization': f'Bearer {os.getenv("HUBSPOT_API_KEY")}',
        'Content-Type': 'application/json'
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()

        with open('data.json', 'w') as json_file:
            json.dump(data, json_file, indent=4)
        
        print("Data successfully generated and saved to data.json")
        
        if 'results' in data:
            with open('data.csv', 'w', newline='', encoding='utf-8') as csv_file:
                writer = csv.writer(csv_file)

                headers = data['results'][0].keys() if data['results'] else []
                writer.writerow(headers)
                
                for item in data['results']:
                    writer.writerow(item.values())
            
            print("Data successfully generated and saved to data.csv")

            creation_dates = []
            for item in data['results']:
                created_at = item.get('properties', {}).get('hs_createdate')
                if created_at:
                    creation_dates.append(parse_date(created_at))
            
            if creation_dates:
                analyze_creation_dates(creation_dates)
            else:
                print("No creation dates found for analysis.")
        else:
            print("No results found to write to CSV")
    
    else:
        print(f"Error: {response.status_code}, {response.text}")

if __name__ == '__main__':
    getData()