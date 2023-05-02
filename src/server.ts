import { createServer, IncomingMessage, ServerResponse } from 'http';
import url from 'url';
// import querystring from 'querystring';
import { parse } from 'querystring';
import fs from 'fs';
import path, { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import { getItems } from './getItems';
import { setItem } from './setItem';
import { changeItem } from './changeItem';
import { deleteItem } from './deleteItem';
import { wrongRoute } from './wrongRoute';

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'

}
export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[]
}

export type DBtype = IUser[];

let DB: DBtype = [
  { 
    id: "1",
    username: "Tommy" ,
    age: 35,
    hobbies: ["football"]
  },
  {
    id: "2",
    username: "Arthur" ,
    age: 40,
    hobbies: ["IT", "knitting"]
  }
]

const PORT = process.env.PORT || 3001

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  const { method, url } = request;

  console.log('Server request')

  // if (url === '/api/items' && method === 'GET') {
  //   getItems(url, response, DB)
  // }
  // else if (url?.startsWith('/api/items/') && method === 'GET'){
  //   getItems(url, response, DB)
  // }
  // else if (url === '/api/items' && method === 'POST') {
  //   setItem(url, request, response, DB)
  // }
  // else if (url?.startsWith('/api/items/') && method === 'PUT'){
  //   changeItem(url, request, response, DB)
  // }
  // else if (url?.startsWith('/api/items/') && method === 'DELETE'){
  // deleteItem(url, response, DB)
  // }
  // else {
  //   wrongRoute(response)
  //   }

  switch (method) {
    case Methods.GET:
      if (url) getItems(url, response, DB)
      break
    case Methods.POST:
      if (url) setItem(url, request, response, DB)
      break
    case Methods.PUT:
      if (url) changeItem(url, request, response, DB)
      break
    case Methods.DELETE:
      if (url) deleteItem(url, response, DB)
      break
    default:
      wrongRoute(response)
  }

})

server.listen(PORT,  () => {
console.log(`Server is running on port ${PORT}`)
});

