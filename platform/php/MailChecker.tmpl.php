<?php

/**
 * MailChecker
 *
 * Usage:
 *
 * include('mailchecker/platform/php/Mailchecker.php');
 * MailChecker::isValid(string email): bool;
 *
 * @return {Boolean} true is the specified email is valid, false otherwise
 */
class MailChecker
{
    public static $blacklist;

    public static function init()
    {
        self::$blacklist = array_unique(array({{& listSTR }}));
    }

    public static function isValid($email)
    {
        $email = strtolower($email);

        return self::validEmail($email) && !self::isBlacklisted($email);
    }

    public static function blacklist()
    {
        return self::$blacklist;
    }

    private static function validEmail($email)
    {
        return false !== filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    /**
     * Check if an email is blacklisted or not.
     *
     * @param string $email
     *
     * @return bool true if $email is blacklisted
     */
    public static function isBlacklisted($email)
    {
        $parts = explode('@', $email);
        $domain = end($parts);

        foreach (self::allDomainSuffixes($domain) as $domainSuffix) {
            if (\in_array($domainSuffix, self::$blacklist, true)) {
                return true;
            }
        }

        return false;
    }

    private static function allDomainSuffixes($domain)
    {
        $components = explode('.', $domain);

        $return = [];

        foreach ($components as $i => $component) {
            array_push($return, implode('.', array_slice($components, $i)));
        }

        return $return;
    }
}

MailChecker::init();
