import fastify from 'fastify'
import routes from './routes'

const app = fastify();
app.register(require('fastify-cors'), { origin: '*' });
app.register(routes);

console.log(`listen on port ${process.env.PORT || 3001}`)
app.listen(process.env.PORT || 3001, '0.0.0.0');
