Spelling
========
Spelling is a Light Table plugin that provides spell checking with
[hunspell][1] dictionaries and [Typo.js][2].  It is available in the
Light Table plugin repository, or you can clone this repository into
your plugins folder.

[1]: http://hunspell.sourceforge.net/
[2]: https://github.com/cfinke/Typo.js

Usage
-----
Spelling requires you to already have the hunspell `.aff` and `.dic`
files for your language on your system.  By default, it looks for these
files in `/usr/share/hunspell/`, which is the default for some Linux
systems.  If yours are stored elsewhere, you can point Spelling towards
them by adding to your `user.behaviors` file:
```clojure
{:+ {:app [(:lt.plugins.spelling/set-dictionary-location "/path/containing/dicts")]}}
```

On Windows use the following path syntax ```"/Program Files (x86)/Mozilla Firefox/dictionaries"```

Note that hunspell dictionaries are used by Firefox, LibreOffice, and
many others, so you likely have them on your system already.  If not,
you can download dictionaries for your language from [LibreOffice][3].

[3]: http://cgit.freedesktop.org/libreoffice/dictionaries/tree/

Spelling provides commands to turn spell checking on and off on the
current editor.  By default, the language set in your environmental
variables is used, but the "Set language" command will change the
language for the current editor to the language code you provide.

Spell checking can be automatically enabled for certain file types by
adding the `:lt.plugins.spelling/enable` or
`(:lt.plugins.spelling/enable-lang <code>)` behaviors to the
appropriate tags.  For example, to enable spell checking in the default
language in all TeX files, add to your `user.behaviors` file:
```clojure
{:+ {:editor.latex [:lt.plugins.spelling/enable]}}
```

There are two modes Spelling uses to determine which words should be
spellchecked.  In the default mode, aimed at programming languages, it
checks only comments and strings.  In its markup language mode, all
strings except commands are checked.  This mode is indicated by the
presence of the `:editor.spelling.markup` tag.  By default, HTML, XML,
Markdown, LaTeX, and plain text files are given this tag.  To indicate
that editors with the tag `:foo` should use markup mode, add to your
`user.behaviors` file:
```clojure
{:+ {:foo [(:lt.object/add-tag :editor.spelling.markup)]}}
```

License
-------
Spelling is distributed under the MIT license:

Copyright 2014 Robert Schroll

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
