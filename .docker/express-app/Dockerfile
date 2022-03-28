## ----------------------- BUILDER START ------------------------

# Use this image to build from TS to JS
FROM node:current-alpine AS builder

# Default directory within the container
WORKDIR /app

RUN apk -U upgrade && apk add git


# Copy needed files for npm install
COPY package.json package.json
RUN npm install

# Copy over needed files for the build 
COPY tsconfig.json /app/
COPY src/ src/

# Execute the build
RUN npx tsc --build 

## ----------------------- BUILDER END --------------------------

## ----------------------- RUNNER START -------------------------

# This is the image that the compiled app will run on
FROM node:current-alpine AS runner

# Default directory within the container
WORKDIR /app

# Copy the built files and package.json to default directory
COPY --from=builder ["/app/build/", "/app/package.json", "/app/"]

# Npm install only the production dependencies
RUN npm install --only=production

# Run the app
CMD ["node", "/app/app.js"]

## ----------------------- RUNNER END ---------------------------
