import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import materiasRoutes from './routes/materias.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/materias', materiasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));