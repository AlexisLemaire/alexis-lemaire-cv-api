const fastify = require("fastify")();
require('dotenv').config();

fastify.register(require('fastify-cors'), { 
    origin: true, 
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'], 
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'], });

const mysql = require('mysql');
const db = mysql.createConnection({host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database});
db.connect((err) => { if(err){ console.log(err); } });

// ********************************* ROUTES ************************************************** //

// SELECT ALL
fastify.get('/projects', async (req, rep) => {
    db.query("SELECT * FROM mesProjets", (err, result) => {
        rep.send(result);
    });
});

// SELECT ONE 
fastify.get('/projects/:id', async (req, rep) => {
    db.query("SELECT * FROM mesProjets WHERE id = ?", [req.params.id], (err, result) => {
        rep.send(result);
    });
});

// CREATE ONE 
fastify.post('/projects', async (req, rep) => {
    db.query("SELECT secretKey FROM myKeys WHERE secretKey = ?", [req.body.secretKey], (err, result) => {
        if(result == false)
        {
            res.json({error: "La secret key est incorrecte, donc l'ajout n'a pas eu lieu."});
        } 
        else 
        {
            const body = req.body;
            db.query(
                "INSERT INTO mesProjets(title,description,date,link,github) VALUES(?,?,?,?,?)", 
                [body.title, body.description, body.date, body.link, body.github], 
                (err) => {
                    if(err !== null){
                        res.json({error: err.message});
                    } else {
                        res.json({success: "L'ajout du projet s'est bien déroulé"});
                    }
                }
            );
        }
    });
});

// DELETE ONE 
fastify.delete('/projects/:id/:secretKey', async (req, rep) => {
    db.query("SELECT secretKey FROM myKeys WHERE secretKey = ?", [req.params.secretKey], (err, result) => {
        if(result == false)
        {
            res.json({error: "La secret key est incorrecte, donc la suppression n'a pas eu lieu"});
        } 
        else 
        {
            db.query("DELETE FROM mesProjets WHERE id = ?", [req.params.id], (err) => {
                if(err !== null){
                    res.json({error: err.message});
                } else {
                    res.json({success: "La suppression du projet s'est bien déroulée"});
                }
            });
        }
    });
});

// UPDATE ONE 
fastify.put('/projects/:id', async (req, rep) => {
    db.query("SELECT secretKey FROM myKeys WHERE secretKey = ?", [req.body.secretKey], (err, result) => {
        if(result == false)
        {
            res.json({error: "La secret key est incorrecte, donc la mise à jour n'a pas eu lieu."});
        } 
        else 
        {
            const body = req.body;
            db.query(
                "UPDATE mesProjets SET title = ?, description = ?, date = ?, link = ?, github = ? WHERE id = ?", 
                [body.title, body.description, body.date, body.link, body.github, req.params.id], 
                (err) => {
                    if(err !== null){
                        res.json({error: err.message});
                    } else {
                        res.json({success: "La modification du projet s'est bien déroulée"});
                    }
                }
            );
        }
    });
});

fastify.listen(process.env.PORT || 3001);
