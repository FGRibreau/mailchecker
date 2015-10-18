<?php
/**
 * Usage
 *
 * include('mailchecker/platform/php/Mailchecker.php');
 * MailChecker(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */

function MailChecker($email){
  if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){return false;}
  return !in_array(strtolower(end(explode("@", $email))), array({{& listSTR }}));
}
