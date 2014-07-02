if(!lt.util.load.provided_QMARK_('lt.plugins.spelling')) {
goog.provide('lt.plugins.spelling');
goog.require('cljs.core');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');
lt.plugins.spelling.manager = new OverlayManager();
lt.plugins.spelling.default_lang = cljs.core.first.call(null,(process.env["LANG"]).split("."));
lt.plugins.spelling.addOverlay = (function addOverlay(editor,lang){lt.plugins.spelling.removeOverlay.call(null,editor);
var overlay = lt.plugins.spelling.manager.getOverlay(lang);if(typeof overlay === 'string')
{return console.log(overlay);
} else
{lt.objs.editor.__GT_cm_ed.call(null,editor).addOverlay(overlay);
return lt.object.merge_BANG_.call(null,editor,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spell-overlay","spell-overlay",4741755933),overlay], null));
}
});
lt.plugins.spelling.removeOverlay = (function removeOverlay(editor){var temp__4092__auto__ = new cljs.core.Keyword(null,"spell-overlay","spell-overlay",4741755933).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));if(cljs.core.truth_(temp__4092__auto__))
{var overlay = temp__4092__auto__;return lt.objs.editor.__GT_cm_ed.call(null,editor).removeOverlay(overlay);
} else
{return null;
}
});
lt.plugins.spelling.__BEH__enable = (function __BEH__enable(editor){return lt.plugins.spelling.addOverlay.call(null,editor,lt.plugins.spelling.default_lang);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.spelling","enable","lt.plugins.spelling/enable",3341418514),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.spelling.__BEH__enable,new cljs.core.Keyword(null,"desc","desc",1016984067),"Spell check: Enable",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
lt.plugins.spelling.__BEH__enable_lang = (function __BEH__enable_lang(editor,lang){return lt.plugins.spelling.addOverlay.call(null,editor,lang);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.spelling","enable-lang","lt.plugins.spelling/enable-lang",2074473851),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.spelling.__BEH__enable_lang,new cljs.core.Keyword(null,"desc","desc",1016984067),"Spell check: Set language",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Language code",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"string","string",4416885635)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
lt.plugins.spelling.__BEH__set_dictionary_location = (function __BEH__set_dictionary_location(app,loc){return lt.plugins.spelling.manager.setDictDir(loc);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.spelling","set-dictionary-location","lt.plugins.spelling/set-dictionary-location",3241458804),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.spelling.__BEH__set_dictionary_location,new cljs.core.Keyword(null,"desc","desc",1016984067),"Spell check: Set dictionary location",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Directory",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"string","string",4416885635)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.spelling","spell-default","lt.plugins.spelling/spell-default",2389142263),new cljs.core.Keyword(null,"desc","desc",1016984067),"Spell check: Enable",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var editor = temp__4092__auto__;return lt.plugins.spelling.addOverlay.call(null,editor,lt.plugins.spelling.default_lang);
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.spelling","spell-disable","lt.plugins.spelling/spell-disable",2532099666),new cljs.core.Keyword(null,"desc","desc",1016984067),"Spell check: Disable",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var editor = temp__4092__auto__;return lt.plugins.spelling.removeOverlay.call(null,editor);
} else
{return null;
}
})], null));
lt.plugins.spelling.lang_input = lt.objs.sidebar.command.options_input.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"Language code"], null));
lt.plugins.spelling.__BEH__exec_active_BANG_ = (function __BEH__exec_active_BANG_(this$,l){return lt.objs.sidebar.command.exec_active_BANG_.call(null,l);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.spelling","exec-active!","lt.plugins.spelling/exec-active!",1621182710),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.spelling.__BEH__exec_active_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",4402849902),null], null), null));
lt.object.add_behavior_BANG_.call(null,lt.plugins.spelling.lang_input,new cljs.core.Keyword("lt.plugins.spelling","exec-active!","lt.plugins.spelling/exec-active!",1621182710));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.spelling","spell-lang","lt.plugins.spelling/spell-lang",1995641346),new cljs.core.Keyword(null,"desc","desc",1016984067),"Spell check: Set language",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.spelling.lang_input,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (lang){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var editor = temp__4092__auto__;return lt.plugins.spelling.addOverlay.call(null,editor,lang);
} else
{return null;
}
})], null));
}

//# sourceMappingURL=spelling_compiled.js.map