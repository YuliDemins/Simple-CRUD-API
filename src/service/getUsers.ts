import { ServerResponse } from 'http';
import { wrongRoute } from './wrongRoute';
import { DBtype } from '../types/IUser';
import { StatusCodes } from '../types/StatusCodes';

export const getUsers = (
  url: string,
  response: ServerResponse,
  arr: DBtype
): void => {
  if (url === '/api/users') {
    try {
      response.writeHead(StatusCodes.OK, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify(arr));
    } catch (error) {
      response.writeHead(StatusCodes.InternalServerError, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ message: 'Server Error' }));
    }
  } else if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    const user = arr.find((i) => i.id === id);
    if (!id) {
      response.writeHead(StatusCodes.BadRequest, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ message: 'Bad Reguest' }));
    } else if (!user) {
      response.writeHead(StatusCodes.NotFound, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ message: 'Item not found' }));
    } else {
      response.writeHead(StatusCodes.OK, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify(user));
    }
  } else wrongRoute(response);
};
