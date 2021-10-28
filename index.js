const fastify = require("fastify")();
fastify.register(require('fastify-cors'), { origin: '*' });
const PORT = process.env.PORT || 3001;
// require('dotenv').config(); //COMMENT IN PROD

// ********************************* ROUTES ************************************************** //

const projectsCRUD = require("./dist/projectsCRUD.js");
fastify.get('/projects', projectsCRUD.SelectAll);                // SELECT ALL
fastify.get('/projects/:id', projectsCRUD.SelectById);           // SELECT ONE BY ID
fastify.post('/projects', projectsCRUD.Insert);                  // INSERT ONE 
fastify.put('/projects/:id', projectsCRUD.Update);               // UPDATE ONE
fastify.delete('/projects/:id/:secretKey', projectsCRUD.Delete); // DELETE ONE

console.log(`listen on port ${PORT}`)
fastify.listen(PORT, '0.0.0.0');
