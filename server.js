import express from 'express';
import cors from 'cors';
import {router as userRouter} from './routes/userRouter.js'
import {router as tasksRouter} from './routes/tasksRouter.js'
const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/user', userRouter)
app.use('/tasks', tasksRouter)

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});