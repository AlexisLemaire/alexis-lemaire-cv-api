require('dotenv').config(); //COMMENT IN PROD

const fakeProject = {
    secretKey: process.env.secretKey,
    title: "MonFauxProjet",
    description: "MaFausseDescription",
    date: "2021-10-14",
    link: "https://fake-link.com",
    github: "https://fake-github.com",
    githubAPI: "https://fake-github.com",
    dev: "Maintenu",
    frontendTech: "Des techs",
    backendTech: "D'autres techs"
}

module.exports = { 
    fakeProject
}