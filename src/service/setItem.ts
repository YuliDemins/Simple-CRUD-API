import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { wrongRoute } from './wrongRoute';
import { DBtype, IUser } from '../types/IUser';
import { StatusCodes } from '../types/StatusCodes';

export const setItem = (
  url: string,
  request: IncomingMessage,
  response: ServerResponse,
  arr: DBtype
): void => {
  if (url === '/api/items') {
    try {
      let body: string = '';
      request.on('data', (chunk) => {
        body += chunk.toString();
      });

      request.on('end', () => {
        console.log(JSON.parse(body).hasOwnProperty('username'));
        if (
          !JSON.parse(body).hasOwnProperty('username') ||
          !JSON.parse(body).hasOwnProperty('age') ||
          !JSON.parse(body).hasOwnProperty('hobbies')
        ) {
          response.writeHead(StatusCodes.BadRequest, {
            'Content-Type': 'application/json',
          });
          response.end(JSON.stringify({ message: 'Bad Reguest' }));
        } else {
          const { username, age, hobbies } = JSON.parse(body);
          const getItem: IUser = {
            id: uuidv4(),
            username,
            age,
            hobbies,
          };

          response.writeHead(StatusCodes.Created, {
            'Content-Type': 'application/json',
          });
          arr.push(getItem);
          return response.end(JSON.stringify(getItem));
        }
      });
    } catch (err) {
      console.log(err);
      response.writeHead(StatusCodes.InternalServerError, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ message: 'Server Error' }));
    }
  } else wrongRoute(response);
};
