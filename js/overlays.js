var OverlayManager = function () {
  this.fs = require('fs');
  this.overlays = {};
  return this;
}

OverlayManager.prototype = {
  getOverlay: function (lang) {
    if (this.overlays[lang] === undefined) {
      var aff, dic;
      try {
        aff = this.fs.readFileSync("/usr/share/hunspell/" + lang + ".aff", encoding="UTF-8");
        dic = this.fs.readFileSync("/usr/share/hunspell/" + lang + ".dic", encoding="UTF-8");
      } catch (error) {
        throw "Could not load dictionary for " + lang;
      }
      var dictionary = new Typo(lang, aff, dic, {platform: "node-webkit"});

      this.overlays[lang] = {
        token: function (stream) {
          // Get the current word and check if it's misspelled
          if (stream.match(/[\w']+/) && !dictionary.check(stream.current()))
            return "spell-error";

          // If not, mark it and any following non-word characters as OK
          stream.match(/[^\w']*/);
          return null;
        }
      };
    }

    return this.overlays[lang];
  }
}
