# frozen_string_literal: true
require 'set'

module MailChecker
  EMAIL_REGEX = /\A{{& unanchoredRegexpString }}\z/i
  # Blacklisted domains
  BLACKLIST = [{{& listSTR }}].to_set

  def self.valid?(email)
    valid_email?(email) && !blacklisted?(email)
  end

  def self.valid_email?(email)
    !email.nil? && !!(email =~ EMAIL_REGEX)
  end

  def self.blacklisted?(email)
    extract_all_domain_suffixes(email).any? { |domain| BLACKLIST.include?(domain) }
  end

  def self.add_custom_domains(domains)
    domains.each do |domain|
      BLACKLIST.add(domain)
    end
  end

  def self.extract_all_domain_suffixes(email)
    domain = email.to_s.gsub(/.+@([^.]+)/, '\1').downcase

    domain_components = domain.split('.')

    (0...domain_components.length).map { |n| domain_components.drop(n).join('.') }
  end
end

def MailChecker(email)
  MailChecker.valid?(email)
end
