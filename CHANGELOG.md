# Changelog

## 0.5.1

* Fix: Basic templates now includes a "u-url" property to avoid eg. the reply to link to be implied entry URL

## 0.5.0

* Fix for when a ping request times out
* Two new basic templates for [interaction](http://indiewebcamp.com/interactions) mentions
* New feature for multiple mentions (through multiple `--target` CLI options) and a new basic template that make use of multiple mentions. Old templates are still single-mention.

## 0.4.2

* Added all templates from @kbsriram's [checkmention](https://github.com/kbsriram/checkmention) project

## 0.4.1

* Includes the HTTP code for a failure response and if there's a Retry-After header – print it
* Uses the new `chalk.dim()` rather than `chalk.grey()` for the dim parts of the log – timestamp etc.
* Updated some dependencies

## 0.4.0

* Refactored the code to make it possible to require the template code from a Node.js project, thus making it possible to utilize the same templates as the CLI-tool within an automated test suite.
* DX-enchancement: Grunt + linting tools added to keep track of coding style

## 0.3.3

* Improved console messages. Now eg. color coded and have timestamps – the latter can be useful when eg. testing a throttling mechanism
* Improved handling of failed pings in non-sync flow – sometimes the server didn't close itself

## 0.3.2

* Added a special [like](http://indiewebcamp.com/like) WebMention example from [sandeep.io](http://www.sandeep.io/103), thanks Sandeep!
* Added WebMention example from [Tantek.com](http://tantek.com/2014/139/t1/going-homebrew-website-club-indieweb), thanks Tantek!
* Changed the VoxPelli.com example to contain a &lt;base&gt; tag so that the relative avatar it uses can be resolved to voxpelli.com even though the site is served from the test server

## 0.3.1

* Fixed error message regarding fetch of missing template

## 0.3.0

* Added new option, --fetches/-f, to configure how many times each mention should be fetched before the tool closes down. Defaults to 1.
* Added new option, --sync/-s, to provide alternative to --fetches where the tool keeps running until all ping requests has recieved responses.
* Changed how port number is set, now done through new option --port/-p rather than through an enviromental variable.
* Ensured that all instances of the placeholder URL is replaced
* Added WebMention example from [notizBlog.org](https://notizblog.org/2014/01/16/bridgy-webmentions-fuer-twitter-und-facebook/), thanks Matthias!

## 0.2.5

* Added WebMention example from [Brid.gy](http://brid.gy/), thanks Ryan! (And thanks for the link [Matthias](https://github.com/pfefferle)!)

## 0.2.4

* Critical bug fix for listing the examples

## 0.2.3

* Added WebMention example from [AaronParecki.com](aaronparecki.com/replies/2013/09/08/1/indiewebcampuk-webmention), thanks Aaron!

## 0.2.2

* Updated example on how to install and use

## 0.2.1

* Minor fixes to improve the publishing on NPM

## 0.2.0

* Added proper CLI option parsing thanks to [noptify](https://npmjs.org/package/noptify) (and [nopt](https://npmjs.org/package/nopt))
* Added binary to enable installation through NPM
* Added WebMention example from [Adactio.com](http://adactio.com/), thanks Jeremy!

## 0.1.0

* First version
