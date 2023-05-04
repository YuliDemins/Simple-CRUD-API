import { ServerResponse } from 'http';
import { DBtype } from '../types/IUser';
import { StatusCodes } from '../types/StatusCodes';
import { wrongRoute } from './wrongRoute';
import { ErrorMessage } from '../types/ErrorMessage';

export const deleteUser = (
  url: string,
  response: ServerResponse,
  arr: DBtype
) => {
  if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    try {
      const user = arr.find((i) => i.id === id);
      if (!user) {
        response.writeHead(StatusCodes.NotFound, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({ message: ErrorMessage.NotFound }));
      } else {
        const deleteUser = arr.splice(parseInt(id) - 1, 1);
        response.writeHead(StatusCodes.NoContent, {
          'Content-Type': 'application/json',
        });
        return response.end(JSON.stringify(deleteUser));
      }
    } catch (err) {
      console.log(err);
      response.writeHead(StatusCodes.InternalServerError, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ message: ErrorMessage.ServerError }));
    }
  } else {
    wrongRoute(response);
  }
};
