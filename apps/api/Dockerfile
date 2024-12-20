FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=4900
ENV DATABASE_PATH=/app/db/dev.sqlite3
ENV JWT_SECRET=random_secret
ENV SALT_ROUNDS=10


WORKDIR /app

RUN addgroup --system api && \
          adduser --system -G api api

COPY dist/apps/api api/
RUN chown -R api:api .
RUN npm install sqlite3 --save
# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix api --omit=dev -f install
VOLUME [ "/etc/data" ]

CMD [ "node", "api" ]
