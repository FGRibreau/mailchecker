; Run test with the lein-exec plugin:
; $ lein exec test/platform.clojure.test.clj
(load-file "platform/clojure/mailchecker.clj")

(ns clojure.test.example
  (:use clojure.test))

(defn expect-valid-result [expected-valid email]
  (is (= expected-valid (mailchecker/valid? email))
      (format "Expected valid?(%s) to be %b" email expected-valid)))

(def expect-invalid (partial expect-valid-result false))
(def expect-valid (partial expect-valid-result true))

(deftest true-for-valid
  (do (expect-valid "plop@plop.com")
      (expect-valid "my.ok@ok.plop.com")
      (expect-valid "my+ok@ok.plop.com")
      (expect-valid "my=ok@ok.plop.com")
      (expect-valid "ok@gmail.com")
      (expect-valid "ok@hotmail.com")))

(deftest false-for-invalid
  (do (expect-invalid "")
      (expect-invalid "  ")
      (expect-invalid "plopplop.com")
      (expect-invalid "my+ok@ok=plop.com")
      (expect-invalid "my,ok@ok.plop.com")
      (expect-invalid "  ok@gmail.com  ")
      (expect-invalid "  ok@gmail.com")
      (expect-invalid "ok@gmail.com  ")
      (expect-invalid "\nok@gmail.com\n")
      (expect-invalid "\nok@gmail.com")
      (expect-invalid "ok@gmail.com\n")))

(deftest false-for-throwable-domain
  (do (expect-invalid "ok@tmail.com")
      (expect-invalid "ok@33mail.com")
      (expect-invalid "ok@ok.33mail.com")
      (expect-invalid "ok@guerrillamailblock.com")))

(deftest false-for-blacklist-entries
  (every? (fn [domain]
              (do (expect-invalid (str "test@" domain))
                  (expect-invalid (str "test@subdomain." domain))
                  ;; Blacklisted domains should be valid as subdomains of a
                  ;; valid domain.
                  (expect-valid (str "test@" domain ".gmail.com"))))
          mailchecker/blacklist))

(deftest add-custom-domains)
  (do
    (expect-valid "foo@youtube.com")
    (expect-valid "foo@google.com")
    (expect-valid "ok@gmail.com")
    (mailchecker/add-custom-domains #{"youtube.com" "google.com"})
    (expect-invalid "foo@youtube.com")
    (expect-invalid "foo@google.com")
    (expect-valid "ok@gmail.com"))

(run-all-tests)
