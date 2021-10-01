const mysql = require('mysql');
const db = mysql.createConnection({host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database});
db.connect((err) => { if(err){ console.log(err); } });

exports.SelectAll = async (req, rep) => {
    db.query("SELECT * FROM mesProjets", (err, result) => {
        if(err !== null){
            rep.send({error: err.message});
        } 
        rep.send(result);
    });
};

exports.Select = async (req, rep) => {
    db.query("SELECT * FROM mesProjets WHERE id = ?", [req.params.id], (err, result) => {
        if(err !== null){
            rep.send({error: err.message});
        } 
        rep.send(result);
    });
}

exports.Insert = async (req, rep) => {
    db.query("SELECT secretKey FROM myKeys WHERE secretKey = ?", [req.body.secretKey], (err, result) => {
        if(result == false)
        {
            rep.send({error: "La secret key est incorrecte, donc l'ajout n'a pas eu lieu."});
        } 
        else 
        {
            const body = req.body;
            db.query(
                "INSERT INTO mesProjets(title,description,date,link,github,githubAPI) VALUES(?,?,?,?,?,?)", 
                [body.title, body.description, body.date, body.link, body.github, body.githubAPI], 
                (err) => {
                    if(err !== null){
                        rep.send({error: err.message});
                    }
                    rep.send({success: "L'ajout du projet s'est bien déroulé"});
                }
            );
        }
    });
};

exports.Update = async (req, rep) => {
    db.query("SELECT secretKey FROM myKeys WHERE secretKey = ?", [req.body.secretKey], (err, result) => {
        if(result == false)
        {
            rep.send({error: "La secret key est incorrecte, donc la mise à jour n'a pas eu lieu."});
        } 
        else 
        {
            const body = req.body;
            db.query(
                "UPDATE mesProjets SET title = ?, description = ?, date = ?, link = ?, github = ?, githubAPI = ? WHERE id = ?", 
                [body.title, body.description, body.date, body.link, body.github, body.githubAPI, req.params.id], 
                (err) => {
                    if(err !== null){
                        rep.send({error: err.message});
                    }
                    rep.send({success: "La modification du projet s'est bien déroulée"});
                }
            );
        }
    });
};

exports.Delete = async (req, rep) => {
    db.query("SELECT secretKey FROM myKeys WHERE secretKey = ?", [req.params.secretKey], (err, result) => {
        if(result == false)
        {
            rep.send({error: "La secret key est incorrecte, donc la suppression n'a pas eu lieu"});
        } 
        else 
        {
            db.query("DELETE FROM mesProjets WHERE id = ?", [req.params.id], (err) => {
                if(err !== null){
                    rep.send({error: err.message});
                } 
                rep.send("OK");
            });
        }
    });
};