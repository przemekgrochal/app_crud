Engine prod: NodeJS v12.13.1 Mysql: 5.27

App Starter command:

RUN BACKEDN
copy _.env to .env and set variable
copy _ormconfig.json to ormconfig.json and set variable
npm install
npm run build [production]
npm run watch [dev]

RUN FRONTEND
copy _.env to .env
npm install
npm run build [production]
npm start [dev]
