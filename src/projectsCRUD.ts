const mysql = require('mysql');
const db = mysql.createPool({host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database});

const SelectAll = async (req, rep) => {
  db.query("SELECT * FROM mesProjets", (err, result) => {
    rep.send(result);
  });
};

const SelectById = async (req, rep) => {
  const projectID : number = req.params.id;
  db.query("SELECT * FROM mesProjets WHERE id = ?", projectID, (err, result) => {
    rep.send(result);
  });
}

const Insert = async (req, rep) => {
  if(req.body.secretKey !== process.env.secretKey) {
    rep.send({error: "La secret key est incorrecte, donc l'ajout n'a pas eu lieu."});
  } else {
    const title : string = req.body.title;
    const client : string = req.body.client;
    const description : string = req.body.description;
    const date : string = req.body.date;
    const link : string = req.body.link;
    const github : string = req.body.github;
    const githubAPI : string = req.body.githubAPI;
    const dev : string = req.body.dev;
    const frontendTech : string = req.body.frontendTech;
    const backendTech : string = req.body.backendTech;
    db.query(
      "INSERT INTO mesProjets(title,client,description,date,link,github,githubAPI,dev,frontendTech,backendTech) VALUES(?,?,?,?,?,?,?,?,?,?)", 
      [title, client, description, date, link, github, githubAPI, dev, frontendTech, backendTech], 
      (err, project) => { 
        if(project){
          project.success = "L'ajout du projet s'est bien déroulé"
        }
        err ? rep.send({error: err.message}) : rep.send(project);
      }
    );
  }
};

const Update = async (req, rep) => {
  if(req.body.secretKey !== process.env.secretKey) {
    rep.send({error: "La secret key est incorrecte, donc l'ajout n'a pas eu lieu."});
  } else {
    const title : string = req.body.title;
    const client : string = req.body.client;
    const description : string = req.body.description;
    const date : string = req.body.date;
    const link : string = req.body.link;
    const github : string = req.body.github;
    const githubAPI : string = req.body.githubAPI;
    const dev : string = req.body.dev;
    const frontendTech : string = req.body.frontendTech;
    const backendTech : string = req.body.backendTech;
    const projectID : number = req.params.id;
    db.query(
      "UPDATE mesProjets SET title = ?, client = ?, description = ?, date = ?, link = ?, github = ?, githubAPI = ?, dev = ?, frontendTech = ?, backendTech = ? WHERE id = ?", 
      [title, client, description, date, link, github, githubAPI, dev, frontendTech, backendTech, projectID], 
      (err) => {
        err ? rep.send({error: err.message}) : rep.send({success: "La mise à jour du projet s'est bien déroulée"});
      }
    );
  }
};

const Delete = async (req, rep) => {
  if(req.params.secretKey !== process.env.secretKey) {
    rep.send({error: "La secret key est incorrecte, donc la suppression n'a pas eu lieu."});
  } else {
    const projectID : number = req.params.id;
    db.query("DELETE FROM mesProjets WHERE id = ?", [projectID], (err) => {
      err ? rep.send({error: err.message}) : rep.send({success: "La suppression du projet s'est bien déroulée"});
    });
  }
};

module.exports = {
  SelectById, SelectAll, Insert, Update, Delete
}