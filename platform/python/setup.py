# coding=utf-8

from setuptools import setup

setup(
  name='mailchecker',
  version='3.2.1-pre2',
  py_modules=['MailChecker'],
  url='https://github.com/FGRibreau/mailchecker',
  license='MIT',
  author='Francois-Guillaume Ribreau',
  description='Cross-language email validation. '
              'Backed by a database of thousands throwable email providers.',
  classifiers=[
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy'
  ],
)
