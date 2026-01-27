<?php

namespace Fgribreau;

class MailChecker
{
    /** @var array<string, true> */
    private static array $blocklist;

    /**
    * @internal
    */
    public static function init(): void
    {
        self::$blocklist = require __DIR__ . '/blacklist.php';
    }

    /** @param array<string> $domains */
    public static function addCustomDomains(array $domains): void
    {
        foreach ($domains as $domain) {
            self::$blocklist[$domain] = true;
        }
    }

    public static function isValid(string $email): bool
    {
        $email = strtolower($email);

        return self::validEmail($email) && !self::isBlacklisted($email);
    }

    /** @return array<string> */
    public static function blacklist(): array
    {
        return array_keys(self::$blocklist);
    }

    public static function isBlacklisted(string $email): bool
    {
        $parts = explode('@', $email);
        $domain = end($parts);

        return self::isDomainBlocked($domain, true);
    }

    public static function isDomainBlocked(string $domain, bool $checkSubdomain): bool
    {
        $domainSuffixes = $checkSubdomain ? self::allDomainSuffixes($domain) : [$domain];
        foreach ($domainSuffixes as $domainSuffix) {
            if (isset(self::$blocklist[$domainSuffix])) {
                return true;
            }
        }

        return false;
    }

    /** @return \Generator<string> */
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
