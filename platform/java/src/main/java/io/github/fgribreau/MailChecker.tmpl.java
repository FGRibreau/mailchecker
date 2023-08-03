package io.github.fgribreau;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Cross-language temporary (disposable/throwaway) email detection library. Covers 55 734+ fake email providers.
 * Written in Java 8
 */
public final class MailChecker {

  /**
   * A class to hold of constants which will be parsed through the generator.js
   */
  private static final class MailCheckerConstants {
    /**
     * Contains all the blacklisted domains present in the database at https://github.com/FGRibreau/mailchecker/blob/master/list.txt
     */
    static final HashSet<String> BLACKLISTED_SET = new HashSet<>();
    /**
     * Provides a regex-pattern for matching whether the provided email is a valid email.
     * For more: See https://fightingforalostcause.net/content/misc/2006/compare-email-regex.php
     */
    static final String VALIDATION_REGEX = "{{& unanchoredRegexpString }}";
  }

  /**
   * Regex Pattern Matcher
   */
  private static final Pattern VALIDATOR_PATTERN;

  /**
   * Static initializer to initialize {@link MailChecker#VALIDATOR_PATTERN}
   */
  static {
    VALIDATOR_PATTERN = Pattern.compile(MailCheckerConstants.VALIDATION_REGEX);

    //This should throw null pointer
    try (
      final InputStream inputStream = MailChecker.class.getClassLoader().getResourceAsStream("list.txt");
      final InputStreamReader isReader = new InputStreamReader(inputStream);
      final BufferedReader reader = new BufferedReader(isReader);
      ){
      while (reader.ready()){
        MailCheckerConstants.BLACKLISTED_SET.add(reader.readLine());
      }
    }catch (NullPointerException e){
      throw new FailedInitializationException("Failed to locate list.txt with in the library! If issue persist, please open up an issue at https://github.com/FGRibreau/mailchecker/issues", e);
    }catch (Exception e){
      throw new FailedInitializationException(e);    }
  }

  /**
   * Checks whether a provided email is valid or not?
   * This will also return false, if the passed string is null or empty
   * @param emailAddress An email address
   * @return true is the specified email is valid, false otherwise
   */
  public static boolean isValidEmail(final String emailAddress){
    if(emailAddress == null || emailAddress.isEmpty())
      return false;

    final String emailAddressLowerCase = emailAddress.toLowerCase();

    final Matcher matcher = VALIDATOR_PATTERN.matcher(emailAddress);
    if(!matcher.matches())
      return false;

    for (String eachSuffix : getAllDomainSuffix(emailAddress)) {
      if(MailCheckerConstants.BLACKLISTED_SET.contains(eachSuffix))
        return false;
    }

    return true;
  }

  /**
   * Checks whether a provided email is valid or not?
   * This will also return true, if the passed string is null or empty
   * @param emailAddress An email address
   * @return true is the specified email is invalid, false otherwise
   */
  public static boolean isInvalidEmail(final String emailAddress){
    return !isValidEmail(emailAddress);
  }

  /**
   * Get all the blacklisted domain providers.
   * This will only provide domains which are present at the moment, if new domains are added via {@link MailChecker#addCustomDomains(String...)} or {@link MailChecker#addCustomDomains(Collection)}
   * one should get a new copy by calling it over again.
   * @return A copy of all the blacklisted domains
   */
  public static Collection<String> blacklist(){
    return new HashSet<>(MailCheckerConstants.BLACKLISTED_SET);
  }

  /**
   * Add a domain to the blacklisted list temporarily
   * @param domains Domains to be added
   */
  public static void addCustomDomains(String... domains){
    addCustomDomains(Arrays.asList(domains));
  }

  /**
   * Add a domain to the blacklisted list temporarily
   * @param domains Domains to be added
   */
  public static void addCustomDomains(Collection<String> domains){
    MailCheckerConstants.BLACKLISTED_SET.addAll(domains);
  }

  private static List<String> getAllDomainSuffix(String emailAddress) {
    String[] components = emailAddress.split("@")[1].split("\\.");
    List<String> domainSuffixes = new ArrayList<>();
    for (int n = 0; n < components.length; n++) {
      String domainSuffix = String.join(".", Arrays.copyOfRange(components, n, components.length));
      domainSuffixes.add(domainSuffix);
    }
    return domainSuffixes;
  }


}
