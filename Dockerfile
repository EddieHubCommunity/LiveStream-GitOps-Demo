FROM node:14.6.0-alpine
WORKDIR /app

# Copy files from local to the container "workdir" (/app)
COPY . .

# Install dependencies
RUN npm install

EXPOSE 3000
EXPOSE 9000

CMD ["node", "src/index.js"]
