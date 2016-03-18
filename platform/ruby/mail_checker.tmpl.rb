require 'set'

module MailChecker
  EMAIL_REGEX = /{{& regexp}}/i
  # Blacklisted domains
  BLACKLIST = [{{& listSTR }}].to_set

  def self.valid?(email)
    return false unless valid_email?(email)

    !extract_all_domain_suffixes(email).any? { |domain| BLACKLIST.include?(domain) }
  end

  def self.valid_email?(email)
    return false if email.nil?

    email =~ EMAIL_REGEX
  end

  def self.extract_all_domain_suffixes(email)
    domain = email.gsub(/.+@([^.]+)/, '\1').downcase

    domain_components = domain.split('.')

    (0...domain_components.length).map { |n| domain_components.drop(n).join('.') }
  end
end

def MailChecker(email)
  MailChecker.valid?(email)
end
