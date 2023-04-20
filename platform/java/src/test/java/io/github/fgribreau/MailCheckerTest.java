package io.github.fgribreau;

import org.junit.jupiter.api.Test;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class MailCheckerTest {

  @Test
  public void checkIfTheBlacklistSetIsNotEmpty(){
    assertFalse(MailChecker.blacklist().isEmpty());
  }

  @Test
  public void checkIfBlacklistSetContainsAtLeast50_000Domains(){
    assertTrue(MailChecker.blacklist().size() >= 50000);
  }

  @Test
  public void isValidMethodShouldReturnTrueIfEmailIsValid(){
    assertTrue(MailChecker.isValidEmail("plop@plop.com"));
    assertTrue(MailChecker.isValidEmail("my.ok@ok.plop.com"));
    assertTrue(MailChecker.isValidEmail("my+ok@ok.plop.com"));
    assertTrue(MailChecker.isValidEmail("my=ok@ok.plop.com"));
    assertTrue(MailChecker.isValidEmail("ok@gmail.com"));
    assertTrue(MailChecker.isValidEmail("ok@hotmail.com"));
  }

  @Test
  public void isInvalidMethodShouldReturnFalseIfEmailIsValid(){
    assertFalse(MailChecker.isInvalidEmail("plop@plop.com"));
    assertFalse(MailChecker.isInvalidEmail("my.ok@ok.plop.com"));
    assertFalse(MailChecker.isInvalidEmail("my+ok@ok.plop.com"));
    assertFalse(MailChecker.isInvalidEmail("my=ok@ok.plop.com"));
    assertFalse(MailChecker.isInvalidEmail("ok@gmail.com"));
    assertFalse(MailChecker.isInvalidEmail("ok@hotmail.com"));
  }

  @Test
  public void isValidMethodShouldReturnFalseIfProvidedEmailIsInvalid(){
    assertFalse(MailChecker.isValidEmail(null));
    assertFalse(MailChecker.isValidEmail(""));
    assertFalse(MailChecker.isValidEmail("           "));
    assertFalse(MailChecker.isValidEmail("Hello world"));
    assertFalse(MailChecker.isValidEmail("Helloworld.com"));
    assertFalse(MailChecker.isValidEmail("plopplop.com"));
    assertFalse(MailChecker.isValidEmail("my+ok@ok=plop.com"));
    assertFalse(MailChecker.isValidEmail(""));
    assertFalse(MailChecker.isValidEmail("my,ok@ok.plop.com"));
    assertFalse(MailChecker.isValidEmail("ok@tmail.com"));
    assertFalse(MailChecker.isValidEmail("plop@ip6.pp.ua"));
    assertFalse(MailChecker.isValidEmail("  ok@gmail.com  "));
    assertFalse(MailChecker.isValidEmail("  ok@gmail.com"));
    assertFalse(MailChecker.isValidEmail("ok@gmail.com  "));
    assertFalse(MailChecker.isValidEmail("\nok@gmail.com\n"));
    assertFalse(MailChecker.isValidEmail("\nok@gmail.com"));
    assertFalse(MailChecker.isValidEmail("ok@gmail.com\\n"));
  }

  @Test
  public void isInvalidMethodShouldReturnTrueIfProvidedEmailIsInvalid(){
    assertTrue(MailChecker.isInvalidEmail(null));
    assertTrue(MailChecker.isInvalidEmail(""));
    assertTrue(MailChecker.isInvalidEmail("           "));
    assertTrue(MailChecker.isInvalidEmail("Hello world"));
    assertTrue(MailChecker.isInvalidEmail("Helloworld.com"));
    assertTrue(MailChecker.isInvalidEmail("plopplop.com"));
    assertTrue(MailChecker.isInvalidEmail("my+ok@ok=plop.com"));
    assertTrue(MailChecker.isInvalidEmail(""));
    assertTrue(MailChecker.isInvalidEmail("my,ok@ok.plop.com"));
    assertTrue(MailChecker.isInvalidEmail("ok@tmail.com"));
    assertTrue(MailChecker.isInvalidEmail("plop@ip6.pp.ua"));
    assertTrue(MailChecker.isInvalidEmail("  ok@gmail.com  "));
    assertTrue(MailChecker.isInvalidEmail("  ok@gmail.com"));
    assertTrue(MailChecker.isInvalidEmail("ok@gmail.com  "));
    assertTrue(MailChecker.isInvalidEmail("\nok@gmail.com\n"));
    assertTrue(MailChecker.isInvalidEmail("\nok@gmail.com"));
    assertTrue(MailChecker.isInvalidEmail("ok@gmail.com\\n"));
  }

  @Test
  public void isValidMethodShouldReturnFalseIfProvidedEmailIsThrowable(){
    assertFalse(MailChecker.isValidEmail("ok@33mail.com"));
    assertFalse(MailChecker.isValidEmail("ok@ok.33mail.com"));
    assertFalse(MailChecker.isValidEmail("ok@guerrillamailblock.com"));
    assertFalse(MailChecker.isValidEmail("test@data-protection-solutions.com"));


  }

  @Test
  public void isInvalidMethodShouldReturnTrueIfProvidedEmailIsThrowable(){
    assertTrue(MailChecker.isInvalidEmail("ok@33mail.com"));
    assertTrue(MailChecker.isInvalidEmail("ok@ok.33mail.com"));
    assertTrue(MailChecker.isInvalidEmail("ok@guerrillamailblock.com"));
    assertTrue(MailChecker.isInvalidEmail("test@data-protection-solutions.com"));
  }

  @Test
  public void getAllDomainCorrectlyMapsAllDomain() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
    String emailAddress = "ok@my.plop.check.pop.com";
    List<String> domain = Arrays.asList("my.plop.check.pop.com", "plop.check.pop.com", "check.pop.com", "pop.com", "com");
    Method method = MailChecker.class.getDeclaredMethod("getAllDomainSuffix", String.class);
    method.setAccessible(true);

    List<String> result = (List<String>) method.invoke(null, emailAddress);
    assertEquals(domain.size(), result.size());
    assertEquals(domain, result);
  }

  @Test
  public void blacklistedAndTheirSubdomainsWillReturnTrueForIsInvalidMethod(){
    Collection<String> collection = MailChecker.blacklist();
    for (String next : collection) {
      assertTrue(MailChecker.isInvalidEmail("test@" + next));
      assertTrue(MailChecker.isInvalidEmail("test@subdomain." + next));
      assertFalse(MailChecker.isInvalidEmail("test@" + next + ".gmail.com"));
    }
  }

  @Test
  public void dynamicallyAddedDomainsToBlackListWillReturnAsTrue(){
    assertTrue(MailChecker.isValidEmail("foo@youtube.com"));
    assertTrue(MailChecker.isValidEmail("foo@google.com"));
    assertTrue(MailChecker.isValidEmail("ok@gmail.com"));
    assertTrue(MailChecker.isValidEmail("ok@yahoo.com"));

    MailChecker.addCustomDomains("youtube.com");

    assertFalse(MailChecker.isValidEmail("foo@youtube.com"));
    assertTrue(MailChecker.isValidEmail("foo@google.com"));
    assertTrue(MailChecker.isValidEmail("ok@gmail.com"));
    assertTrue(MailChecker.isValidEmail("ok@yahoo.com"));

    MailChecker.addCustomDomains(Arrays.asList("yahoo.com", "google.com"));

    assertFalse(MailChecker.isValidEmail("foo@youtube.com"));
    assertFalse(MailChecker.isValidEmail("foo@google.com"));
    assertFalse(MailChecker.isValidEmail("ok@yahoo.com"));
    assertTrue(MailChecker.isValidEmail("ok@gmail.com"));

  }




}
