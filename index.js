'use strict';

var invalidPrototcolRegex = /^(%20|\s)*(javascript|data)/im;
var ctrlCharactersRegex = /[^\x20-\x7E]/gmi;
var urlSchemeRegex = /^([^:]+):/gm;
var relativeFirstCharacters = ['.', '/'];

function isUrlWithoutProtocol(url) {
  return relativeFirstCharacters.indexOf(url[0]) > -1;
}

function sanitizeUrl(url) {
  var urlScheme, urlSchemeParseResults, sanitizedUrl;

  if (!url) {
    return 'about:blank';
  }

  sanitizedUrl = url.replace(ctrlCharactersRegex, '').trim();

  if (isUrlWithoutProtocol(sanitizedUrl)) {
    return sanitizedUrl;
  }

  urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);

  if (!urlSchemeParseResults) {
    return 'about:blank';
  }

  urlScheme = urlSchemeParseResults[0];

  if (invalidPrototcolRegex.test(urlScheme)) {
    return 'about:blank';
  }

  return sanitizedUrl;
}

module.exports = {
  sanitizeUrl: sanitizeUrl
};
