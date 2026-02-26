import requests
import csv

API_KEY = "IkcNkbTDqH1oNOURXHQu2wlCM6YtFaoyPu2iHnVh"

url = "https://api.eia.gov/v2/petroleum/pri/spt/data/"

params = {
    "api_key": API_KEY,
    "frequency": "monthly",
    "data[0]": "value",
    "facets[product][]": "EPCBRENT",
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    "length": 60
}

response = requests.get(url, params=params)
data = response.json()

# Print to screen
for row in data["response"]["data"]:
    print(f"{row['period']}  |  ${row['value']} per barrel  |  {row['product-name']}")

# Save to CSV
with open("brent_crude_monthly.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["period", "price_per_barrel", "product"])
    for row in data["response"]["data"]:
        writer.writerow([row["period"], row["value"], row["product-name"]])

print("\nSaved to brent_crude_monthly.csv")