dev:
	cd app && npm start

build:
	docker compose up --build -d

stop:
	docker compose down
