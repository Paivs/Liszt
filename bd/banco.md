docker build -t liszt-postgres .

docker run -d --name liszt-db -e POSTGRES_DB=liszt  -e POSTGRES_USER=liszt_user -e POSTGRES_PASSWORD=supersecret -p 5432:5432 liszt-postgres

docker exec -it liszt-db psql -U liszt_user -d liszt