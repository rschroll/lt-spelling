/**
 * Copyright 2014 Robert Schroll
 * This file is part of Spelling and is distributed under the MIT license.
 */

var OverlayManager = function () {
  this.fs = require('fs');
  this.path = require('path');
  this.overlays = {};
  this.dictDir = "/usr/share/hunspell/";
  return this;
}

OverlayManager.prototype = {
  getOverlay: function (lang) {
    if (this.overlays[lang] === undefined) {
      var aff, dic;
      try {
        aff = this.fs.readFileSync(this.path.join(this.dictDir, lang + ".aff"), encoding="UTF-8");
        dic = this.fs.readFileSync(this.path.join(this.dictDir, lang + ".dic"), encoding="UTF-8");
      } catch (error) {
        return "Could not load dictionary for " + lang;
      }
      var dictionary = new Typo(lang, aff, dic, {platform: "node-webkit"});

      this.overlays[lang] = {
        token: function (stream) {
          var backslashes = stream.match(/\\+/);

          // Get the current word and check if it's misspelled
          if (stream.match(/\w+('\w+)*/) && !backslashes && !dictionary.check(stream.current()))
            return "spell-error";

          // If not, mark it and any following non-word characters as OK
          stream.match(/[^\w\\]*/);
          return null;
        },

        suggest: function (line, col) {
          var start = line.substring(0, col).search(/[\w']*$/),
              match = line.substring(start).match(/\w+('\w+)*/);
          if (match)
            return {start: start + match.index,
                    size: match[0].length,
                    suggestions: dictionary.suggest(match[0])};
          return {start: start, size: 0, suggestions: []}
        }
      };
    }

    return this.overlays[lang];
  },

  setDictDir: function (loc) {
    this.overlays = {};  // Reset, so read in from new location
    this.dictDir = loc;
  },

  getLanguages: function () {
    return this.fs.readdirSync(this.dictDir).map(function (val) {
      var comp = val.split(".");
      return (comp[1] === "aff") ? comp[0] : null;
    }).filter(function (val) { return val; });
  }
}
