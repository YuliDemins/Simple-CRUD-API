import { createServer, IncomingMessage, ServerResponse } from 'http';
import { getItems } from './service/getItems';
import { setItem } from './service/setItem';
import { changeItem } from './service/changeItem';
import { deleteItem } from './service/deleteItem';
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

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const { method, url } = request;

    console.log('Server request');

    switch (method) {
      case Methods.GET:
        if (url) getItems(url, response, DB);
        break;
      case Methods.POST:
        if (url) setItem(url, request, response, DB);
        break;
      case Methods.PUT:
        if (url) changeItem(url, request, response, DB);
        break;
      case Methods.DELETE:
        if (url) deleteItem(url, response, DB);
        break;
      default:
        wrongRoute(response);
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
