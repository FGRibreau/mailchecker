<?php

namespace Fgribreau;

class MailChecker
{
    private static $blacklist;

    public static function init(): void
    {
        self::$blacklist = require __DIR__ . '/blacklist.php';
    }

    public static function addCustomDomains(array $domains): void
    {
        foreach ($domains as $domain) {
            self::$blacklist[$domain] = true;
        }
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

    public static function isBlacklisted(string $email): bool
    {
        $parts = explode('@', $email);
        $domain = end($parts);

        foreach (self::allDomainSuffixes($domain) as $domainSuffix) {
            if (isset(self::$blacklist[$domainSuffix])) {
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
