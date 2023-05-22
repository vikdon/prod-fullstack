FROM postgres:15-alpine

ENV POSTGRES_DB ${POSTGRES_DB}
ENV POSTGRES_USER ${POSTGRES_USER}
ENV POSTGRES_PASSWORD ${POSTGRES_PASSWORD}
ENV PGDATA "/var/lib/postgresql/data/pgdata"

COPY ${POSTGRES_CONF} /var/lib/postgresql/data/postgresql.conf
COPY ${PGDBINIT_VOL} /docker-entrypoint-initdb.d
COPY ${PGDATA_VOL} /var/lib/postgresql/data

EXPOSE 5432

HEALTHCHECK --interval=10s --timeout=5s --retries=5 --start-period=10s

CMD pg_isready -U vduser -d vdnotesdb
CMD ["postgres", "-c", "max_connections=50", "-c", "lock_timeout=1s"]

RESTART unless-stopped