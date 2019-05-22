<?php

// Run tests from the repository root directory:
// $ composer install && ./vendor/bin/phpunit test/platform.php.test.php

require __DIR__.'/../platform/php/MailChecker.php';

class MailCheckerTest extends PHPUnit\Framework\TestCase
{
    public function assertIsValidResult($expected, $email)
    {
        $this->assertEquals($expected, MailChecker::isValid($email));
    }

    public function isValid($email)
    {
        $this->assertIsValidResult(true, $email);
    }

    public function isInvalid($email)
    {
        $this->assertIsValidResult(false, $email);
    }

    public function testReturnTrueIfValidEmail()
    {
        $this->isValid('plop@plop.com');
        $this->isValid('my.ok@ok.plop.com');
        $this->isValid('my+ok@ok.plop.com');
        $this->isValid('my=ok@ok.plop.com');
        $this->isValid('ok@gmail.com');
        $this->isValid('ok@hotmail.com');
    }

    public function testReturnFalseIfEmailInvalid()
    {
        $this->isInvalid('');
        $this->isInvalid('  ');
        $this->isInvalid('plopplop.com');
        $this->isInvalid('my+ok@ok=plop.com');
        $this->isInvalid('my,ok@ok.plop.com');
        $this->isInvalid('  ok@gmail.com  ');
        $this->isInvalid('  ok@gmail.com');
        $this->isInvalid('ok@gmail.com  ');
        $this->isInvalid("\nok@gmail.com\n");
        $this->isInvalid("\nok@gmail.com");
        $this->isInvalid("ok@gmail.com\n");
    }

    public function testReturnFalseIfThrowableDomain()
    {
        $this->isInvalid('ok@tmail.com');
        $this->isInvalid('ok@33mail.com');
        //$this->isInvalid('ok@ok.33mail.com');
        $this->isInvalid('ok@guerrillamailblock.com');
    }

    public function provideBlackListTests()
    {
        foreach (MailChecker::blacklist() as $blacklistedDomain) {
            yield [$blacklistedDomain];
        }
    }

    /** @dataProvider provideBlackListTests */
    public function testReturnFalseForBlacklistedDomainsAndTheirSubdomains($blacklistedDomain)
    {
        $this->isInvalid('test@'.$blacklistedDomain);
        $this->isInvalid('test@subdomain.'.$blacklistedDomain);
        // Should not be invalid as a subdomain of a valid domain.
        $this->isValid('test@'.$blacklistedDomain.'.gmail.com');
    }
}
