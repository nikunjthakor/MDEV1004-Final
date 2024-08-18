/**
 *  index.ts
 * Name:- Nikunj Thakor
 * StudentId:- 20055644
 * Date:- 17-08-2024
 */
import express from 'express';
const router = express.Router();

import { ProcessLogin, ProcessLogout, ProcessRegistration } from '../Controllers/auth';

/* Auth Routes Endpoints */

/* Register User */
router.post('/register', (req, res, next) => {  ProcessRegistration(req, res, next); });

/* Login User */
router.post('/login', (req, res, next) => {  ProcessLogin(req, res, next); });

/* Logout User */
router.get('/logout', (req, res, next) => {  ProcessLogout(req, res, next);});



export default router;
