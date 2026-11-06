import { Router } from 'express';
import { listarMaterias } from '../controllers/materias.controller.js';

const router = Router();

router.get('/', listarMaterias);

export default router;