# WebMention Test Pinger

A tool to ping your site with a variety of [WebMentions](http://indiewebcamp.com/webmention) markup. Contains copies of a couple of real world examples of mentions that it enables you to ping locally to a development copy of your site.

## Real world sites included

* [VoxPelli.com](http://voxpelli.com/)
* Your site? Send a pull request with a copy of your WebMention page in the templates directory with the mention target set to "http://example.com/webmention/target/placeholder"

## Usage

First install the NPM-dependencies:

    npm install

Then run by doing:

    node . URL-TO-HUB URL-TO-MENTION

This tool will spin up a server on port 8080 (or the port defined in the PORT environment variable) and then ping the specified WebMentions hub with a URL to that server or each real world example which will return a copy of that example with a placeholder URL replaced with the requested mention target. After all pinged mentions has been fetched it will shut down the server and finish its execution.

## Requirements

* Node.js (with npm)
* Local copy of the hub you want to ping

## Changelog

### 0.1.0

* First version
