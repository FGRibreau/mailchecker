package mail_checker

import (
	"fmt"
	"reflect"
	"testing"
)

func TestReturnTrueIfValidEmail(t *testing.T) {
	emails := []string{
		"plop@plop.com",
		"my.ok@ok.plop.com",
		"my+ok@ok.plop.com",
		"my=ok@ok.plop.com",
		"ok@gmail.com",
		"ok@hotmail.com",
	}

	for i, email := range emails {
		if !IsValid(email) {
			t.Errorf("Valid email %x (test case %d) was considered invalid", email, i)
		}
	}
}

func TestReturnFalseIfEmailInvalid(t *testing.T) {
	emails := []string{
		"",
		"  ",
		"plopplop.com",
		"my+ok@ok=plop.com",
		"my,ok@ok.plop.com",
		"  ok@gmail.com  ",
		"  ok@gmail.com",
		"ok@gmail.com  ",
		"\nok@gmail.com\n",
		"\nok@gmail.com",
		"ok@gmail.com\n",
	}

	for i, email := range emails {
		if IsValid(email) {
			t.Errorf("Invalid email %x (test case %d) was considered valid", email, i)
		}
	}
}

func TestReturnFalseIfThrowableDomain(t *testing.T) {
	emails := []string{
		"ok@tmail.com",
		"ok@33mail.com",
		"ok@ok.33mail.com",
		"ok@guerrillamailblock.com",
	}

	for i, email := range emails {
		if IsValid(email) {
			t.Errorf("Email with blacklisted domain %x (test case %d) was considered valid", email, i)
		}
	}
}

func TestExtractAllDomainSuffixes(t *testing.T) {
	testCases := []struct {
		domain   string
		expected []string
	}{
		{
			domain:   "sub.example.org",
			expected: []string{"sub.example.org", "example.org", "org"},
		},
	}

	for i, testCase := range testCases {
		result := allDomainSuffixes(testCase.domain)

		if !reflect.DeepEqual(result, testCase.expected) {
			t.Errorf("Extracted domain suffixes for %s (test case %d) does not match expected result", testCase.domain, i)
		}
	}
}

func TestReturnFalseForBlacklistedDomainsAndTheirSubdomains(t *testing.T) {
	testCases := []struct {
		template string
		valid    bool
	}{
		{
			template: "test@%s",
			valid:    false,
		},
		{
			template: "test@subdomain.%s",
			valid:    false,
		},
		{
			template: "test@%s.gmail.com",
			valid:    true,
		},
	}

	for i, testCase := range testCases {
		for blacklistedDomain := range blacklist {

			email := fmt.Sprintf(testCase.template, blacklistedDomain)
			result := IsValid(email)

			if result != testCase.valid {
				t.Errorf("Expected result for email %s (test case %d) is %t, got %t", email, i, testCase.valid, result)
			}
		}
	}
}

func TestAddCustomDomains(t *testing.T) {
	testCasesBefore := []struct {
		email string
		valid bool
	}{
		{
			email: "foo@youtube.com",
			valid: true,
		},
		{
			email: "foo@google.com",
			valid: true,
		},
		{
			email: "ok@gmail.com",
			valid: true,
		},
	}

	for i, testCase := range testCasesBefore {
		result := IsValid(testCase.email)

		if result != testCase.valid {
			t.Errorf("Expected result for email %s (test case %d) is %t, got %t", testCase.email, i, testCase.valid, result)
		}
	}

	domains := []string{
		"youtube.com",
		"google.com",
	}
	AddCustomDomains(domains)

	testCasesAfter := []struct {
		email string
		valid bool
	}{
		{
			email: "foo@youtube.com",
			valid: false,
		},
		{
			email: "foo@google.com",
			valid: false,
		},
		{
			email: "ok@gmail.com",
			valid: true,
		},
	}

	for i, testCase := range testCasesAfter {
		result := IsValid(testCase.email)

		if result != testCase.valid {
			t.Errorf("Expected result for email %s (test case %d) is %t, got %t", testCase.email, i, testCase.valid, result)
		}
	}
}
