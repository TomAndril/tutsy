# Tutsy

Tutsy is a youtube video tracker that lets you study for free by watching top class content creators

## Getting started

Make sure you have `MySQL` installed. If not. Download it [here](https://dev.mysql.com/downloads/mysql/)

Open `mySQL Command Line` and create an empty database by:

1. `CREATE DATABASE tuti_prisma;`
2. `USE tuti_prisma;`

On the root folder, create a file named `.env.development` and paste the following code

`DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/tuti_prisma"`

replace `USERNAME` AND `PASSWORD` with the ones you have created when installing mySQL

## Setting up playwright E2E tests

1. Create a `playwright.auth.json` file on the root folder. This file will contain all the credentials needed to run the tests
2. Run `npx playwright codegen localhost:3000 --save-storage=playwright.auth.json`
3. Sign in with you preferred provider

