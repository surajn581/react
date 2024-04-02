FROM node:21-alpine
WORKDIR /app
COPY .. .
RUN npm install

EXPOSE 3000
# required for docker desktop port mapping

CMD ["npm", "run", "dev"]