const express = require('express');
const r = express.Router();

const CRUD = require('./m_crud/projects');
r.post('/projects', CRUD.Insert);
r.put('/projects/:id', CRUD.Update);
r.get('/projects/:id', CRUD.Select);
r.get('/projects', CRUD.SelectAll);

module.exports = r;
