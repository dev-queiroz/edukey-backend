FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine

RUN apk add --no-cache curl
RUN curl -L https://ollama.ai/install.sh | sh

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
RUN npm install --production

EXPOSE 3000

CMD ["sh", "-c", "ollama serve & sleep 5 && ollama pull llama2 && node dist/server.js"]
