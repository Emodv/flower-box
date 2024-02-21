import express, { Request, Response } from 'express';

const app = express();
const port = 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, worlds!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
