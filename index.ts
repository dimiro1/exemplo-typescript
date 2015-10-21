/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/hapi/hapi.d.ts" />
/// <reference path="typings/jade/jade.d.ts" />

import * as Hapi from 'hapi';
import * as Jade from 'jade';
import * as Path from 'path';

var Vision = require('vision');
var Hoek = require('hoek');

var server = new Hapi.Server();

const PORT = 3000;

server.register(Vision, (err) => {
    Hoek.assert(!err, err);
    server.views({
        engines: {
            jade: Jade,
        },
        relativeTo: __dirname,
        path: 'templates',
    });
});

server.connection({
    port: PORT,
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        reply.view('index', { port: PORT });
    },
});

server.route({
    method: 'GET',
    path: '/hello/{name}',
    handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        reply(`Hello ${encodeURIComponent(request.params['name']) }`);
    },
});

server.start(() => {
    console.log(`Server running on port ${PORT}`);
});
