/**
 *  app.ts
 * Name:- Nikunj Thakor
 * StudentId:- 20055644
 * Date:- 17-08-2024
 */

import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
// import the User Model
import User from '../Models/user';


dotenv.config();

// modules for auth
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';

// prevent memory leaks with memorystore
import createMemoryStore from 'memorystore';
const MemoryStore = createMemoryStore(session);


// modules for JWT support
import cors from 'cors';
import passportJWT from 'passport-jwt';

// define JWT Aliases
let JWTStrategy = passportJWT.Strategy; // alias
let ExtractJWT = passportJWT.ExtractJwt; // alias

//authentication strategy
//let strategy = passportLocal.Strategy; 

// import mongoose
import mongoose from 'mongoose';
import db from './db';

mongoose.connect(db.remoteURI);

// DB Connection 
mongoose.connection.on('connected', () => {
  console.log(`Connected to My MongoDB atlas`);
})

import indexRouter from '../Routes/index';
import bookRouter from '../Routes/book';

import { dot } from 'node:test/reporters';

//create an Express App
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// add cors to the config
app.use(cors());

//  express session
app.use(session({
  cookie: { maxAge: 86400000}, // 1 day in milliseconds
  store: new MemoryStore({checkPeriod: 86400000}), // 1 day in milliseconds
  secret: db.secret,
  saveUninitialized: false,
  resave: false
}));

// passport and session
app.use(passport.initialize());
app.use(passport.session());

// implement auth strategy
passport.use(User.createStrategy());

// serialize and deserialize
passport.serializeUser(User.serializeUser() as any);
passport.deserializeUser(User.deserializeUser());

//setup JWT options
let jwtOptions = 
{
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: db.secret
};

// setup JWT Strategy
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) =>
  {
    try 
    {
      const user = User.findById(jwt_payload.id);
      if (user) 
      {
        return done(null, user);
      } 
      return done(null, false);
  
    } catch (error) 
    {
      return done(error, null);  
    }
  });

// deploy the Jwt strategy
passport.use(strategy);

app.use('/api', indexRouter);
app.use('/api/book', bookRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next : NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('error - please use /api as a route prefix for your API requests');
});

export default app;
