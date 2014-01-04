/*jslint node: true, white: true, indent: 2 */

"use strict";

var express = require('express'),
  request = require('request'),
  http = require('http'),
  fs = require('fs'),
  qs = require('querystring'),
  app = express(),
  port = process.env.PORT || 8080,
  server,
  count,
  templates,
  hub,
  target;

// Module setup

request = request.defaults({
  jar: false,
  timeout: 5000,
  maxRedirects : 9,
  headers: {
    'User-Agent' : 'WebMention-Testsuite (https://github.com/voxpelli)'
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

  fs.readFile('templates/' + name + '.html', {encoding: 'utf8'}, function (err, data) {
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

hub = process.argv[2];
target = process.argv[3];

if (!hub || !target) {
  console.error("No hub URL and/or no target URL to ping was provided – both required");
  console.error("Should be called like: node . hub-url target-url");
  process.exit(1);
}

fs.readdir('templates', function (err, files) {
  if (err) {
    console.error("Couldn't list test templates");
    process.exit(1);
  }

  templates = files.filter(function (file) {
    return file[0] !== '.';
  });

  count = templates.length;

  console.log('Pinging', count, 'pages targeting', target, 'to', hub);

  templates.forEach(function (file) {
    file = file.slice(0, 0 - '.html'.length);

    var source = 'http://127.0.0.1:' + port + '/template?' + qs.stringify({
        name : file,
        target : target
      }),
      url = hub + qs.stringify({
        source : source,
        target : target
      });

    request({
      url : hub,
      method: 'POST',
      form : {
        source : source,
        target : target
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
