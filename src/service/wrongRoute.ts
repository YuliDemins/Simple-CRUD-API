import { ServerResponse } from 'http';
import { StatusCodes } from '../types/StatusCodes';
import { ErrorMessage } from '../types/ErrorMessage';

export const wrongRoute = (response: ServerResponse): void => {
  response.writeHead(StatusCodes.NotFound, {
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify({ message: ErrorMessage.IncorrectRoute }));
};
