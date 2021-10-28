const axios = require("axios");
const fakeProject = require("./fakeObjects.js").fakeProject;

describe('UNIT TESTS PROJECTS CRUD', () => {   
    it('should POST a project & verify it was correctly POST', async () => {
        let res = (await axios.post("http://alexis-lemaire-cv-api.herokuapp.com/projects", fakeProject)).data;
        await (fakeProject.id = res.insertId);
        expect(res).toHaveProperty("success");
    });

    it('should SELECT the fakeProject', async () => {
        let res = (await axios.get(`https://alexis-lemaire-cv-api.herokuapp.com/projects/${fakeProject.id}`)).data;
        expect(res).toBeDefined();
    });

    it('should UPDATE the fakeProject & verify it was correctly UPDATE', async () => {
        await (fakeProject.title = "Mon Faux Projet avec titre changé");
        let res = (await axios.put(`https://alexis-lemaire-cv-api.herokuapp.com/projects/${fakeProject.id}`, fakeProject)).data;
        expect(res).toHaveProperty("success");
    });

    it('should DELETE the fakeProject & verify it was correctly DELETE', async () => {
        let res = (await axios.delete(`https://alexis-lemaire-cv-api.herokuapp.com/projects/${fakeProject.id}/${fakeProject.secretKey}`)).data;
        expect(res).toHaveProperty("success");
    });
});