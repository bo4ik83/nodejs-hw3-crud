import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import {
  getContactsController,
  getContactByIdController,
} from './controllers/contactsController.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    }),
  );

  app.get('/contacts', getContactsController);

  app.get('/contacts/:contactId', getContactByIdController);

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
