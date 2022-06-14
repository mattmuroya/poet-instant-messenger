# Poet Instant Messenger

![Poet Demo GIF](./assets/poet-demo.gif)

Poet is a full stack MERN (MongoDB, Express, React, and Node.js) instant messenger with real-time WebSocket communication, styled in the spirit of the retro-classic IM apps of the late ‘90s.

Try it out! https://poet.mattmuroya.com/

## About this Document

This document provides directions for setting up and running a copy of Poet on your local machine, as well as reference for the backend API endpoints. It assume some basic familiarity with setting up an instance of MongoDB and running git/npm commands from the command line.

- [How to Run This Application](#how-to-run-this-application)
- [API Reference](#api-reference)

## How to Run This Application

Follow the instructions below to download and run a copy of Poet on your local machine.

1. [Set up MongoDB](#1-set-up-mongodb)
2. [Clone project files](#2-clone-project-files)
3. [Configure environment variables](#3-configure-environment-variables)
4. [Run the guest account utility](#4-run-the-guest-account-utility)
5. [Start the application](#5-start-the-application)

If you would like to view the app in production, check out the [live demo](https://poet.mattmuroya.com/).

### 1. Set up MongoDB

Poet stores user and message data in a MongoDB database. In order to run your own copy of Poet, you must also connect your own database instance. Database setup and configuration is beyond the scope of this document, however a free instance hosted on MongoDB Atlas is the recommended method. You can [learn how to set up a hosted database on MongoDB's website](https://www.mongodb.com/basics/mongodb-atlas-tutorial).

Once you have set up your database and access credentials, make note of your "connection string." You will need this string for step 3.

### 2. Clone project files

[Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository to your Desktop (or wherever you keep your projects). Once you have the project files, install the necessary dependencies:

1.  Open your terminal, `cd` into the `server` directory inside the project folder, and install server dependencies.

    ```console
    $ cd Desktop/poet/server && npm install
    ```

2.  `cd` into the `client` directory and install client dependencies.

    ```console
    $ cd ../client && npm install
    ```

### 3. Configure environment variables

Poet requires several _environment variables_. An environment variable is a variable set by whatever "process" is running your application. In production, this process is your hosting platform (Poet runs on [Heroku](https://www.heroku.com/)). In development, this process is your local dev server.

You need to set these environment variables locally so that Poet can access them from the dev server running on your computer.

1.  Open the project folder in your text editor of choice. [Visual Studio Code](https://code.visualstudio.com/) is a popular free option.

2.  Expand the file tree and a file called `.env` inside the inside the `server` directory, and another inside the `client` directory

    ![env files](./assets/env-files.png)

3.  Paste the following into `server/.env`:

    ```
    PORT=3001

    MONGODB_URL_TEST="mongodb+srv://<username>:<password>@<host>/?retryWrites=true&w=majority"

    JWT_SECRET="<long_string_of_random_characters>"

    GUEST_PW="<password>"
    ```

    - `PORT=3001` instructs the dev server to run on localhost:3001. Do not change this variable.
    - `MONGODB_URL_TEST` is your MongoDB connection string. Replace the placeholder with the string you generated when setting up your database in step 1.
    - `JWT_SECRET` is a private key that your application uses to encode [JWT access tokens](https://jwt.io/) for user authorization. It can be any random string with a recommended minimum length of 32 characters (alphanumeric, `-`, `_`, and `.`).
    - `GUEST_PW` is the password that Poet will assign to the guest account when you run database utility in the next section. It can be any string of at least 8 characters.

4.  Open `client/.env` and paste in the following:

        REACT_APP_GUEST_PW="password"

    - `REACT_APP_GUEST_PW` must match the `GUEST_PW` you provided in the `server/.env` file.

5.  Save both `.env` files.

### 4. Run the guest account utility

The `server/utils` directory contains several utilities for populating the database with test and demo data. You only need to worry about `guest.js`. There is a predefined NPM script which will initialize the guest account with the password you specified in your `.env` files.

1. `cd` in to the `server` directory and run the guest script.

   ```console
   $ npm run guest
   ```

If the operation fails, double-check that the connection string you provided contains the correct database credentials.

### 5. Start the application

In development mode, the client (front end) and server (back end) run on seperate dev servers. This means you will need to open two terminal windows and run both servers simultaneously.

#### Start the Server

1. Open a new terminal window.
2. `cd` into the `server` directory and run the development server start script.

   ```console
   $ cd Desktop/poet/server && npm run dev
   ```

#### Start the Client

1. Open a second terminal window.
2. `cd` into the `client` directory and run the development client start script.

   ```console
   $ cd Desktop/poet/client && npm start
   ```

The client should start automatically on http://localhost:3000/.

You should now have a fully-functional copy of Poet running locally on your computer. Try logging in as a guest using the link on the login page, or create a new account on the register page. Have fun!

## API Reference

Poet's backend is a RESTful API Node.js server (contained within the `server` directory). This section contains reference documentation for the API endpoints.

All API requests must have an authorization header

There are two primary resource categories:

- [users](#users)
- [messages](#messages)

There is also an endpoint for refreshing the user's authentication:

- [auth](#auth)

### users

Provides access to user data and actions, including registration, login, and sending/cancelling/receiving/rejecting friend invites.

#### **`GET`** /users/

#### **`GET`** /users/redacted

#### **`GET`** /users/current

#### **`GET`** /users/{id}

#### **`POST`** /users/login/

#### **`POST`** /users/register/

#### **`PUT`** /users/invite/

#### **`PUT`** /users/invite/cancel/

#### **`PUT`** /users/invite/accept/

#### **`PUT`** /users/invite/reject/

### messages

Provides the access to retrieve stored messages and send new messages.

#### **`GET`** /messages/{chatId}/

#### **`POST`** /messages/

### auth

Validates the current user's authentication status and refreshes or revokes the auth token accordingly.

#### **`POST`** /auth/
