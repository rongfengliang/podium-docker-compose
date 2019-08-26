const express = require("express")
const Podlet = require("@podium/podlet")
const app = express();

const podlet = new Podlet({
    name: 'userlogin', // required
    version: '1.0.0', // required
    pathname: '/userlogin', // required
    development: true, // optional, defaults to false
});

podlet.proxy({ target: '/api', name: 'api' });
app.use(podlet.middleware());

app.get('/api', (req, res) => {
    res.json([{ name: 'fluffy' }]);
});

app.use('/assets', express.static('assets'));

podlet.js({ value: 'https://passport.baidu.com/static/passpc-base/js/dv/g.min.js' });
podlet.css({ value: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css' });

app.get(podlet.content(), (req, res) => {
    res.status(200).podiumSend(`
        <div>
            This is the  userlogin podlet's HTML content
            <img src="/assets/page.png"  />
        </div>
    `);
});

app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});

app.listen(7101);

