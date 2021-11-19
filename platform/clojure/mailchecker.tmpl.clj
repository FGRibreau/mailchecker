(ns mailchecker)

(require '[clojure.string :as str])
(require '[clojure.set :as set])

(def ^:const blacklist (set [{{& listSTR }}]))

(def custom_domains (atom #{}))

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

(defn domain-part
  "Returns the domain part from email"
  [email]
  (last (at-split email)))

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
  (let [domains (all-domain-suffixes email)]
    (or
      (some (partial contains? @custom_domains) domains)
      (some (partial contains? blacklist) domains))))

(defn valid?
  "Returns true if the email is valid"
  [email]
  (and
    (is-email? email)
    (not
      (in-blacklist? email))))

(defn add-custom-domains
  "Add more domains to the blacklist"
  [domains]
  (swap! custom_domains (set/union @custom_domains domains)))
