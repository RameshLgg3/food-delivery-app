source .env
echo "Starting Postgres"
docker ps --filter "name=postgres" --filter "status=running" | \
grep postgres && docker restart postgres || \
docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=deliveryservice -p 5432:5432 -d postgres

# docker exec -it postgres /bin/bash
# psql -h localhost -U user
# npx prisma init
# npx prisma migrate dev
# psql -h localhost -U user -d deliveryservice
# List tables
# \dt

## Redis
docker run --name redis -d -p 6379:6379 -v redis-data:/data redis

