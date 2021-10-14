const axios = require("axios");

describe('UNIT TESTS PROJECTS CRUD', () => {
    let id;
    
    it('should POST a project & verify it was correctly POST', async () => {
        let res = (await axios.post("https://alexis-lemaire-cv-api/projects", fakeProject)).data;
        await expect(res).toHaveProperty("success");
    });

    it('should SELECT the fakeProject and set the id', async () => {
        id = (await axios.get(`https://alexis-lemaire-cv-api/projects/${fakeProject.title}`)).data.id;
        await expect(id).toBeDefined();
    });

    it('should UPDATE the fakeProject & verify it was correctly UPDATE', async () => {
        let res = (await axios.put(`https://alexis-lemaire-cv-api/projects/${id}`, fakeProject)).data;
        await expect(res).toHaveProperty("success");
    });

    it('should DELETE the fakeProject & verify it was correctly DELETE', async () => {
        let res = (await axios.delete(`https://alexis-lemaire-cv-api/projects/${id}/${fakeProject.secretKey}`)).data;
        await expect(res).toHaveProperty("success");
    });
});