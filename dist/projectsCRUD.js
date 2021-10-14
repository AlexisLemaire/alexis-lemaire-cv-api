var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mysql = require('mysql');
const db = mysql.createPool({ host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database });
const SelectAll = (req, rep) => __awaiter(this, void 0, void 0, function* () {
    db.query("SELECT * FROM mesProjets", (err, result) => {
        rep.send(result);
    });
});
const SelectById = (req, rep) => __awaiter(this, void 0, void 0, function* () {
    const projectID = req.params.id;
    db.query("SELECT * FROM mesProjets WHERE id = ?", projectID, (err, result) => {
        rep.send(result);
    });
});
const SelectByTitle = (req, rep) => __awaiter(this, void 0, void 0, function* () {
    const projectTitle = req.params.title;
    db.query("SELECT * FROM mesProjets WHERE title = ?", projectTitle, (err, result) => {
        rep.send(result);
    });
});
const Insert = (req, rep) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.secretKey !== process.env.secretKey) {
        rep.send({ error: "La secret key est incorrecte, donc l'ajout n'a pas eu lieu." });
    }
    else {
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const link = req.body.link;
        const github = req.body.github;
        const githubAPI = req.body.githubAPI;
        const dev = req.body.dev;
        const frontendTech = req.body.frontendTech;
        const backendTech = req.body.backendTech;
        db.query("INSERT INTO mesProjets(title,description,date,link,github,githubAPI,dev,frontendTech,backendTech) VALUES(?,?,?,?,?,?,?,?,?)", [title, description, date, link, github, githubAPI, dev, frontendTech, backendTech], (err) => {
            err ? rep.send({ error: err.message }) : rep.send({ success: "L'ajout du projet s'est bien déroulé" });
        });
    }
});
const Update = (req, rep) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.secretKey !== process.env.secretKey) {
        rep.send({ error: "La secret key est incorrecte, donc l'ajout n'a pas eu lieu." });
    }
    else {
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const link = req.body.link;
        const github = req.body.github;
        const githubAPI = req.body.githubAPI;
        const dev = req.body.dev;
        const frontendTech = req.body.frontendTech;
        const backendTech = req.body.backendTech;
        const projectID = req.params.id;
        db.query("UPDATE mesProjets SET title = ?, description = ?, date = ?, link = ?, github = ?, githubAPI = ?, dev = ?, frontendTech = ?, backendTech = ? WHERE id = ?", [title, description, date, link, github, githubAPI, dev, frontendTech, backendTech, projectID], (err) => {
            err ? rep.send({ error: err.message }) : rep.send({ success: "La mise à jour du projet s'est bien déroulée" });
        });
    }
});
const Delete = (req, rep) => __awaiter(this, void 0, void 0, function* () {
    if (req.params.secretKey !== process.env.secretKey) {
        rep.send({ error: "La secret key est incorrecte, donc la suppression n'a pas eu lieu." });
    }
    else {
        const projectID = req.params.id;
        db.query("DELETE FROM mesProjets WHERE id = ?", [projectID], (err) => {
            err ? rep.send({ error: err.message }) : rep.send({ success: "La suppression du projet s'est bien déroulée" });
        });
    }
});
module.exports = {
    SelectById, SelectByTitle, SelectAll, Insert, Update, Delete
};
//# sourceMappingURL=projectsCRUD.js.map