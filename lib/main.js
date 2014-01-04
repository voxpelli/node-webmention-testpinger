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
  port = process.env.PORT || 8080,
  server,
  count,
  templates,
  options;

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
    } else {
      templates.splice(templates.indexOf(name), 1);

      console.log(name, 'was fetched.');
      res.send(data.replace('http://example.com/webmention/target/placeholder', target));

      if (!templates.length) {
        console.log('Done with all', count, 'pings!');
        server.close();
      }
    }
  });
});

// Start server

server = http.createServer(app);
server.listen(port);

options = noptify(process.argv, { program: 'webmention-testpinger' })
   .version(require('../package.json').version)
   .option('endpoint', '-e', 'The URL of the WebMention endpoint that will receive the pings', url)
   .option('target', '-t', 'The URL of the target that will get mentioned', url)
   .parse();

if (!options.endpoint || !options.target) {
  console.error("No endpoint URL and/or no target URL to ping was provided – both required");
  process.exit(1);
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
      if (!error && response.statusCode > 199 && response.statusCode < 300) {
        console.log(file, 'pinged.');
      } else {
        console.error(file, 'failed to be pinged.');
      }
    });
  });
});
