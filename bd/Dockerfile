FROM postgres:15

# Ativa a extensão uuid-ossp automaticamente
RUN apt-get update && apt-get install -y postgresql-contrib

# Copia o script SQL para dentro do container
COPY init.sql /docker-entrypoint-initdb.d/init.sql
