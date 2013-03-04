<?php
/**
 * Usage
 *
 * include('mailchecker/platform/php/Mailchecker.php');
 * MailChecker(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */

$pattern = '/'.implode('|', array({{& listSTR }})).'/';

function MailChecker($email){
  if(preg_match($pattern, $email)){return false;}
  return filter_var($email, FILTER_VALIDATE_EMAIL);
}
