import requests
import csv
import os

API_KEY = os.environ.get("EIA_API_KEY", "IkcNkbTDqH1oNOURXHQu2wlCM6YtFaoyPu2iHnVh")

# --- Brent Crude ---
brent_url = "https://api.eia.gov/v2/petroleum/pri/spt/data/"
brent_params = {
    "api_key": API_KEY,
    "frequency": "monthly",
    "data[0]": "value",
    "facets[product][]": "EPCBRENT",
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    "length": 60
}

response = requests.get(brent_url, params=brent_params)
data = response.json()

with open("public/data/brent_crude_monthly.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["period", "price_per_barrel", "product"])
    for row in data["response"]["data"]:
        writer.writerow([row["period"], row["value"], row["product-name"]])

print("Brent crude data saved.")

# --- Henry Hub Natural Gas ---
gas_url = "https://api.eia.gov/v2/natural-gas/pri/fut/data/"
gas_params = {
    "api_key": API_KEY,
    "frequency": "monthly",
    "data[0]": "value",
    "facets[series][]": "RNGWHHD",
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    "length": 60
}

response = requests.get(gas_url, params=gas_params)
data = response.json()

with open("public/data/henry_hub_monthly.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["period", "price_per_mmbtu", "product"])
    for row in data["response"]["data"]:
        writer.writerow([row["period"], row["value"], row["series-description"]])

print("Henry Hub data saved.")