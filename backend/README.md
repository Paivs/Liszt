docker run -d \
  --name liszt-node \
  -e PORT=8088 \
  -e DB_URL="postgres://liszt_user:supersecret@host.docker.internal:5432/liszt" \
  -e DB_NAME="liszt" \
  -e DB_USER="liszt_user" \
  -e DB_PASS="supersecret" \
  -e JWT_SECRET="supersecretkey" \
  -e JWT_EXPIRES_IN="48h" \
  -e LOG_LEVEL="info" \
  -e LOG_FILE="logs/app.log" \
  -e DB_HOST="10.0.0.169" \
  -p 8088:8088 \
  liszt-node
