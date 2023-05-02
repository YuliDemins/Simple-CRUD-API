import { ServerResponse } from 'http';
import { DBtype } from '../types/IUser';
import { StatusCodes } from '../types/StatusCodes';
import { wrongRoute } from './wrongRoute';

export const deleteItem = (
  url: string,
  response: ServerResponse,
  arr: DBtype
) => {
  if (url?.startsWith('/api/items/')) {
    const id = url.split('/')[3];
    try {
      const item = arr.find((i) => i.id === id);
      if (!item) {
        response.writeHead(StatusCodes.NotFound, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({ message: 'Item not found' }));
      } else {
        const deleteItem = arr.splice(parseInt(id) - 1, 1);
        response.writeHead(StatusCodes.NoContent, {
          'Content-Type': 'application/json',
        });
        return response.end(JSON.stringify(deleteItem));
      }
    } catch (err) {
      console.log(err);
      response.writeHead(StatusCodes.InternalServerError, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ message: 'Server Error' }));
    }
  } else {
    wrongRoute(response);
  }
};
