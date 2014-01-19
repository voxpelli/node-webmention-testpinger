# WebMention Test Pinger

A tool to ping your site with a variety of [WebMentions](http://indiewebcamp.com/webmention) markup. Contains copies of a couple of real world examples of mentions that it enables you to ping locally to a development copy of your site.

## Real world sites included

* [AaronParecki.com](aaronparecki.com/replies/2013/09/08/1/indiewebcampuk-webmention) by [Aaron Parecki](https://github.com/aaronpk)
* [Adactio.com](http://adactio.com/journal/6495/) by [Jeremy Keith](https://github.com/adactio)
* [Brid.gy](http://brid.gy/) by [Ryan Barrett](https://github.com/snarfed) (Example code from [here](https://brid-gy.appspot.com/repost/twitter/pfefferle/423744359297585152/423756080376995840))
* [notizBlog.org](https://notizblog.org/2014/01/16/bridgy-webmentions-fuer-twitter-und-facebook/) by [Matthias Pfefferle](https://github.com/pfefferle)
* [VoxPelli.com](http://voxpelli.com/2013/12/webmentions-for-static-pages/) by me, [Pelle Wessman](https://github.com/voxpelli/)
* Your site? Send a pull request with a copy of your WebMention page in the templates directory with the mention target set to "http://example.com/webmention/target/placeholder"

## Usage

First install the NPM-dependencies:

    npm install -g webmention-testpinger

Then run by doing:

    webmention-testpinger --endpoint=http://example.com/endpoint --target=http://example.com/target

This tool will spin up a server on port 8080 and then ping the specified WebMentions hub with a URL to that server or each real world example which will return a copy of that example with a placeholder URL replaced with the requested mention target. After all pinged mentions has been fetched it will shut down the server and finish its execution.

## Options

To list all available options, run:

    webmention-testpinger --help

## Requirements

* Node.js (with npm)
* Local copy of the hub you want to ping

## Changelog

### 0.3.0

* Added new option, --fetches/-f, to configure how many times each mention should be fetched before the tool closes down. Defaults to 1.
* Added new option, --sync/-s, to provide alternative to --fetches where the tool keeps running until all ping requests has recieved responses.
* Changed how port number is set, now done through new option --port/-p rather than through an enviromental variable.
* Ensured that all instances of the placeholder URL is replaced
* Added WebMention example from [notizBlog.org](https://notizblog.org/2014/01/16/bridgy-webmentions-fuer-twitter-und-facebook/), thanks Matthias!

### 0.2.5

* Added WebMention example from [Brid.gy](http://brid.gy/), thanks Ryan! (And thanks for the link [Matthias](https://github.com/pfefferle)!)

### 0.2.4

* Critical bug fix for listing the examples

### 0.2.3

* Added WebMention example from [AaronParecki.com](aaronparecki.com/replies/2013/09/08/1/indiewebcampuk-webmention), thanks Aaron!

### 0.2.2

* Updated example on how to install and use

### 0.2.1

* Minor fixes to improve the publishing on NPM

### 0.2.0

* Added proper CLI option parsing thanks to [noptify](https://npmjs.org/package/noptify) (and [nopt](https://npmjs.org/package/nopt))
* Added binary to enable installation through NPM
* Added WebMention example from [Adactio.com](http://adactio.com/), thanks Jeremy!

### 0.1.0

* First version
