import mysql from 'mysql'
import { projet } from './types/types'

const db = mysql.createPool({host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database});

const SelectAll = async (req, rep) => {
  db.query("SELECT * FROM mesProjets ORDER BY date DESC", (err, result) => {
    rep.send(result);
  });
};

const SelectById = async (req, rep) => {
  const projectID : number = req.params.id;
  db.query("SELECT * FROM mesProjets WHERE id = ?", projectID, (err, result) => {
    rep.send(result[0]);
  });
}

const Insert = async (req, rep) => {
  if(req.body.secretKey !== process.env.secretKey) {
    rep.send({error: "La secret key est incorrecte, donc l'ajout n'a pas eu lieu."});
  } else {
    const projet : projet = req.body;
    db.query(
      "INSERT INTO mesProjets(title,client,description,date,link,github,githubAPI,dev,frontendTech,backendTech,responsive) VALUES(?,?,?,?,?,?,?,?,?,?,?)", 
      [projet.title, projet.client, projet.description, projet.date, projet.link, projet.github, projet.githubAPI, 
        projet.dev, projet.frontendTech, projet.backendTech, projet.responsive], 
      (err, res) => { 
        if(res){
          res.success = "L'ajout du projet s'est bien déroulé"
        }
        err ? rep.send({error: err.message}) : rep.send(res);
      }
    );
  }
};

const Update = async (req, rep) => {
  if(req.body.secretKey !== process.env.secretKey) {
    rep.send({error: "La secret key est incorrecte, donc la modification n'a pas eu lieu."});
  } else {
    const projet : projet = req.body;
    const projectID : number = req.params.id;
    db.query(
      "UPDATE mesProjets SET title = ?, client = ?, description = ?, date = ?, link = ?, github = ?, githubAPI = ?, dev = ?, frontendTech = ?, backendTech = ?, responsive = ? WHERE id = ?", 
      [projet.title, projet.client, projet.description, projet.date, projet.link, projet.github, projet.githubAPI, 
        projet.dev, projet.frontendTech, projet.backendTech, projet.responsive, projectID], 
      (err, res) => {
        res.affectedRows === 0 ? rep.send({error: "La modification du projet n'a pas eu lieu"}) : rep.send({success: "La modification du projet s'est bien déroulée"});
      }
    );
  }
};

const Delete = async (req, rep) => {
  if(req.params.secretKey !== process.env.secretKey) {
    rep.send({error: "La secret key est incorrecte, donc la suppression n'a pas eu lieu."});
  } else {
    const projectID : number = req.params.id;
    db.query("DELETE FROM mesProjets WHERE id = ?", [projectID], (err, res) => {
      res.affectedRows === 0 ? rep.send({error: "La suppression du projet n'a pas eu lieu"}) : rep.send({success: "La suppression du projet s'est bien déroulée"});
    });
  }
};

export default {
  SelectById, SelectAll, Insert, Update, Delete
}