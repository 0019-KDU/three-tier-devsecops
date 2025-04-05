FROM node:18-alpine
WORKDIR /app
COPY package.json /app/
RUN npm install --legacy-peer-deps
COPY . /app/
RUN npm run build
RUN npm install -g serve@14.2.0  # Explicit version
EXPOSE 5173
CMD ["serve", "-s", "dist", "--port", "5173"]  # --port flag