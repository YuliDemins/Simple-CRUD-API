import { IncomingMessage, ServerResponse } from "http";

export const checkJSON = async (request: IncomingMessage, response:ServerResponse) => {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  try {
    const data = JSON.parse(Buffer.concat(chunks).toString());
    return data;
  } catch (err) {
    console.log(err)
  }
}