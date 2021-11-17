FROM node:16-alpine

ENV DIR_APP /home/backend

RUN mkdir -p $DIR_APP/node_modules \
  && chown -R node:node $DIR_APP

WORKDIR $DIR_APP

COPY --chown=node:node . .

RUN npm install -g @nestjs/cli
#RUN npm install
RUN yarn

USER node

EXPOSE 9002

CMD ["yarn", "start:dev"]
