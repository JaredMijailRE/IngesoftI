Table Profesor {
  id integer [pk, increment]
  email varchar(255) [unique, not null]
  username varchar(50) [unique, not null]
  password_hash varchar(255) [not null]
  first_name varchar(100) [not null]
  last_name varchar(100) [not null]
  birth_date date
  gender enum('M','F','O')
  medical_conditions text
}

Table PerfilDeportivo {
  id integer [pk, increment]
  profesor_id integer [ref: > Profesor.id]
  weight decimal(5,2) [not null]
  height decimal(5,2) [not null]
  body_fat_percentage decimal(5,2)
  muscle_mass_percentage decimal(5,2)
  recorded_at datetime [not null]
}

Table Estudiante {
  id integer [pk, increment]
  first_name varchar(100) [not null]
  last_name varchar(100) [not null]
  birth_date date
  gender enum('M','F','O')
  medical_conditions text
  weight decimal(5,2)
  height decimal(5,2)
  body_fat_percentage decimal(5,2)
  muscle_mass_percentage decimal(5,2)
}

Table PlanEntrenamiento {
  id integer [pk, increment]
  name varchar(150) [not null]
  description text
  type enum('Técnica','Velocidad','Resistencia','Fuerza') [not null]
}

Table Ejercicio {
  id integer [pk, increment]
  name varchar(150) [not null]
  unit enum('repeticiones','distancia','tiempo','peso') [not null]
  impact_area enum('Tronco Inferior','Tronco Superior','Tronco Medio','Cuerpo Completo')
  is_force boolean [default: false]
  is_resistance boolean [default: false]
  is_elasticity boolean [default: false]
  is_toning boolean [default: false]
  difficulty enum('Baja','Media','Alta')
  description text
}

Table PlanEntrenamiento_Ejercicio {
  plan_id integer [ref: > PlanEntrenamiento.id]
  ejercicio_id integer [ref: > Ejercicio.id]
  repetitions integer [not null]
  notes text

  Indexes {
    (plan_id, ejercicio_id) [pk]
  }
}

Table Grupo {
  id integer [pk, increment]
  name varchar(100) [not null]
  objectives text
  specific_objectives text
  created_at datetime [default: `NOW()`]
}

Table Grupo_Estudiante {
  grupo_id integer [ref: > Grupo.id]
  estudiante_id integer [ref: > Estudiante.id]

  Indexes {
    (grupo_id, estudiante_id) [pk]
  }
}

Table Clase {
  id integer [pk, increment]
  grupo_id integer [ref: > Grupo.id]
  plan_id integer [ref: > PlanEntrenamiento.id]
  class_date date [not null]
  start_time time [not null]
  end_time time
  recurrence_rule varchar
}

Table Asistencia {
  clase_id integer [ref: > Clase.id]
  estudiante_id integer [ref: > Estudiante.id]
  attended boolean [not null, default: false]

  Indexes {
    (clase_id, estudiante_id) [pk]
  }
}

Table Evento {
  id integer [pk, increment]
  title varchar(150) [not null]
  event_date date [not null]
  link varchar(255)
  price decimal(10,2)
  location varchar(200)
}

Table Evento_Grupo {
  evento_id integer [ref: > Evento.id]
  grupo_id integer [ref: > Grupo.id]

  Indexes {
    (evento_id, grupo_id) [pk]
  }
}

Table Evento_Estudiante {
  evento_id integer [ref: > Evento.id]
  estudiante_id integer [ref: > Estudiante.id]

  Indexes {
    (evento_id, estudiante_id) [pk]
  }
}

Table EstadisticaEntrenamiento {
  id integer [pk, increment]
  estudiante_id integer [ref: > Estudiante.id]
  ejercicio_id integer [ref: > Ejercicio.id]
  value decimal(7,2) [not null]
  unit enum('repeticiones','distancia','tiempo','peso') [not null]
  clase_id integer [ref: > Clase.id]
  recorded_at datetime [not null]
}

Table Matricula {
  id integer [pk, increment]
  estudiante_id integer [ref: > Estudiante.id]
  enrollment_fee decimal(10,2)
  account_status enum('Pendiente','Pagada','Vencida','Cancelada') [not null]
  due_date date
  payment_date date
  receipt_url varchar(255)
}
