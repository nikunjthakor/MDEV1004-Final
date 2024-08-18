/**
 *  db.ts
 * Name:- Nikunj Thakor
 * StudentId:- 20055644
 * Date:- 17-08-2024
 */
let remoteURI = (process.env.Mongo_uri) as string;
let secret = (process.env.APP_SECRET) as string;

export default {
    remoteURI : remoteURI,
    secret: secret

}