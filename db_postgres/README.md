# Postgres with startup config, Prometheus and Grafana

config\ - postgresql.conf
data\ - storadge for PostgreSQL
db_init\ - init SQL scripts
pgadmin\ - storadge foe PGAdmin
prometheus\ - queries
README.md - this ReadMe

## Build & runner

1. Rename .env.example in .env
2. Edit .env
3. Put initial SQL-scripts in .\db\db_init
4. Edit .\db\config\postgresql.conf when necessary
5. Edit .\db\prometheus\queries.yaml when necessary
6. Run docker-compose
7. Go to http://localhost:5050 and add postgres_container to servers
8. Go to http://localhost:9090 and config Prometheus
9. Go to http://localhost:3000 and config Grafana

## .env - configuration

NETWORK=postgres
PROMETHEUS_CONF=./prometheus/prometheus.yml
POSTGRES_DB=testdb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_CONF=./db/conf/postgresql.conf
PGDBINIT_VOL=./db/db_init
PGDATA_VOL=./db/data
PGADMIN_DEFAULT_EMAIL=email@example.com
PGADMIN_DEFAULT_PASSWORD=postgres
PGADMIN_DATA_VOL=./db/pgadmin
PPG_EXPORTER_YAML=./db/prometheus/queries.yaml