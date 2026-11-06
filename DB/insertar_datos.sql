INSERT INTO GDT_MATERIAS (mat_materia) VALUES ('Redes de Computadoras II');
INSERT INTO GDT_MATERIAS (mat_materia) VALUES ('Programación y Plataformas Web');
INSERT INTO GDT_MATERIAS (mat_materia) VALUES ('Sistemas Embebidos');
INSERT INTO GDT_MATERIAS (mat_materia) VALUES ('Gestion de Base de Datos');
INSERT INTO GDT_MATERIAS (mat_materia) VALUES ('Probabilidad y Estadistica');
INSERT INTO GDT_MATERIAS (mat_materia) VALUES ('Pensamiento Social de la Iglesia');

COMMIT;

INSERT INTO GDT_TAREAS (tar_actividad, tar_fecha, tar_mat_codigo, tar_prioridad, tar_descripcion)
VALUES ('Practica', DATE '2026-11-03', 2, 'B', 'Gestion de Tareas');

COMMIT;
