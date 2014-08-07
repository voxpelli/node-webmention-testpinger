# WebMention Test Pinger

A tool to ping your site with a variety of [WebMentions](http://indiewebcamp.com/webmention) markup. Contains copies of a couple of real world examples of mentions that it enables you to ping locally to a development copy of your site.

## Real world sites included

* [AaronParecki.com](aaronparecki.com/replies/2013/09/08/1/indiewebcampuk-webmention) by [Aaron Parecki](https://github.com/aaronpk)
* [Adactio.com](http://adactio.com/journal/6495/) by [Jeremy Keith](https://github.com/adactio)
* [Brid.gy](http://brid.gy/) by [Ryan Barrett](https://github.com/snarfed) (Example code from [here](https://brid-gy.appspot.com/repost/twitter/pfefferle/423744359297585152/423756080376995840))
* [notizBlog.org](https://notizblog.org/2014/01/16/bridgy-webmentions-fuer-twitter-und-facebook/) by [Matthias Pfefferle](https://github.com/pfefferle)
* [Sandeep.io](http://www.sandeep.io/103) by [Sandeep Shetty](https://github.com/sandeepshetty) (A special [like mention](http://indiewebcamp.com/like))
* [Tantek.com](http://tantek.com/2014/139/t1/going-homebrew-website-club-indieweb) by [Tantek Çelik](https://github.com/tantek) (A special [RSVP mention](http://indiewebcamp.com/rsvp))
* [VoxPelli.com](http://voxpelli.com/2013/12/webmentions-for-static-pages/) by me, [Pelle Wessman](https://github.com/voxpelli/) (With an added &lt;base&gt; tag to resolve the avatar correctly)
* Your site? Send a pull request with a copy of your WebMention page in the templates directory with the mention target set to "http://example.com/webmention/target/placeholder"

## Test suites included

* [checkmention](https://checkmention.appspot.com/) by [KB Sriram](https://github.com/kbsriram), includes [the two xss tests](https://github.com/kbsriram/checkmention/tree/839d52b8138d53ddb2509779e5adf873a5852e9b/src/WEB-INF/checks)

## Usage on CLI

First install from NPM:

    npm install -g webmention-testpinger

Then run by doing:

    webmention-testpinger --endpoint=http://example.com/endpoint --target=http://example.com/target

This tool will spin up a server on port 8080 and then ping the specified WebMentions hub with a URL to that server or each real world example which will return a copy of that example with a placeholder URL replaced with the requested mention target. After all pinged mentions has been fetched it will shut down the server and finish its execution.

### Options

To list all available options, run:

    webmention-testpinger --help

## Usage in Node.js project

First add it from NPM:

    npm install webmention-testpinger --save-dev

Then require it and set it up:

```javascript
var WebMentionTemplates = require('webmention-testpinger').WebMentionTemplates;

var templateCollection = new WebMentionTemplates();

templateCollection.getTemplateNames().then(function (templateNames) {
  // "templateNames" contains an array of the names of all available templates
});

templateCollection.getTemplate(templateName, templateTarget).then(function (template) {
  // "template" contains the rendered HTML for the template with the name "templateName"
  // and has its webmention targeted at the "templateTarget" target URL
});
```

### Options

One can send an object into `new WebMentionTemplates()` to define some options. The possible ones are:

* **templatePath** – an absolute path to a folder in which a bunch of templates can be found

## Requirements for CLI

* Node.js (with npm)
* Local copy of the hub you want to ping

## Changelog

### 0.4.3

* Fix for when a ping request times out

### 0.4.2

* Added all templates from @kbsriram's [checkmention](https://github.com/kbsriram/checkmention) project

### 0.4.1

* Includes the HTTP code for a failure response and if there's a Retry-After header – print it
* Uses the new `chalk.dim()` rather than `chalk.grey()` for the dim parts of the log – timestamp etc.
* Updated some dependencies

### 0.4.0

* Refactored the code to make it possible to require the template code from a Node.js project, thus making it possible to utilize the same templates as the CLI-tool within an automated test suite.
* DX-enchancement: Grunt + linting tools added to keep track of coding style

### 0.3.3

* Improved console messages. Now eg. color coded and have timestamps – the latter can be useful when eg. testing a throttling mechanism
* Improved handling of failed pings in non-sync flow – sometimes the server didn't close itself

### 0.3.2

* Added a special [like](http://indiewebcamp.com/like) WebMention example from [sandeep.io](http://www.sandeep.io/103), thanks Sandeep!
* Added WebMention example from [Tantek.com](http://tantek.com/2014/139/t1/going-homebrew-website-club-indieweb), thanks Tantek!
* Changed the VoxPelli.com example to contain a &lt;base&gt; tag so that the relative avatar it uses can be resolved to voxpelli.com even though the site is served from the test server

### 0.3.1

* Fixed error message regarding fetch of missing template

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
