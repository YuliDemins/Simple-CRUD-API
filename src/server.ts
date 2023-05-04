import { createServer, IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';
import os, { cpus } from 'os';
import { getUsers } from './service/getUsers';
import { setUser } from './service/setUser';
import { changeUser } from './service/changeUser';
import { deleteUser } from './service/deleteUser';
import { wrongRoute } from './service/wrongRoute';
import { Methods } from './types/Methods';
import { DBtype } from './types/IUser';
import 'dotenv/config';


let DB: DBtype = [
  {
    id: '1',
    username: 'Tommy',
    age: 35,
    hobbies: ['football'],
  },
  {
    id: '2',
    username: 'Arthur',
    age: 40,
    hobbies: ['IT', 'knitting'],
  },
];

const PORT = process.env.PORT || 3001;
// const PORT = 3000;
const WORKER_PORT = process.env.WORKER_PORT || 4001;
// const server = createServer((request: IncomingMessage, response: ServerResponse) => {
//     const { method, url } = request;

//     console.log('Server request');

//     switch (method) {
//       case Methods.GET:
//         if (url) getUsers(url, response, DB);
//         break;
//       case Methods.POST:
//         if (url) setUser(url, request, response, DB);
//         break;
//       case Methods.PUT:
//         if (url) changeUser(url, request, response, DB);
//         break;
//       case Methods.DELETE:
//         if (url) deleteUser(url, response, DB);
//         break;
//       default:
//         wrongRoute(response);
//     }
//   }
// );

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

if (cluster.isPrimary) {
  console.log( `Master start ${process.pid}`)
  for (let i = 0; i < cpus().length; i++){
    const port = +WORKER_PORT + i;
    const worker = cluster.fork({ WORKER_PORT: port });
  }
}
if (cluster.isWorker){
//   const server = createServer((req, res:ServerResponse) => {
// const message = `Worker start ${process.pid}`
// res.end(message)
//   }).listen(process.env.PORT, () => console.log(`server started ${process.env.PORT}, Worker start ${process.pid}`))
  const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    const { method, url } = request;

    
    console.log(`Worker ${process.pid} received request on ${url}`);

    switch (method) {
      case Methods.GET:
        if (url) {
          getUsers(url, response, DB);
        }
        break;
      case Methods.POST:
        if (url) {
          setUser(url, request, response, DB);
        }
        break;
      case Methods.PUT:
        if (url) changeUser(url, request, response, DB);
        break;
      case Methods.DELETE:
        if (url) deleteUser(url, response, DB);
        break;
      default:
        wrongRoute(response);
    }
  }
);

server.listen(process.env.WORKER_PORT, () => console.log(`server started ${WORKER_PORT}, Worker start ${process.pid}`))

}

