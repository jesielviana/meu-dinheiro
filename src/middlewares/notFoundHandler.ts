import { Request as ExRequest, Response as ExResponse } from 'express';

export function notFoundHandler() {
  return function notFoundHandler(_req: ExRequest, res: ExResponse) {
    res.status(404).send({
      message: 'Not Found',
    });
  };
}
