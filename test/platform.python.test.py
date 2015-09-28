# for testing only; add the python MailChecker to the system path
import os, sys
sys.path.insert(0, '../platform/python/')

# import MailChecker, create instance, check emails
import MailChecker 

m = MailChecker.MailChecker()

print m.is_valid('bla@example.com')
print m.is_valid('bla@yourlms.biz')
print m.is_valid('example@you.it')
print m.is_valid('bla@hotmail.com')
print m.is_valid('bla@yui.it')
print m.is_valid('')
