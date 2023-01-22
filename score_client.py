import json
import requests
import random
import time
import os

url = 'http://localhost:3000/graphql'

query = """
mutation ($game: String!, $points: Int!, $player: String!, $playingTime: Int!) { 
    createScore(score: { game: $game, points: $points, player: $player, playingTime: $playingTime }){ message } 
}
"""

players = ["benjamin-red", "jack bauer", "arnold", "john wick", "yagami light", "hanz scorpio", "L"]



while True:
    os.system('clear')
    try:
        variables = {
            "game": "whac-a-mole",
            "points": random.randint(1,100),
            "player": random.choice(players),
            "playingTime": random.randint(1,500)
        }
        response = requests.post(url, json={'query': query, 'variables': variables})
        if response.status_code == 200:
            print(json.loads(response.content))
        else:
            print(response.message)
    except:
        print('[x] Server is down...')
    
    time.sleep(3)