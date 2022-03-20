FROM node:current-alpine AS builder

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY tsconfig.json /app/
COPY src/ src/

RUN npx tsc --build 

FROM node:current-alpine AS cleaner

WORKDIR /app

COPY --from=builder ["/app/build/", "/app/package.json", "/app/"]

RUN ls -la /app

RUN npm install --only=production

CMD ["node", "/app/app.js"]
