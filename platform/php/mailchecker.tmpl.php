<?php
/**
 * Usage
 *
 * include('mailchecker/platform/php/Mailchecker.php');
 * MailChecker(String email);
 * @return {Boolean} true is the specified email is valid, false otherwise
 */

function MailChecker($email){
  $domains = array({{& listSTR }});

  for ($i=0; $i < count($domains); $i++) {
    $domains[$i] = '\\b'.$domains[$i].'$';
  }

  $pattern = '/'.implode('|', $domains).'/';
  if(preg_match($pattern, $email)){return false;}
  return !!filter_var($email, FILTER_VALIDATE_EMAIL);
}
