//main server setup with fastify , cors and jwt 

const fastify = require('fastify')({ logger : true});
const cors = require('@fastify/cors');
const jwt = require('@fastify/jwt');

//register cors for front end requests
fastify.register(cors, {
    origin: 'http://localhost:5173', //vite frontend
    credentials: true
});

//setup JWT(for auth)
fastify.register(jwt, {
    secret: 'decide-later'  //important

});

//add auth decorator
fastify.decorate('authenticate', async function(request, reply){
    try{
        await request.jwtVerify();
    }
    catch(error)
    {
        reply.code(401).send({error: 'Unauthorized'});
    }
});

//register auth routes
fastify.register(require('./routes/auth'), {prefix: '/auth'});

//updates player scores
fastify.register(require('./routes/game'), {prefix : '/api/game'});

//check server state
fastify.get('/health', async (request, reply) => {
    return { status: 'ok', message: 'Backend is running!' };
});

//start server back end
const start = async () =>{
    try{
        await fastify.listen({port:3000});
        console.log("Server runnin on port 3000");
    }
    catch(err)
    {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
