import { IncomingMessage, ServerResponse } from 'http';
import { DBtype, IUser } from '../types/IUser';
import { StatusCodes } from '../types/StatusCodes';
import { wrongRoute } from './wrongRoute';

export const changeUser = (
  url: string,
  request: IncomingMessage,
  response: ServerResponse,
  arr: DBtype
): void => {
  if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    if (!id) {
      response.writeHead(StatusCodes.BadRequest, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ message: 'Bad Reguest' }));
    } else {
      try {
        let body: string = '';
        request.on('data', (chunk) => {
          body += chunk.toString();
        });
        const user = arr.find((i) => i.id === id);
        if (!user) {
          response.writeHead(StatusCodes.NotFound, {
            'Content-Type': 'application/json',
          });
          response.end(JSON.stringify({ message: 'Item not found' }));
        } else {
          request.on('end', () => {
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

              const correctUser: IUser = {
                id,
                username,
                age,
                hobbies,
              };

              arr[parseInt(id) - 1] = { ...correctUser };
              response.writeHead(StatusCodes.OK, {
                'Content-Type': 'application/json',
              });
              return response.end(JSON.stringify(correctUser));
            }
          });
        }
      } catch (err) {
        console.log(err);
        response.writeHead(StatusCodes.InternalServerError, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({ message: 'Server Error' }));
      }
    }
  } else {
    wrongRoute(response);
  }
};
