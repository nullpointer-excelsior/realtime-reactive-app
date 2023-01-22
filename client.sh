#!/bin/bash

players=("benjamin-red" "jack bauer" "arnold" "john wick", "yagami light", "hanz scorpio")

while true; do
    
    random_points=$((1 + $RANDOM % 100))
    random_time=$((1 + $RANDOM % 500))
    player="${players[$(($RANDOM % ${#players[@]}))]}"
    timestamp=$(date +"%Y-%m-%d %H:%M:%S")

    scorebody=$(cat <<EOF 
    {
        "query": "mutation(\$score: ScoreInput!) {
                createScore(score: \$score){
                    message
                }
            }",
        "variables": "{
            "score": {
                "game": "ghost-of-kiev", 
                "points": $random_points, 
                "player": "$player", 
                "playingTime": $random_time, 
            }
        }"
    }
EOF
)

    clear
    echo $scorebody
    curl -X POST -H "Content-Type: application/json" -d "$(echo "$scorebody")" http://localhost:3000/graphql # &> /dev/null || echo "[x] $timestamp Ranking service is down..."
    # curl -s -X GET -H "Content-Type: application/json" http://localhost:3000/ranking | jq 
    sleep 3

done