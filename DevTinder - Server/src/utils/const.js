import dotenv from 'dotenv';
dotenv.config();
export const mongo =process.env.mongo;

export const jwt_secret_key = process.env.jwt_secret_key;

export const default_pic =process.env.default_pic;
