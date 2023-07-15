import fastify from "fastify";
import { FASTIFY_PORT, HOST, PREFIX, dbSeed } from "./config/config";
import rootRouter from "./router";
import { seeBookData } from "./seeders/seedBookData";
import cors from '@fastify/cors'

const JoiCompiler = require("joi-compiler");
const joiCompilerInstance = JoiCompiler();

const server = fastify({
  schemaController: {
    bucket: joiCompilerInstance.bucket,
    compilersFactory: {
      buildValidator: joiCompilerInstance.buildValidator,
    },
  },
});

void (async () => {
  try {
    server.listen({ port: FASTIFY_PORT, host: HOST });
    if(dbSeed){
      await seeBookData();
    }
  } catch (error) {
    console.log(error);
  }
})();

server.register(cors, {
  origin: "*",
});

server.register(rootRouter, { prefix: PREFIX });
console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
