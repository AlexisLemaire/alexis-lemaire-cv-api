import fastify from 'fastify'
import projectsCRUD from './projectsCRUD'
const app = fastify();
const PORT = process.env.PORT || 3001;

app.register(require('fastify-cors'), { origin: '*' });
// require('dotenv').config(); //COMMENT IN PROD

// ********************************* ROUTES ************************************************** //

app.get('/projects', projectsCRUD.SelectAll);                // SELECT ALL
app.get('/projects/:id', projectsCRUD.SelectById);           // SELECT ONE BY ID
app.post('/projects', projectsCRUD.Insert);                  // INSERT ONE 
app.put('/projects/:id', projectsCRUD.Update);               // UPDATE ONE
app.delete('/projects/:id/:secretKey', projectsCRUD.Delete); // DELETE ONE

console.log(`listen on port ${PORT}`)
app.listen(PORT, '0.0.0.0');
