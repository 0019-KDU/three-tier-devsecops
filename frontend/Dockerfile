FROM node:18-alpine
WORKDIR /app
COPY package.json /app/
RUN npm install --legacy-peer-deps
COPY . /app/
RUN npm run build
RUN npm install -g serve@13.0.2  # Version with -l support
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]  # Correct flag syntax