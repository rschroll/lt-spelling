(ns lt.plugins.spelling
  (:require [lt.object :as object]
            [lt.objs.editor :as ed]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.sidebar.command :as sbcmd])
  (:require-macros [lt.macros :refer [behavior]]))

(def manager (js* "new OverlayManager()"))
(def default-lang (first (.split (aget js/process.env "LANG") ".")))

(defn addOverlay [editor lang]
  (removeOverlay editor)
  (let [overlay (.getOverlay manager lang)]
    (.addOverlay (ed/->cm-ed editor) overlay)
    (object/merge! editor {:spell-overlay overlay})))

(defn removeOverlay [editor]
  (when-let [overlay (:spell-overlay @editor)]
    (.removeOverlay (ed/->cm-ed editor) overlay)))

(cmd/command {:command ::spell-default
              :desc "Spell check: Enable"
              :exec (fn []
                      (when-let [editor (pool/last-active)]
                        (addOverlay editor default-lang)))})

(cmd/command {:command ::spell-disable
              :desc "Spell check: Disable"
              :exec (fn[]
                      (when-let [editor (pool/last-active)]
                        (removeOverlay editor)))})

(def lang-input (sbcmd/options-input {:placeholder "Language code"}))

(behavior ::exec-active!
          :triggers #{:select}
          :reaction (fn [this l]
                      (sbcmd/exec-active! l)))

(object/add-behavior! lang-input ::exec-active!)

(cmd/command {:command ::spell-lang
              :desc "Spell check: Set language"
              :options lang-input
              :exec (fn [lang]
                      (when-let [editor (pool/last-active)]
                        (addOverlay editor lang)))})
