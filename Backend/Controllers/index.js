const {processQuery} =require('../Agentservers/githubServer.js')
const {processWebQuery} =require('../Agentservers/exaWebSearch.js')
const {processLocalMongoDB}=require('../Agentservers/localMongoDB.js')
const {processPSQLQuery}=require('../Agentservers/neonPostSql.js')

exports.BreatingMessage = (req, res) => {
    res.send("<h1>Hola Amigos!! Agentify is Ready to Serve you!!</h1>");
}

exports.getGithubAgentResponse= async (req, res) => { 
    const userQuery = req.body.query;
    console.log(userQuery);
    try {
        const response = await processQuery(userQuery);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getExaWebSearchResponse= async (req, res) => { 
    const userQuery = req.body.query;
    console.log(userQuery);
    try {
        const response = await processWebQuery(userQuery);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.getLocalMongoDbSearch= async (req, res) => { 
    const userQuery = req.body.query;
    console.log(userQuery);
    try {
        const response = await processLocalMongoDB(userQuery);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getPQSQLExecution= async (req, res) => { 
    const userQuery = req.body.query;
    console.log(userQuery);
    try {
        const response = await processPSQLQuery(userQuery);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}