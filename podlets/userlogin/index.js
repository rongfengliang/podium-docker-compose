const express = require("express")
const Podlet = require("@podium/podlet")
const app = express();

const podlet = new Podlet({
    name: 'userlogin', // required
    version: '1.0.0', // required
    pathname: '/userlogin', // required
    manifest: '/manifest.json', // optional, defaults to '/manifest.json'
    development: true, // optional, defaults to false
});


app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
    res.status(200).podiumSend(`
        <div>
            This is the  userlogin podlet's HTML content
        </div>
    `);
});

app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});

app.listen(7101);

