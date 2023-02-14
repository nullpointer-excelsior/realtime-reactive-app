
database_name := ranking-db

up-database:
	-docker rm -f $(database_name) 2> /dev/null
	docker run --name $(database_name) -e MONGO_INITDB_DATABASE=$(database_name) -e MONGO_INITDB_ROOT_USERNAME=$(database_name) \
		-e MONGO_INITDB_ROOT_PASSWORD=$(database_name) -p 27017:27017 -d mongo 
	docker ps


up-server:
	npm run start:dev


send-random-score:
	python3 score_client.py
