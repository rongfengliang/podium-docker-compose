const express = require('express');
const Layout = require('@podium/layout');

const app = express();

const layout = new Layout({
    name: 'dashboard', // required
    pathname: '/', // required
});
const index = layout.client.register({
    name: 'index', // required
    uri: 'http://layout-index:7100/manifest.json', // required
});

const userlogin = layout.client.register({
    name: 'userlogin', // required
    uri: 'http://layout-userlogin:7101/manifest.json', // required
});

app.use(layout.middleware());

app.get('/', async (req, res,next) => {
    const incoming = res.locals.podium;
    const [a,b] = await Promise.all([
        index.fetch(incoming),
        userlogin.fetch(incoming),
    ]);
    incoming.view.title = 'My Super Page';
    res.podiumSend(`
    <section>${a.content}</section>
    <section>${b.content}</section>
`);
});

app.listen(7000);
