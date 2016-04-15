(ns mailchecker)

(require '[clojure.string :as str])

(def ^:const blacklist (set [{{& listSTR }}]))

(defn is-email?
  "Returns true if email is an email address"
  [email]
  (if
    ;; No anchors reuqired - re-matches checks for matching the whole string.
    (re-matches #"{{& unanchoredRegexpString }}" email)
    true
    false))

(defn at-split
  "Returns list from string splitted on @ char"
  [email]
  (str/split email #"@"))

(defn last-element
  "Returns the last element of the arr"
  [arr]
  (first
    (take-last 1 arr)))

(defn domain-part
  "Returns the domain part from email"
  [email]
  (last-element (at-split email)))

(defn dot-join
  "Returns string from arr joined with dot char"
  [arr]
  (str/join "." arr))

(defn dot-split
  "Returns list from string splitted on dot char"
  [string]
  (str/split string #"\."))

(defn all-domain-suffixes
  "Returns all suffixes of the email domain, longest first"
  [email]
  (let [domain-parts (dot-split (domain-part email))]
       (map #(dot-join (drop % domain-parts)) (range 0 (count domain-parts)))))

(defn in-blacklist?
  "Returns true if any suffix of the email domain is in the blacklist"
  [email]
  (some (partial contains? blacklist) (all-domain-suffixes email)))

(defn valid?
  "Returns true if the email is valid"
  [email]
  (and
    (is-email? email)
    (not
      (in-blacklist? email))))
