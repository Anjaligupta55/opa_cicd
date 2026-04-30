const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());

async function checkAccess(user) {
    try {
        const response = await axios.post('http://localhost:8181/v1/data/auth/allow', { // data save to your database
            input: {
                input: {user}
            }
        });
        return response.data.result;
    } catch (error) {
        console.error('Error checking authorization:', error);
        return false;
    }
}
//public route
 app.get('/', (req, res) => {
    res.send('API is running');
});

//protected route
app.post('/secure', async (req, res) => {
    try{

    
    const user = req.body.user;
    const allowed  = await checkAccess(user);  ;
    if (allowed) {
        res.send('Access granted to data');
    } else {
        res.status(403).send('Access denied');
    }}catch(error){
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }   });

    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});