FROM node:22-alpine

ARG VITE_API_URL=http://backend:8000
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
