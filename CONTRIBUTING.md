# Contributing to Mailchecker <!-- omit in toc -->

## Getting started<!-- omit in toc -->

Before you begin:
- Mailchecker is powered by Node.js. Check to see if you're on the right [version of node in `engines.node`](package.json).
- Docker is used for setting up and running tests for various platforms. [Install Docker](https://www.docker.com/get-started) and make sure you have `docker` command in `PATH`.


### How to add new domains to the disallow list?

Before you make your changes, check to see if an [pull-request](https://github.com/FGRibreau/mailchecker/pulls) exist already for the changes you want to make.

To add new domains to Mailchecker disallow list [open an PR](https://github.com/FGRibreau/mailchecker/issues/new/choose) that:
- **only (only)** change and **commit** the [list.txt](list.txt) file
- test locally everything with `npm test`
- only commit [`list.txt`](list.txt) file change, every libraries will be automatically updated once the PR is merged

## Reviewing
I review every single PR. The purpose of reviews is to ensure every domain is used for disposable emails.
