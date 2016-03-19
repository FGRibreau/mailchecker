<?php
/**
 * Usage
 *
 * include('mailchecker/platform/php/Mailchecker.php');
 * MailChecker::isValid(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */

class MailChecker {
    static $blacklist;
    static function init() {
        self::$blacklist = array_unique(array({{& listSTR }}));
    }

    static function isValid($email) {
        $email = strtolower($email);

        return self::validEmail($email) && !self::isBlacklisted($email);
    }

    static function blacklist() {
        return self::$blacklist;
    }

    private static function validEmail($email) {
        if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
            return false;
        } else {
            return true;
        }
    }

    private static function isBlacklisted($email) {
        $parts = explode("@", $email);
        $domain = end($parts);

        foreach (self::allDomainSuffixes($domain) as $domainSuffix) {
            if (in_array($domainSuffix, self::$blacklist)) {
                return true;
            }
        }

        return false;
    }

    private static function allDomainSuffixes($domain) {
        $components = explode('.', $domain);

        $return = [];

        for ($i = 0; $i < count($components); $i++) {
            array_push($return, implode('.', array_slice($components, $i)));
        }

        return $return;
    }
}
MailChecker::init();
