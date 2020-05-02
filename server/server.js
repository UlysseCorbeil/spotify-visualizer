
// Guidelines
// https://developer.spotify.com/documentation/general/guides/authorization-guide/

require('dotenv').config({path: "../.env"});

const Helpers =  require('../src/util/Helpers').default;

const PORT = process.env.PORT || 3001;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3001/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000';

// dependencies
const express = require('express');
const request = require('request');

// bypass Same origin policy
const cors = require('cors');

// json only !
const bodyParser = require('body-parser');

// protects agaisnt some xss attacks and get requests
const helmet = require('helmet');

// compression of app
const compression = require('compression');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const history = require('connect-history-api-fallback');

// spotify state for authentification 
const stateKey = 'spotify_auth_state';

// error handling
if (cluster.isMaster) {
    console.warn(`cluster ${process.pid} is running`);
    
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Cluster message on exit
    cluster.on('exit', (worker, code, signal) => {
        console.error(
          `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`,
        );
    });

} else {

    // start app
    const app = express();

    // For static files
    app.use(express.static(path.resolve(__dirname, '../public/')));

    app
    .use(express.static(path.resolve(__dirname, '../public/')))
    .use(cors())
    .use(compression())
    .use(helmet.frameguard())
    .use(bodyParser.json())
    .use(cookieParser())
    .use(
        history({
          verbose: true,
          rewrites: [
            { from: /\/login/, to: '/login' },
            { from: /\/callback/, to: '/callback' },
            { from: /\/refresh_token/, to: '/refresh_token' },
          ],
        }),
    )
    .use(express.static(path.resolve(__dirname, '../public/')))

    app.get('/', function (req, res) {
        res.render(path.resolve(__dirname, '../public/index.html'));
    });

    app.get('/login', function (req, res) {
        const state = Helpers.generateRandomString(16);
        res.cookie(stateKey, state);
    
        // auth from spotify api

        const scope =
          'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';
    
        res.redirect(
          `https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
          })}`,
        );
    });

    // acces and refresh access token from spotify api, using client URI
    app.get('/callback', function (req, res) {
    
        const code = req.query.code || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[stateKey] : null;
    
        if (state === null || state !== storedState) {

            res.redirect('/#' +
            querystring.stringify({
              error: 'state_mismatch'
            }));

        } else {

          res.clearCookie(stateKey);

          const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: code,
              redirect_uri: REDIRECT_URI,
              grant_type: 'authorization_code',
            },
            headers: {
              'Authorization': 'Basic' +  (new Buffer(CLIENT_ID + ':' + {CLIENT_SECRET}).toString('base64'))
            },
            json: true,
          };
    
          request.post(authOptions, function (err, res, body) {
            if (!err && res.statusCode === 200) {
              const access_token = body.access_token;
              const refresh_token = body.refresh_token;
    
              // pass token to url to make req directly
              res.redirect(FRONTEND_URI + '/#' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                })
              );
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                    error: 'invalid_token'
                }));
            }
          });
        }
    });


    // refresh token
    app.get('/refresh_token', function (req, res) {

        const refresh_token = req.query.refresh_token;
        const authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          headers: {
            'Authorization': 'Basic' +  (new Buffer(CLIENT_ID + ':' + {CLIENT_SECRET}).toString('base64'))
          },
          form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
          },
          json: true,
        };
    
        request.post(authOptions, function (error, res, body) {
          if (!error && res.statusCode === 200) {
            const access_token = body.access_token;
            res.send({ 
                'access_token': access_token
             });
          }
        });
      });
    
      
      // All remaining requests return the React app, so it can handle routing.
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
    });

    app.listen(PORT, function () {
        console.log(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
    });

}
