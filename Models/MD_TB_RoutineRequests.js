/*
 * Programador: Benjamin Orellana
 * Fecha Cración: 23 /05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 *Este archivo (MD_TB_RoutineRequests.js) contiene la definición del modelo Sequelize para la tabla routine_requests.
 * Tema: Modelos - Routine Requests
 * Capa: Backend
 */

import dotenv from 'dotenv';
import db from '../DataBase/db.js';
import { DataTypes } from 'sequelize';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const RoutineRequestsModel = db.define(
  'routine_requests',
  {
    student_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    routine_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    exercise_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'atendido'),
      allowNull: false,
      defaultValue: 'pendiente'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false
  }
);

export default RoutineRequestsModel;
