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
lt.plugins.spelling.check_tokens = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["string",null,"string-2",null,"comment",null], null), null);
lt.plugins.spelling.skip_tokens = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, ["variable-2",null,"number",null,"string",null,"atom",null,"tag",null,"attribute",null], null), null);
lt.plugins.spelling.addOverlay = (function addOverlay(editor,lang){lt.plugins.spelling.removeOverlay.call(null,editor);
var overlay = lt.plugins.spelling.manager.getOverlay(lang);if(typeof overlay === 'string')
{return console.log(overlay);
} else
{if(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,editor,new cljs.core.Keyword(null,"editor.spelling.markup","editor.spelling.markup",1751484877))))
{lt.objs.editor._PLUS_class.call(null,editor,"spelling-markup");
} else
{lt.objs.editor._class.call(null,editor,"spelling-markup");
}
lt.objs.editor.__GT_cm_ed.call(null,editor).addOverlay(overlay);
lt.object.merge_BANG_.call(null,editor,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spell-overlay","spell-overlay",4741755933),overlay], null));
return lt.object.add_tags.call(null,editor,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.spellcheck","editor.spellcheck",2663716723)], null));
}
});
lt.plugins.spelling.removeOverlay = (function removeOverlay(editor){var temp__4092__auto__ = new cljs.core.Keyword(null,"spell-overlay","spell-overlay",4741755933).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));if(cljs.core.truth_(temp__4092__auto__))
{var overlay = temp__4092__auto__;lt.objs.editor.__GT_cm_ed.call(null,editor).removeOverlay(overlay);
return lt.object.remove_tags.call(null,editor,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.spellcheck","editor.spellcheck",2663716723)], null));
} else
{return null;
}
});
lt.plugins.spelling.getSuggestions = (function getSuggestions(){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var editor = temp__4092__auto__;var temp__4092__auto____$1 = new cljs.core.Keyword(null,"spell-overlay","spell-overlay",4741755933).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));if(cljs.core.truth_(temp__4092__auto____$1))
{var overlay = temp__4092__auto____$1;var pos = lt.objs.editor.__GT_cursor.call(null,editor);var ln = new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(pos);var line = lt.objs.editor.line.call(null,editor,ln);var token_type = lt.objs.editor.__GT_token_type.call(null,editor,pos);var markup_QMARK_ = lt.object.has_tag_QMARK_.call(null,editor,new cljs.core.Keyword(null,"editor.spelling.markup","editor.spelling.markup",1751484877));if(cljs.core.truth_((function (){var or__6364__auto__ = (cljs.core.not.call(null,markup_QMARK_)) && (cljs.core.contains_QMARK_.call(null,lt.plugins.spelling.check_tokens,token_type));if(or__6364__auto__)
{return or__6364__auto__;
} else
{var and__6352__auto__ = markup_QMARK_;if(cljs.core.truth_(and__6352__auto__))
{return !(cljs.core.contains_QMARK_.call(null,lt.plugins.spelling.skip_tokens,token_type));
} else
{return and__6352__auto__;
}
}
})()))
{var map__7888 = cljs.core.js__GT_clj.call(null,overlay.suggest(line,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(pos)));var map__7888__$1 = ((cljs.core.seq_QMARK_.call(null,map__7888))?cljs.core.apply.call(null,cljs.core.hash_map,map__7888):map__7888);var start = cljs.core.get.call(null,map__7888__$1,"start");var size = cljs.core.get.call(null,map__7888__$1,"size");var suggestions = cljs.core.get.call(null,map__7888__$1,"suggestions");return cljs.core.map.call(null,((function (map__7888,map__7888__$1,start,size,suggestions,pos,ln,line,token_type,markup_QMARK_,overlay,temp__4092__auto____$1,editor,temp__4092__auto__){
return (function (v){return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1116631654),v,new cljs.core.Keyword(null,"order","order",1119910592),0.3,new cljs.core.Keyword(null,"click","click",1108654330),((function (map__7888,map__7888__$1,start,size,suggestions,pos,ln,line,token_type,markup_QMARK_,overlay,temp__4092__auto____$1,editor,temp__4092__auto__){
return (function (){return lt.objs.editor.replace.call(null,editor,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),ln,new cljs.core.Keyword(null,"ch","ch",1013907415),start], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),ln,new cljs.core.Keyword(null,"ch","ch",1013907415),(start + size)], null),v);
});})(map__7888,map__7888__$1,start,size,suggestions,pos,ln,line,token_type,markup_QMARK_,overlay,temp__4092__auto____$1,editor,temp__4092__auto__))
], null);
});})(map__7888,map__7888__$1,start,size,suggestions,pos,ln,line,token_type,markup_QMARK_,overlay,temp__4092__auto____$1,editor,temp__4092__auto__))
,suggestions);
} else
{return null;
}
} else
{return null;
}
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
lt.plugins.spelling.__BEH__spell_menu = (function __BEH__spell_menu(this$,items){var suggestions = lt.plugins.spelling.getSuggestions.call(null);if(cljs.core.seq.call(null,suggestions))
{return cljs.core.conj.call(null,cljs.core.concat.call(null,items,suggestions),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),"separator",new cljs.core.Keyword(null,"order","order",1119910592),0.4], null));
} else
{return items;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.spelling","spell-menu","lt.plugins.spelling/spell-menu",1995609775),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.spelling.__BEH__spell_menu,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu+","menu+",1117686302),null], null), null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.spelling","spell-enable","lt.plugins.spelling/spell-enable",818990027),new cljs.core.Keyword(null,"desc","desc",1016984067),"Spell check: Enable",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
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
lt.plugins.spelling.__BEH__exec_active_BANG_ = (function __BEH__exec_active_BANG_(this$,l){return lt.objs.sidebar.command.exec_active_BANG_.call(null,l);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.spelling","exec-active!","lt.plugins.spelling/exec-active!",1621182710),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.spelling.__BEH__exec_active_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",4402849902),null], null), null));
lt.plugins.spelling.__BEH__refresh_items_BANG_ = (function __BEH__refresh_items_BANG_(this$){lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"refresh!","refresh!",4597922840));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.spelling","refresh-items!","lt.plugins.spelling/refresh-items!",1460892130),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.spelling.__BEH__refresh_items_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",4039653819),null], null), null));
lt.plugins.spelling.__BEH__close_on_blur_BANG_ = (function __BEH__close_on_blur_BANG_(this$){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"escape!","escape!",3844244274));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.spelling","close-on-blur!","lt.plugins.spelling/close-on-blur!",3520433716),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.spelling.__BEH__close_on_blur_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"inactive","inactive",1038569437),null], null), null));
lt.plugins.spelling.lang_input = (function (){var G__7889 = lt.objs.sidebar.command.filter_list.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return lt.plugins.spelling.manager.getLanguages();
}),new cljs.core.Keyword(null,"key","key",1014010321),cljs.core.identity,new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"Language"], null));lt.object.add_behavior_BANG_.call(null,G__7889,new cljs.core.Keyword("lt.plugins.spelling","exec-active!","lt.plugins.spelling/exec-active!",1621182710));
lt.object.add_behavior_BANG_.call(null,G__7889,new cljs.core.Keyword("lt.plugins.spelling","refresh-items!","lt.plugins.spelling/refresh-items!",1460892130));
return G__7889;
})();
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.spelling","spell-lang","lt.plugins.spelling/spell-lang",1995641346),new cljs.core.Keyword(null,"desc","desc",1016984067),"Spell check: Set language",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.spelling.lang_input,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (lang){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var editor = temp__4092__auto__;return lt.plugins.spelling.addOverlay.call(null,editor,lang);
} else
{return null;
}
})], null));
lt.plugins.spelling.suggest_input = (function (){var G__7890 = lt.objs.sidebar.command.filter_list.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1114430258),lt.plugins.spelling.getSuggestions,new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"label","label",1116631654),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),""], null));lt.object.add_behavior_BANG_.call(null,G__7890,new cljs.core.Keyword("lt.plugins.spelling","exec-active!","lt.plugins.spelling/exec-active!",1621182710));
lt.object.add_behavior_BANG_.call(null,G__7890,new cljs.core.Keyword("lt.plugins.spelling","refresh-items!","lt.plugins.spelling/refresh-items!",1460892130));
lt.object.add_behavior_BANG_.call(null,G__7890,new cljs.core.Keyword("lt.plugins.spelling","close-on-blur!","lt.plugins.spelling/close-on-blur!",3520433716));
return G__7890;
})();
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.spelling","spell-suggestion","lt.plugins.spelling/spell-suggestion",3874083276),new cljs.core.Keyword(null,"desc","desc",1016984067),"Spell check: Get suggestions",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.spelling.suggest_input,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (value){return new cljs.core.Keyword(null,"click","click",1108654330).cljs$core$IFn$_invoke$arity$1(value).call(null);
})], null));
}

//# sourceMappingURL=spelling_compiled.js.map