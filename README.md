# alexis-lemaire-cv-api
#
#
# TO RUN THIS ON YOUR COMPUTER :
1. git clone https://github.com/AlexisLemaire/alexis-lemaire-cv-api.git
2. npm install
3. create your database with 2 tables: 
- myKeys with column secretKey, to make datas change request safely 
- mesProjets with columns id(AI PRIMARY KEY), title(varchar 150), description (varchar 2500), date(varchar 10), link (varchar 150), github (varchar 150), githubAPI (varchar 150)
4. connect your database with envs var : host, user, password, database
