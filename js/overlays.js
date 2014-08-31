/**
 * Copyright 2014 Robert Schroll
 * This file is part of Spelling and is distributed under the MIT license.
 */

var OverlayManager = function () {
  this.fs = require('fs');
  this.path = require('path');
  this.iconv = require(lt.objs.plugins.local_module("Spelling", "iconv-lite"));
  this.overlays = {};
  this.dictDir = "/usr/share/hunspell/";
  this.encodingRE = /^SET (.*)/m;
  return this;
}

OverlayManager.prototype = {
  getOverlay: function (lang) {
    if (this.overlays[lang] === undefined) {
      var aff, dic;
      try {
        var aff_buf = this.fs.readFileSync(this.path.join(this.dictDir, lang + ".aff")),
            encoding_match = this.encodingRE.exec(aff_buf.toString("ascii")),
            encoding = encoding_match ? encoding_match[1].replace("microsoft-", "") : "UTF-8";
        aff = this.iconv.decode(aff_buf, encoding);
        dic = this.iconv.decode(this.fs.readFileSync(this.path.join(this.dictDir, lang + ".dic")),
                                encoding);
      } catch (error) {
        return "Could not load dictionary for " + lang;
      }

      var dictionary = new Typo(lang, aff, dic, {platform: "node-webkit"}),
          alphaHash = {},
          alphabet = "";
      // Gather the alphabet used in the words in the dictionary.
      // From commented-out code in Typo.js.
      for (var word in dictionary.dictionaryTable)
        for (var i=0; i<word.length; i++)
          alphaHash[word[i]] = true;
      for (var letter in alphaHash)
        alphabet += letter;
      alphabet = alphabet.replace(/[\t'\-_\.]/g, "").split("").sort().join("");

      var word = new RegExp("[" + alphabet + "]+('[" + alphabet + "]+)*"),
          notword = new RegExp("[^" + alphabet + "]*"),
          wordstart = new RegExp("[" + alphabet + "']*$");

      this.overlays[lang] = {
        token: function (stream) {
          // Get the current word and check if it's misspelled
          if (stream.match(word) && !dictionary.check(stream.current()))
            return "spell-error";

          // If not, mark it and any following non-word characters as OK
          stream.match(notword);
          return null;
        },

        suggest: function (line, col) {
          var start = line.substring(0, col).search(wordstart),
              match = line.substring(start).match(word);
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
