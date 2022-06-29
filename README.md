# Poet Instant Messenger

![Poet Demo GIF](./assets/poet-demo.gif)

Poet is a full stack JavaScript/MERN ([MongoDB](https://www.mongodb.com/),
[Express](https://expressjs.com/), [React](https://reactjs.org/), and
[Node.js](https://nodejs.org/en/)) instant messenger with real-time WebSocket
communication via [Socket.IO](https://socket.io/), styled in the spirit of the
retro-classic IM apps of the late ‘90s (think AIM, Yahoo, and MSN).

Try it out! https://poet-instant-messenger.herokuapp.com/

## About this Document

This document provides directions for setting up a copy of Poet on your local
machine. It assumes some basic familiarity with configuring your own MongoDB
instance and running Git/NPM commands from the command line.

## How to Run This Application

Follow the instructions below to download and run a copy of Poet on your local
machine.

1. [Set up MongoDB](#1-set-up-mongodb)
2. [Clone project files](#2-clone-project-files)
3. [Configure environment variables](#3-configure-environment-variables)
4. [Run the guest account utility](#4-run-the-guest-account-utility)
5. [Start the application](#5-start-the-application)

If you would like to view the app in production, check out the
[live demo](https://poet-instant-messenger.herokuapp.com/).

### 1. Set up MongoDB

Poet stores user and message data in a MongoDB database. In order to run your
own copy of Poet, you must connect your own database instance. Database setup
and configuration is beyond the scope of this document, however a free instance
hosted on MongoDB Atlas is the recommended approach. You can
[learn how to set up a hosted database on MongoDB's website](https://www.mongodb.com/basics/mongodb-atlas-tutorial).

Once you have set up your database and access credentials, make note of your
application connection string. You will need this string for step 3.

### 2. Clone project files

[Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
this repository to your Desktop (or wherever you keep your projects). Once you
have the project files, install the necessary dependencies:

1.  Open a terminal window.
2.  `cd` into the `server` directory inside the project folder and install
    server dependencies.

    ```console
    $ cd Desktop/poet/server && npm install
    ```

3.  `cd` into the `client` directory and install client dependencies.

    ```console
    $ cd ../client && npm install
    ```

### 3. Configure environment variables

Poet requires several _environment variables_. An environment variable is a
variable set by whatever process is running your application. In production,
this process is your hosting platform (Poet runs on
[Heroku](https://www.heroku.com/)). In development, this process is your local
dev server.

You need to set these environment variables locally so that Poet can access them
from the dev server running on your computer.

1.  Open the project folder in your text editor of choice.
    [Visual Studio Code](https://code.visualstudio.com/) is a popular free
    option.

2.  Expand the file tree and create a file called `.env` inside the inside the
    `server` directory, and another inside the `client` directory

    ![env files](./assets/env-files.png)

3.  Paste the following into `server/.env`:

    ```
    PORT=3001

    MONGODB_URL_TEST="mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@<DB_HOST>/?retryWrites=true&w=majority"

    JWT_SECRET="<STRING_OF_RANDOM_CHARACTERS>"

    GUEST_PW="<GUEST_PASSWORD>"
    ```

    - `PORT=3001` instructs the dev server to run on localhost:3001. Do not
      change this variable.
    - `MONGODB_URL_TEST` is your MongoDB connection string. Replace
      `<DB_USERNAME>`, `<DB_PASSWORD>`, and `<DB_HOST>` with the respective
      values in your MongoDB connection string from step 1.
    - `JWT_SECRET` is a private key that your application uses to encode and
      decode [JWT access tokens](https://jwt.io/) for user authorization.
      Replace `<STRING_OF_RANDOM_CHARACTERS>` with any random string; the
      recommended minimum length is 32 characters (alphanumeric, `-`, `_`, and
      `.`).
    - `GUEST_PW` is the password that Poet will assign to the guest account when
      you run database utility in the next step. Replace `<GUEST_PASSWORD>` with
      any string of at least 8 characters.

4.  Open `client/.env` and paste in the following:

        REACT_APP_GUEST_PW="<PASSWORD>"

    - `REACT_APP_GUEST_PW` should match the guest password you provided in
      `server/.env`. Replace `<PASSWORD>` with the same guest password you used
      above.

5.  Save and close both `.env` files.

### 4. Run the guest account utility

The `server/utils` directory contains several utilities for populating the
database with test and demo data. You only need to run `guest.js`, which creates
a guest account and saves the user details to the database (for the "login as a
guest" feature).

There is a predefined NPM script which will create the guest account with the
password you specified in your `.env` files in step 3. Running this script is a
good way to test your database connection.

1. Open a new terminal window.
2. `cd` in to the `server` directory and run the guest script.

   ```console
   $ cd Desktop/poet/server && npm run guest
   ```

If the operation fails with a MongoDB-related error, it most likely means your
connection was unsuccessful. Double-check that the connection string you
provided contains the correct database credentials.

### 5. Start the application

In development mode, the client (front end) and server (back end) run on
separate dev servers. This means you will need to open two terminal windows and
run both simultaneously.

#### Start the `server` server

1. Open a new terminal window.
2. `cd` into the `server` directory and run the development server start script.

   ```console
   $ cd Desktop/poet/server && npm run dev
   ```

#### Start the `client` server

1. Open a second terminal window.
2. `cd` into the `client` directory and run the development client start script.

   ```console
   $ cd Desktop/poet/client && npm start
   ```

The client should start automatically on port 3000 at http://localhost:3000/
(the server is on port 3001).

You should now have a fully functional copy of Poet running locally. Try logging
in with the guest account using "login as a guest" at
http://localhost:3000/login, or create a new account on
http://localhost:3000/register. Have fun!
