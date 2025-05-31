/*
 * Programador: Benjamin Orellana
 * Fecha Cración: 31 /05 / 2025
 * Versión: 1.0
 *
 * Descripción:
 *Este archivo (MD_TB_RoutineRequestStats.js) contiene la definición del modelo Sequelize para la tabla routine_requests.
 * Tema: Modelos - Routine Requests
 * Capa: Backend
 */

 import dotenv from 'dotenv';
 import db from '../DataBase/db.js';
 import { DataTypes } from 'sequelize';

 if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
 }

 const RoutineRequestStatsModel = db.define(
   'routine_request_stats',
   {
     instructor_id: {
       type: DataTypes.BIGINT.UNSIGNED,
       allowNull: false
     },
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
     fecha_atendida: {
       type: DataTypes.DATEONLY,
       allowNull: false
     },
     mes: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     anio: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     created_at: {
       type: DataTypes.DATE,
       defaultValue: DataTypes.NOW
     }
   },
   {
     timestamps: false
   }
 );

 export default RoutineRequestStatsModel;