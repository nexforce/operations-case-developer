import sqlite3
import csv
import os

db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../database.sqlite')

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT id, name, stock FROM inventory")
items = cursor.fetchall()

conn.close()

items_list = [{'id': row[0], 'name': row[1], 'stock': row[2]} for row in items]

min_stock = min(items_list, key=lambda x: x['stock'])
max_stock = max(items_list, key=lambda x: x['stock'])

report = [
    ['Type', 'ID', 'Name', 'Stock'],
    ['Min Stock', min_stock['id'], min_stock['name'], min_stock['stock']],
    ['Max Stock', max_stock['id'], max_stock['name'], max_stock['stock']]
]

csv_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'inventory_report.csv')

if os.path.exists(csv_file_path):
    os.remove(csv_file_path)

with open(csv_file_path, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(report)

print(f"Análise concluída. Relatório: {csv_file_path}")
