# Tuti

Tuti is a youtube video tracker that lets you study for free by watching top class content creators

## Getting started

Make sure you have `PostgreSQL` installed. If not. Download it [here](https://www.postgresql.org/download/)

Open `pgAdmin` and create an empty database, name it `tuti-prisma`

On the root folder, create a file named `.env.development` and paste the following code 

`DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/tuti-prisma?schema=public"`

replace `USERNAME` AND `PASSWORD` with the ones you have created when installing postgres

## Setting up playwright E2E tests
1. Create a `playwright.auth.json` file on the root folder. This file will contain all the credentials needed to run the tests
2. Run `npx playwright codegen localhost:3000 --save-storage=playwright.auth.json`
3. Sign in with you preferred provider