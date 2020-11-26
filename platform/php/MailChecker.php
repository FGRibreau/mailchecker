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
    private static $blacklist;

    public static function init(): void
    {
        self::$blacklist = require __DIR__.'/blacklist.php';
    }

    public static function isValid(string $email): bool
    {
        $email = strtolower($email);

        return self::validEmail($email) && !self::isBlacklisted($email);
    }

    public static function blacklist(): array
    {
        return array_keys(self::$blacklist);
    }

    /**
     * Check if an email is blacklisted or not.
     */
    public static function isBlacklisted(string $email): bool
    {
        $parts = explode('@', $email);
        $domain = end($parts);

        foreach (self::allDomainSuffixes($domain) as $domainSuffix) {
            if (array_key_exists($domainSuffix, self::$blacklist)) {
                return true;
            }
        }

        return false;
    }

    private static function allDomainSuffixes(string $domain): \Generator
    {
        $components = explode('.', $domain);

        foreach ($components as $i => $_) {
            yield implode('.', array_slice($components, $i));
        }
    }

    private static function validEmail(string $email): bool
    {
        return false !== filter_var($email, FILTER_VALIDATE_EMAIL);
    }
}

MailChecker::init();
