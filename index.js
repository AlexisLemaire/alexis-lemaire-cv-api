const fastify = require("fastify")();
fastify.register(require('fastify-cors'), { origin: '*' });
require('dotenv').config();
// UNCOMMENT LINE ABOVE IN DEV

// ********************************* ROUTES ************************************************** //

const projectsCRUD = require("./CRUD/projectsCRUD");
fastify.get('/projects', projectsCRUD.SelectAll);                // SELECT ALL
fastify.get('/projects/:id', projectsCRUD.Select);               // SELECT ONE BY ID
fastify.post('/projects', projectsCRUD.Insert);                  // INSERT ONE 
fastify.put('/projects/:id', projectsCRUD.Update);               // UPDATE ONE
fastify.delete('/projects/:id/:secretKey', projectsCRUD.Delete); // DELETE ONE

fastify.listen(process.env.PORT || 3001, '0.0.0.0');
