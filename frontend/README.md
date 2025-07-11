docker build -t liszt-next .

docker run -d --name liszt-frontend -e NEXT_PUBLIC_API_URL="797974db7d19" -p 3010:3010 liszt-next