/*jslint node: true, white: true, indent: 2 */

"use strict";

var express = require('express'),
  request = require('request'),
  noptify = require('noptify'),
  http = require('http'),
  fs = require('fs'),
  qs = require('querystring'),
  url = require('url'),
  app = express(),
  port = 8080,
  objectEmpty,
  server,
  count,
  pingCount = 0,
  templates,
  templateFetchesLeft = {},
  options;

// Helper functions

objectEmpty = function (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

// Module setup

request = request.defaults({
  jar: false,
  timeout: 5000,
  maxRedirects : 9,
  headers: {
    'User-Agent' : 'WebMention-Testsuite (https://github.com/voxpelli/node-webmention-testpinger)'
  }
});

// General express setup

app
  .set('strict routing', true)
  .set('case sensitive routing', true);

// Add routes

app.get('/template', function (req, res) {
  var name = (req.query.name || '').replace('.', '-'),
    target = req.query.target;

  if (!name || !target) {
    console.error('Invalid mention request, missing mention name or target');
    res.send(404);
    return;
  }

  fs.readFile(__dirname + '/../templates/' + name + '.html', {encoding: 'utf8'}, function (err, data) {
    if (err) {
      console.error('Invalid mention', name, 'was requested');
      res.send(404);
    } else if (!options.sync && options.fetches && !templateFetchesLeft[name]) {
      console.error('Tried to fetch mention', name, 'too many times.');
      res.send(500);
    } else {
      console.log(name, 'was fetched.');
      res.send(data.replace(/http\:\/\/example\.com\/webmention\/target\/placeholder/g, target));

      if (!options.sync && options.fetches) {
        templateFetchesLeft[name] -= 1;

        if (templateFetchesLeft[name] === 0) {
          delete templateFetchesLeft[name];

          if (objectEmpty(templateFetchesLeft)) {
            console.log('Done with all', count, 'pings!', count * options.fetches, 'fetches has been done.');
            server.close();
          }
        }
      }

      if (!templates.length && !options.sync) {
        console.log('Done with all', count, 'pings!');
        server.close();
      }
    }
  });
});

// Start server

options = noptify(process.argv, { program: 'webmention-testpinger' })
   .version(require('../package.json').version)
   .option('endpoint', '-e', 'The URL of the WebMention endpoint that will receive the pings', url)
   .option('target', '-t', 'The URL of the target that will get mentioned', url)
   .option('fetches', '-f', 'After how many fetches of each mention the server should shut down. 0 means it will never shut down. Defaults to 1.', Number)
   .option('port', '-p', 'The port number to bring up the server at. Defaults to 8080.', Number)
   .option('sync', '-s', 'Keeps the server running until all ping requests has gotten responses. Ignores the --fetches option.', Boolean)
   .parse();

if (!options.endpoint || !options.target) {
  console.error("No endpoint URL and/or no target URL to ping was provided – both required");
  process.exit(1);
}

port = options.port || port;

server = http.createServer(app);
server.listen(port);

if (options.fetches === undefined) {
  options.fetches = 1;
}

fs.readdir(__dirname + '/../templates', function (err, files) {
  if (err) {
    console.error("Couldn't list test templates");
    process.exit(1);
  }

  templates = files.filter(function (file) {
    return file[0] !== '.';
  });

  count = templates.length;

  console.log('Pinging', count, 'pages targeting', options.target, 'to', options.endpoint);

  templates.forEach(function (file) {
    file = file.slice(0, 0 - '.html'.length);

    templateFetchesLeft[file] = options.fetches;

    var source = 'http://127.0.0.1:' + port + '/template?' + qs.stringify({
        name : file,
        target : options.target
      });

    request({
      url : options.endpoint,
      method: 'POST',
      form : {
        source : source,
        target : options.target
      }
    }, function (error, response, body) {
      pingCount += 1;

      if (!error && response.statusCode > 199 && response.statusCode < 300) {
        console.log(file, 'pinged.');
      } else {
        console.error(file, 'failed to be pinged.');
      }

      if (options.sync && pingCount === count) {
        server.close();
      }
    });
  });
});
