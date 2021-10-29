const axios = require("axios");
const fakeProject = require("./helpers/fakeObjects.js").fakeProject;

describe('UNIT TESTS PROJECTS CRUD', () => {   
    it('should POST a project & verify it was correctly POST', async () => {
        let res = (await axios.post("https://alexis-lemaire-cv-api.herokuapp.com/projects", fakeProject)).data;
        await (fakeProject.id = res.insertId ? res.insertId : "007");
        expect(res).toHaveProperty("success");
    });

    it('should SELECT the fakeProject', async () => {
        let selectedProject = (await axios.get(`https://alexis-lemaire-cv-api.herokuapp.com/projects/${fakeProject.id}`)).data;
        expect(selectedProject).toHaveProperty("title");
    });

    it('should UPDATE the fakeProject & verify it was correctly UPDATE', async () => {
        await (fakeProject.title = "MonFauxProjetAvecTitreChange");
        let res = (await axios.put(`https://alexis-lemaire-cv-api.herokuapp.com/projects/${fakeProject.id}`, fakeProject)).data; 
        expect(res).toHaveProperty("success");
    });

    it('should DELETE the fakeProject & verify it was correctly DELETE', async () => {
        let res = (await axios.delete(`https://alexis-lemaire-cv-api.herokuapp.com/projects/${fakeProject.id}/${fakeProject.secretKey}`)).data;
        expect(res).toHaveProperty("success");
    });
});