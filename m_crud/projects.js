const mysql = require('mysql');
const db = mysql.createConnection({host: "sql4.freemysqlhosting.net", user: "sql4440706", password: "S7iFmztrFS", database: "sql4440706"});
db.connect((err) => { if(err){ console.log(err); } });

exports.Insert = (req,res) => { 
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
}

exports.Update = (req,res) => {
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
}

exports.Delete = (req,res) => {
    db.query("SELECT secretKey FROM myKeys WHERE secretKey = ?", [req.body.secretKey], (err, result) => {
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
    
}

exports.Select = (req,res) => {
    db.query("SELECT * FROM mesProjets WHERE id = ?", [req.params.id], (err, result) => {
        res.json(result);
    });
}

exports.SelectAll = (req,res) => {
    db.query("SELECT * FROM mesProjets", (err, result) => {
         res.json(result);
    });
}

