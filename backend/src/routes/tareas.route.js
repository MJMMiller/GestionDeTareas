import { Router } from 'express';
import {
  listarTareas,
  crearTarea,
  modificarTarea,
  borrarTarea,
} from '../controllers/tareas.controller.js';

const router = Router();

router.get('/', listarTareas);
router.post('/', crearTarea);
router.patch('/:codigo', modificarTarea);
router.delete('/:codigo', borrarTarea);

export default router;