FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system app-user && \
          adduser --system -G app-user app-user

COPY dist/apps/app-user app-user/
RUN chown -R app-user:app-user .
# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix app-user --omit=dev -f install

CMD [ "node", "app-user" ]
