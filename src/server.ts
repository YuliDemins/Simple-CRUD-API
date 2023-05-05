import { createServer, IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';
import { cpus } from 'os';
import { DBtype } from './types/IUser';
import 'dotenv/config';
import { Routes } from './routes';


let DB: DBtype = [];

const args = process.argv.slice(2);

const PORT = process.env.PORT || 3001;

const WORKER_PORT = process.env.WORKER_PORT || 4001;

export const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  Routes(request, response, DB)})

const startServer = (): void => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

const startWorkers = (): void => {
  if (cluster.isPrimary) {
    console.log( `Master start ${process.pid}`)
    for (let i = 0; i < cpus().length; i++){
      const port = +WORKER_PORT + i;
      const worker = cluster.fork({ WORKER_PORT: port });
    }
  }
  if (cluster.isWorker){
    server.listen(process.env.WORKER_PORT, () => console.log(`server started ${WORKER_PORT}, Worker start ${process.pid}`))
  }
}

if (args.length === 0) {
  startServer()
}
else {
  startWorkers()
}