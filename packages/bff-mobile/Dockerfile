# Este Dockerfile esta escrito para ser buildeado en el root del monorepo
# ver apartado de builds en el README del root

FROM node:lts-alpine

WORKDIR /usr/src/bff-mobile

COPY package.json yarn*.lock .npmrc-cred .npmrc ./

COPY packages/bff-mobile ./packages/bff-mobile

COPY packages/common ./packages/common

RUN NPM_CONFIG_USERCONFIG=./.npmrc-cred yarn

EXPOSE 3000

CMD [ "yarn", "bff-mobile:prod" ]
