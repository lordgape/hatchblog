FROM node:10-alpine

WORKDIR /var/www/hatchblog
EXPOSE 4000

COPY --chown=nobody:nobody package.json .
COPY --chown=nobody:nobody package-lock.json .

RUN rm -rf node_modules/ && npm i --production

COPY --chown=nobody:nobody . .

CMD [ "/usr/local/bin/npm", \
    "--prefix", \
    "/var/www/hatchblog", \
    "start" ]



