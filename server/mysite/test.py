import requests

res = requests.get("https://yacs.cs.rpi.edu/api/v5/sections.json?show_periods")

print(res.json()['sections'][0])
