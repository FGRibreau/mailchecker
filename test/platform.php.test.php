<?php
# Run tests from the repository root directory:
# $ composer install && ./vendor/bin/phpunit test/platform.php.test.php

require(__DIR__.'/../platform/php/MailChecker.php');

class MailCheckerTest extends PHPUnit_Framework_TestCase
{
    public function assertIsValidResult($expected, $email) {
        $this->assertEquals($expected, MailChecker::isValid($email));
    }

    public function isValid($email) {
        $this->assertIsValidResult(true, $email);
    }

    public function isInvalid($email) {
        $this->assertIsValidResult(false, $email);
    }

    public function testReturnTrueIfValidEmail() {
        $this->isValid('plop@plop.com');
        $this->isValid('my.ok@ok.plop.com');
        $this->isValid('my+ok@ok.plop.com');
        $this->isValid('my=ok@ok.plop.com');
        $this->isValid('ok@gmail.com');
        $this->isValid('ok@hotmail.com');
    }

    public function testReturnFalseIfEmailInvalid() {
        $this->isInvalid('');
        $this->isInvalid('  ');
        $this->isInvalid('plopplop.com');
        $this->isInvalid('my+ok@ok=plop.com');
        $this->isInvalid('my,ok@ok.plop.com');
        $this->isInvalid("  ok@gmail.com  ");
        $this->isInvalid("  ok@gmail.com");
        $this->isInvalid("ok@gmail.com  ");
        $this->isInvalid("\nok@gmail.com\n");
        $this->isInvalid("\nok@gmail.com");
        $this->isInvalid("ok@gmail.com\n");
    }

    public function testReturnFalseIfThrowableDomain() {
        $this->isInvalid('ok@tmail.com');
        $this->isInvalid('ok@33mail.com');
        //$this->isInvalid('ok@ok.33mail.com');
        $this->isInvalid('ok@guerrillamailblock.com');
    }

    public function testReturnFalseForBlacklistedDomainsAndTheirSubdomains() {
        foreach(MailChecker::blacklist() as $blacklisted_domain) {
            $this->isInvalid("test@" . $blacklisted_domain);
            $this->isInvalid("test@subdomain." . $blacklisted_domain);
            # Should not be invalid as a subdomain of a valid domain.
            $this->isValid("test@" . $blacklisted_domain . ".gmail.com");
        }
    }
}
?>
