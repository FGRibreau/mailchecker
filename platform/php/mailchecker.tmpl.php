<?php
/**
 * Usage
 *
 * include('mailchecker/platform/php/Mailchecker.php');
 * MailChecker(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */


function MailChecker($email){
  $pattern = '/'.implode('|', array({{& listSTR }})).'/';
  if(preg_match($pattern, $email)){return false;}
  return !!filter_var($email, FILTER_VALIDATE_EMAIL);
}
