import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { conectar } from './db/conexion.js';
import materiasRoutes from './routes/materias.routes.js';
import tareasRoutes from './routes/tareas.route.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/materias', materiasRoutes);
app.use('/api/tareas', tareasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));