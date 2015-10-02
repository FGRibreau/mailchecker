(ns mailchecker)

(require '[clojure.string :as str])

(def ^:const blacklist (set ["a", "b"]))

; Copied from https://github.com/scstarkey/noir/blob/998e846dd44f42b8e01a6977e6d22a3eff5e4542/src/noir/validation.clj#L37-L40
(defn is-email?
  "Returns true if email is an email address"
  [email]
  (re-matches #"(?i)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" email))

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

(defn top-domain-part
  "Returns the top domain for email"
  [email]
  (dot-join
    (take-last 2
      (dot-split (domain-part email)))))

(defn in-blacklist?
  "Returns true if email domain is not in the blacklist"
  [email]
  (contains? blacklist (top-domain-part email)))

(defn valid?
  "Returns true if the email is valid"
  [email]
  (and
    (is-email? email)
    (not
      (in-blacklist? email))))

; (println (valid? "test@example.com"))
; (println (valid? "example.com"))
; (println (top-domain-part "test@sub.example.com"))

; Valid
(println (valid? "plop@plop.com"))
(println (valid? "my.ok@ok.plop.com"))
(println (valid? "my+ok@ok.plop.com"))
(println (valid? "my=ok@ok.plop.com"))
(println (valid? "ok@gmail.com"))
(println (valid? "ok@hotmail.com"))

; Invalid
(println (not (valid? "plopplop.com")))
(println (not (valid? "my+ok@ok=plop.com")))
(println (not (valid? "my,ok@ok.plop.com")))

(println (not (valid? "ok@tmail.com")))
(println (not (valid? "ok@33mail.com")))
(println (not (valid? "ok@ok.33mail.com")))
(println (not (valid? "ok@guerrillamailblock.com")))
