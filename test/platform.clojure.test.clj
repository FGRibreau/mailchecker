; Run test with the lein-exec plugin:
; $ lein exec test/platform.clojure.test.clj
(load-file "platform/clojure/mailchecker.clj")

(ns clojure.test.example
  (:use clojure.test))

(defn expect-valid-result [expected-valid email]
  (is (= expected-valid (mailchecker/valid? email))))

(def expect-invalid (partial expect-valid-result false))
(def expect-valid (partial expect-valid-result true))

; Valid
(deftest true-for-valid-1
  (expect-valid "plop@plop.com"))
(deftest true-for-valid-2
  (expect-valid "my.ok@ok.plop.com"))
(deftest true-for-valid-3
  (expect-valid "my+ok@ok.plop.com"))
(deftest true-for-valid-4
  (expect-valid "my=ok@ok.plop.com"))
(deftest true-for-valid-5
  (expect-valid "ok@gmail.com"))
(deftest true-for-valid-6
  (expect-valid "ok@hotmail.com"))

; Invalid
(deftest false-for-invalid-1
  (expect-invalid "plopplop.com"))
(deftest false-for-invalid-2
  (expect-invalid "my+ok@ok=plop.com"))
(deftest false-for-invalid-3
  (expect-invalid "my,ok@ok.plop.com"))

(deftest false-for-spam-1
  (expect-invalid "ok@tmail.com"))
(deftest false-for-spam-2
  (expect-invalid "ok@33mail.com"))
(deftest false-for-spam-3
  (expect-invalid "ok@ok.33mail.com"))
(deftest false-for-spam-4
  (expect-invalid "ok@guerrillamailblock.com"))

(deftest false-for-blacklist-entries
  (every? (fn [domain]
              (do (expect-invalid (str "test@" domain))
                  (expect-invalid (str "test@subdomain." domain))
                  ;; Blacklisted domains should be valid as subdomains of a
                  ;; valid domain.
                  (expect-valid (str "test@" domain ".gmail.com"))))
          mailchecker/blacklist))

(run-all-tests)
