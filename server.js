import config from './config';
import apiRouter from './api';
import express from 'express';
import expressLayout from 'express-ejs-layouts';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender';

const server = express();

server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
}));
server.use(express.static(__dirname + '/css'));

server.set('view engine', 'ejs');
server.use(expressLayout);

server.get(['/', '/contest/:contestId'], (req, res) => {
    serverRender(req.params.contestId)
        .then(({initialMarkup, initialData}) => {
            res.render('index', {
                initialMarkup,
                initialData,
            });
        })
        .catch(console.error);
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
    console.info('Express listening on port ', config.port);
});