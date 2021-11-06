(ns mailchecker)

(require '[clojure.string :as str])
(require '[clojure.set :as set])

(def ^:const blacklist (set ["tmail.com", "33mail.com", "guerrillamailblock.com"]))

(def custom_domains (atom #{}))

(defn is-email?
  "Returns true if email is an email address"
  [email]
  (if
    ;; No anchors reuqired - re-matches checks for matching the whole string.
    (re-matches #"(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))" email)
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
