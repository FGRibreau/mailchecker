# coding=utf-8

import setuptools
import os

here = os.path.abspath(os.path.dirname(__file__))

with open(os.path.join(here, "README.md"), "r") as fh:
  long_description = fh.read()

setuptools.setup(
  name="mailchecker",
  version = "6.0.18",
  author='Francois-Guillaume Ribreau',
  author_email='github@fgribreau.com',
  description="Cross-language temporary email detection library. Stop users from signing up with temporary email addresses.",
  long_description=long_description,
  long_description_content_type="text/markdown",
  url="https://github.com/FGRibreau/mailchecker",
  py_modules=["MailChecker"],
  classifiers=[
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
    "Operating System :: OS Independent",
  ],
  python_requires='>=3.6',
)
