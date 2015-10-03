; Run test with the lein-exec plugin:
; $ lein exec test/platform.clojure.test.clj
(load-file "platform/clojure/mailchecker.clj")

(ns clojure.test.example
  (:use clojure.test))

; Valid
(deftest true-for-valid-1
  (is (= true (mailchecker/valid? "plop@plop.com"))))
(deftest true-for-valid-2
  (is (= true (mailchecker/valid? "my.ok@ok.plop.com"))))
(deftest true-for-valid-3
  (is (= true (mailchecker/valid? "my+ok@ok.plop.com"))))
(deftest true-for-valid-4
  (is (= true (mailchecker/valid? "my=ok@ok.plop.com"))))
(deftest true-for-valid-5
  (is (= true (mailchecker/valid? "ok@gmail.com"))))
(deftest true-for-valid-6
  (is (= true (mailchecker/valid? "ok@hotmail.com"))))

; Invalid
(deftest false-for-invalid-1
  (is(= false (mailchecker/valid? "plopplop.com"))))
(deftest false-for-invalid-2
  (is(= false (mailchecker/valid? "my+ok@ok=plop.com"))))
(deftest false-for-invalid-3
  (is(= false (mailchecker/valid? "my,ok@ok.plop.com"))))

(deftest false-for-spam-1
  (is(= false (mailchecker/valid? "ok@tmail.com"))))
(deftest false-for-spam-2
  (is(= false (mailchecker/valid? "ok@33mail.com"))))
(deftest false-for-spam-3
  (is(= false (mailchecker/valid? "ok@ok.33mail.com"))))
(deftest false-for-spam-4
  (is(= false (mailchecker/valid? "ok@guerrillamailblock.com"))))

(run-all-tests)
