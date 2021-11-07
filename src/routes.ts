import projectsCRUD from './projectsCRUD'

export default (fastify, opts, done) => {
	fastify.get('/projects', projectsCRUD.SelectAll);          
    fastify.get('/projects/:id', projectsCRUD.SelectById);          
    fastify.post('/projects', projectsCRUD.Insert);                 
    fastify.put('/projects/:id', projectsCRUD.Update);               
    fastify.delete('/projects/:id/:secretKey', projectsCRUD.Delete); 
}

