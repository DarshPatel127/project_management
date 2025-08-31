import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_ALLOW_ORIGIN,
  credentials: true,
};

//app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);   
app.use('/api/v1/projects', projectRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API is running!');
});

app.use(errorMiddleware);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
