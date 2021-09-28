const mysql = require('mysql');
const db = mysql.createConnection({host: "localhost", user: "root", password: "", database: "mesProjets"});
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
            db.query("INSERT INTO projects VALUES(?,?,?,?,?)", [body.title, body.description, body.date, body.link, body.github], (err) => {
                if(err !== null){
                    res.json({error: err.message});
                } else {
                    res.json({success: "L'ajout du projet s'est bien déroulé"});
                }
            });
        }
    });
}

exports.Update = (req,res) => {
    db.query("SELECT secretKey FROM myKeys WHERE secretKey = ?", [req.body.secretKey], (err, result) => {
        if(result == false)
        {
            res.json({error: "La secret key est incorrecte, donc l'ajout n'a pas eu lieu."});
        } 
        else 
        {
            const body = req.body;
            db.query(
                "UPDATE projects SET title = ?, description = ?, date = ?, link = ?, github = ? WHERE id = ?", 
                [body.title, body.description, body.date, body.link, body.github, req.params.id], 
                (err) => {
                    if(err !== null){
                        res.json({error: err.message});
                    } else {
                        res.json({success: "La modification du projet s'est bien déroulée"});
                    }
            });
        }
    });
}

exports.Select = (req,res) => {
    db.query("SELECT * FROM projects WHERE id = ?", [req.params.id], (err, result) => {
        res.json(result);
    });
}

exports.SelectAll = (req,res) => {
    db.query("SELECT * FROM projects", (err, result) => {
        if(result == false)
        {
            res.json({error: "La liste des projets n'a pas pu être récupérée"});
        } 
        else 
        {
            res.json(result);
        }
    });
}

