//express server to get access token and user data from github

var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

const CLIENT_ID = "Ov23liM0IKevXYNvjh2J";
const CLIENT_SECRET = "1437fbb0e1bfd6437d0491887c3b9f9e9d88f546";


var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
    });

    try {
        const response = await fetch(`https://github.com/login/oauth/access_token?${params}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get access token');
        }

        const data = await response.json();
        console.log(data);

        // Assuming you want to redirect to a front-end URL
        const redirectUrl = `http://localhost:3000/metamask`;

        // Redirect the user to the specified URL
        res.redirect(redirectUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/getUserData', async function (req, res)  {
    req.get('Authorization');
    await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            'Authorization': req.get('Authorization')
        }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            res.json(data);
        });
});

app.listen(4000, function () {
    console.log('CORS-enabled web server listening on port 4000');
    });