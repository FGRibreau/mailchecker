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

  $components = explode("@", $email);

  return !in_array(strtolower(end($components)), array({{& listSTR }}));
}
