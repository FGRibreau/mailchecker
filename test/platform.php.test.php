<?php
require(__DIR__.'/../platform/php/mailchecker.php');

// Activation des assertions et mise en mode discret
assert_options(ASSERT_ACTIVE, 1);
assert_options(ASSERT_WARNING, 0);
assert_options(ASSERT_QUIET_EVAL, 1);

// Création d'un gestionnaire d'assertions
function my_assert_handler($file, $line, $code)
{
    echo "<hr>Échec de l'assertion :
        File '$file'<br />
        Line '$line'<br />
        Code '$code'<br /><hr />";
}

// Configuration de la méthode de callback
assert_options(ASSERT_CALLBACK, 'my_assert_handler');
function _valid($b, $email){
  if($b !== MailChecker($email)){
    echo "ERROR: MailChecker($email) !== $b\n";
    exit(1);
  }
}

function isValid($email){return _valid(true, $email);}
function isInvalid($email){return _valid(false, $email);}

// test('should return true if the email is valid', function(){
  isValid("plop@plop.com");
  isValid("my.ok@ok.plop.com");
  isValid("my+ok@ok.plop.com");
  isValid("my=ok@ok.plop.com");
  isValid("ok@gmail.com");
  isValid("ok@hotmail.com");
// });

// test('should return false if the email is invalid', function(){
  isInvalid("plopplop.com");
  isInvalid("my+ok@ok°plop.com");
  isInvalid("my+ok@ok=plop.com");
  isInvalid("my,ok@ok.plop.com");
  isInvalid("ok@tmail.com");
// });

// test('should return false if the email come from a throwable domain', function(){
  isInvalid("ok@33mail.com");
  isInvalid("ok@ok.33mail.com");
// });
