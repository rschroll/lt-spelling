;; Copyright 2014-2015 Robert Schroll
;; This file is part of Spelling and is distributed under the MIT license.

(ns lt.plugins.spelling
  (:require [lt.object :as object]
            [lt.objs.editor :as ed]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.sidebar.command :as sbcmd])
  (:require-macros [lt.macros :refer [behavior]]))

(def manager (js* "new OverlayManager()"))
(def check-tokens #{"comment" "string" "string-2"})
(def skip-tokens #{"atom" "attribute" "tag", "number" "variable-2" "string"})

(defn default-lang []
   (let [envLang (aget js/process.env "LAzNG")]
     (if envLang
       (first (.split envLang "."))
       (first (.getLanguages manager)))))

(defn addOverlay [editor lang]
  (removeOverlay editor)
  (let [overlay (.getOverlay manager lang)]
    (if (string? overlay)
      (js/console.log overlay)
      (do
        (if (object/has-tag? editor :editor.spelling.markup)
          (ed/+class editor "spelling-markup")
          (ed/-class editor "spelling-markup"))
        (.addOverlay (ed/->cm-ed editor) overlay)
        (object/merge! editor {:spell-overlay overlay})
        (object/add-tags editor [:editor.spellcheck])))))

(defn removeOverlay [editor]
  (when-let [overlay (:spell-overlay @editor)]
    (.removeOverlay (ed/->cm-ed editor) overlay)
    (object/remove-tags editor [:editor.spellcheck])))

(defn getSuggestions []
  (when-let [editor (pool/last-active)]
    (when-let [overlay (:spell-overlay @editor)]
      (let [pos (ed/->cursor editor)
            ln (:line pos)
            line (ed/line editor ln)
            token-type (ed/->token-type editor pos)
            markup? (object/has-tag? editor :editor.spelling.markup)]
        (if (or (and (not markup?) (contains? check-tokens token-type))
                (and markup? (not (contains? skip-tokens token-type))))
          (let [{start "start"
                 size "size"
                 suggestions "suggestions"} (js->clj (.suggest overlay line (:ch pos)))]
            (map (fn [v]
                   {:label v
                    :order 0.3
                    :click (fn []
                             (ed/replace editor {:line ln :ch start} {:line ln :ch (+ start size)} v))})
                 suggestions)))))))


(behavior ::enable
          :triggers #{:object.instant}
          :desc "Spell check: Enable"
          :type :user
          :exclusive true
          :reaction (fn [editor]
                      (addOverlay editor (default-lang))))

(behavior ::enable-lang
          :triggers #{:object.instant}
          :desc "Spell check: Set language"
          :params [{:label "Language code" :type :string}]
          :type :user
          :exclusive true
          :reaction (fn [editor lang]
                      (addOverlay editor lang)))

(behavior ::set-dictionary-location
          :triggers #{:object.instant}
          :desc "Spell check: Set dictionary location"
          :params [{:label "Directory" :type :string}]
          :type :user
          :exclusive true
          :reaction (fn [app loc]
                      (.setDictDir manager loc)))

(behavior ::spell-menu
          :triggers #{:menu+}
          :reaction (fn [this items]
                      (let [suggestions (getSuggestions)]
                        (if (seq suggestions)
                          (conj (concat items suggestions)
                                {:type "separator" :order 0.4})
                          items))))


(cmd/command {:command ::spell-enable
              :desc "Spell check: Enable"
              :exec (fn []
                      (when-let [editor (pool/last-active)]
                        (addOverlay editor (default-lang))))})

(cmd/command {:command ::spell-disable
              :desc "Spell check: Disable"
              :exec (fn []
                      (when-let [editor (pool/last-active)]
                        (removeOverlay editor)))})

(behavior ::exec-active!
          :triggers #{:select}
          :reaction (fn [this l]
                      (sbcmd/exec-active! l)))

(behavior ::refresh-items!
          :triggers #{:focus!}
          :reaction (fn [this]
                      (object/raise this :clear!)
                      (object/raise this :refresh!)))

(behavior ::close-on-blur!
          :triggers #{:inactive}
          :reaction (fn [this]
                      (object/raise this :escape!)))

(def lang-input (doto
                  (sbcmd/filter-list {:items #(.getLanguages manager)
                                      :key identity
                                      :placeholder "Language"})
                  (object/add-behavior! ::exec-active!)
                  (object/add-behavior! ::refresh-items!)))

(cmd/command {:command ::spell-lang
              :desc "Spell check: Set language"
              :options lang-input
              :exec (fn [lang]
                      (when-let [editor (pool/last-active)]
                        (addOverlay editor lang)))})

(def suggest-input (doto
                     (sbcmd/filter-list {:items getSuggestions
                                         :key :label
                                         :placeholder ""})
                     (object/add-behavior! ::exec-active!)
                     (object/add-behavior! ::refresh-items!)
                     (object/add-behavior! ::close-on-blur!)))

(cmd/command {:command ::spell-suggestion
              :desc "Spell check: Get suggestions"
              :options suggest-input
              :exec (fn [value]
                      ((:click value)))})
