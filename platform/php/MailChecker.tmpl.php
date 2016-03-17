<?php
/**
 * Usage
 *
 * include('mailchecker/platform/php/Mailchecker.php');
 * $mail_checker = new MailChecker->isValid(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */

class MailChecker {
    private $blacklist;

    public function __construct() {
        $this->blacklist = array_map(
            'strtolower',
            array_unique(array({{& listSTR }}))
        );
    }

    public function isValid($email) {
        $email = strtolower($email);

        return $this->validEmail($email) && !$this->isBlacklisted($email);
    }

    public function blacklist() {
        return $this->blacklist;
    }

    private function validEmail($email) {
        if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
            return false;
        } else {
            return true;
        }
    }

    private function isBlacklisted($email) {
        $parts = explode("@", $email);
        $domain = end($parts);

        foreach ($this->allDomainSuffixes($domain) as $domainSuffix) {
            if (in_array($domainSuffix, $this->blacklist)) {
                return true;
            }
        }

        return false;
    }

    private function allDomainSuffixes($domain) {
        $components = explode('.', $domain);

        $return = [];

        for ($i = 0; $i < count($components); $i++) {
            array_push($return, implode('.', array_slice($components, $i)));
        }

        return $return;
    }
}
