const {processQuery} =require('../Agentservers/githubServer.js')


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