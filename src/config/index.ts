import * as dotenv from 'dotenv';

dotenv.config();
// APP CONFIG
export const PORT = process.env.PORT;

// DB VARIABLES 
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const EXTERNAL_DB_NAME = process.env.EXTERNAL_DB_NAME;

// RABBITMQ 
export const RABBITMQ_IP = process.env.RABBITMQ_IP;
export const RABBITMQ_PORT = process.env.RABBITMQ_PORT;
export const RABBITMQ_USERNAME = process.env.RABBITMQ_USERNAME;
export const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;
export const ACTIVE_MERCHANTS = process.env.ACTIVE_MERCHANTS;
export const MAILS_QUEUE = process.env.MAILS_QUEUE