import requests
import pandas as pd

api_url = "http://localhost:4000/products"

def main():
    response = requests.get(api_url)

    if response.status_code == 200:
        produtcs = response.json()
    else:
        raise Exception(f"Erro ao acessar a API: {response.status_code}")

    df = pd.DataFrame(produtcs)

    menor_estoque = df.loc[df['stock'].idxmin()]
    maior_estoque = df.loc[df['stock'].idxmax()]
    estoque_medio = df['stock'].mean()
    desvio_padrao_estoque = df['stock'].std()
    
    summary_df = pd.DataFrame({
        'Menor estoque': [menor_estoque['name']],
        'Maior estoque': [maior_estoque['name']],
        'Estoque Médio': [estoque_medio],
        'Desvio Padrão Estoque': [desvio_padrao_estoque]
    })
    summary_df.to_csv("stock_report.csv", index=False)

    print("Relatórios gerados com sucesso: 'stock_report.csv'.")

if __name__ == "__main__":
    main()
