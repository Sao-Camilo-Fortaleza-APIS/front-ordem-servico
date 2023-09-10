FROM node:10.13
WORKDIR /front-ordem-servico
COPY . .
EXPOSE 5175
RUN npm install
ENTRYPOINT npm run dev -- --host=0.0.0.0 --port=5175