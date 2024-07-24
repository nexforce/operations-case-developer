import requests
import csv
import argparse

BASE_URL = "http://localhost:3000/api"  # Substitua pela URL correta da sua API


def get_inventory_data():
    response = requests.get(f"{BASE_URL}/products")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching inventory data: {response.status_code}")
        return None


def analyze_inventory(data, analysis_type, num_records):
    if not data:
        print("No data to analyze.")
        return None

    sorted_data = sorted(data, key=lambda x: x["stock"], reverse=(
        analysis_type == "highest_stock"))
    return sorted_data[:num_records]


def simplify_categories(categories):
    return ", ".join([category["name"] for category in categories])


def format_rating(rating):
    return f"{rating['rate']} ({rating['count']})"


def save_report_as_csv(analysis, filename="inventory_analysis.csv"):
    if analysis:
        keys = analysis[0].keys()
        with open(filename, "w", newline='') as file:
            dict_writer = csv.DictWriter(file, fieldnames=keys)
            dict_writer.writeheader()
            for item in analysis:
                item["Categories"] = simplify_categories(item["Categories"])
                item["rating"] = format_rating(item["rating"])
                dict_writer.writerow(item)
        print(f"Report saved as {filename}")
    else:
        print("No analysis available to save.")


def main():
    parser = argparse.ArgumentParser(
        description="Analyze product inventory.")
    parser.add_argument("--type", choices=["lowest_stock", "highest_stock"], required=True,
                        help="Type of analysis: 'lowest_stock' for products with the lowest stock, 'highest_stock' for products with the highest stock")
    parser.add_argument("--num_records", type=int, default=3,
                        help="Number of records to include in the report")
    args = parser.parse_args()

    inventory_data = get_inventory_data()
    if inventory_data:
        analysis = analyze_inventory(
            inventory_data, args.type, args.num_records)
        if analysis:
            save_report_as_csv(analysis)


if __name__ == "__main__":
    main()
