# coding=utf-8

from setuptools import setup

setup(
  name='mailchecker',
  version = "3.2.10",
  py_modules=['MailChecker'],
  url='https://github.com/FGRibreau/mailchecker',
  license='MIT',
  author='Francois-Guillaume Ribreau',
  author_email='github@fgribreau.com',
  description='Cross-language email validation. '
              'Backed by a database of thousands throwable email providers.',
  classifiers=[
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy'
  ],
)
