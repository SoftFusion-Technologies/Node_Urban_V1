/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 01 /06 / 2025
 * Versión: 1.0
 *
 * Descripción:
 * Este archivo (MD_TB_StudentMonthlyGoals.js) contiene la definición del modelo Sequelize para la tabla student_monthly_goals.
 * Tema: Modelos - StudentMonthlyGoals
 * Capa: Backend
 */

import dotenv from 'dotenv';
import db from '../DataBase/db.js';
import { DataTypes } from 'sequelize';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const StudentMonthlyGoalsModel = db.define(
  'student_monthly_goals',
  {
    student_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    objetivo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['student_id', 'mes', 'anio']
      }
    ]
  }
);

export default StudentMonthlyGoalsModel;
