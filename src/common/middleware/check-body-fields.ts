import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ExceptionMessage } from '../enums/enums';

@Injectable()
export class CheckBodyFieldsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedFields = ['title', 'category', 'content']; // Разрешенные поля
    const bodyFields = Object.keys(req.body);
    const hasExtraFields = bodyFields.some(
      (field) => !allowedFields.includes(field),
    );

    if (hasExtraFields) {
      return res.status(400).json({ message: ExceptionMessage.INVALID_FIELDS });
    }

    next();
  }
}
