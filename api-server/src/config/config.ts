import { envToBoolean, mustCheckEnv, mustCheckEnvValues } from "../utils/must-check-env";
const dotenv = require("dotenv");
dotenv.config();

mustCheckEnv(
  "ELASTICSEARCH_HOST",
  "FASTIFY_PORT"
);

mustCheckEnvValues('DB_SEED', ['0', '1'])

export const ELASTICSEARCH_HOST = process.env.ELASTICSEARCH_HOST as string;
export const FASTIFY_PORT = Number(process.env.FASTIFY_PORT);
export const dbSeed = envToBoolean('DB_SEED')

export const PREFIX = "/api/v1/";
export const HOST = "0.0.0.0";
