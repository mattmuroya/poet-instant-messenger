# Poet Instant Messenger

![Poet Demo GIF](./assets/poet-demo.gif)

Poet is a full stack JavaScript/MERN ([MongoDB](https://www.mongodb.com/),
[Express](https://expressjs.com/), [React](https://reactjs.org/), and
[Node.js](https://nodejs.org/en/)) instant messenger with real-time WebSocket
communication via [Socket.IO](https://socket.io/), styled in the spirit of the
retro-classic IM apps of the late ‘90s (think AIM, Yahoo, and MSN).

Try it out! https://poet-instant-messenger.onrender.com/

## About this Document

This document provides directions for installing, configuring, and running a
full copy of Poet on your local machine. You should have a basic familiarity
with cloning repositories from GitHub, managing project files, and running NPM
commands from the command line.

You will also need to set up your own MongoDB instance, which is not covered
here in depth.

### Prerequisites

- Install the latest version of [Node.js](https://nodejs.org/en/download/) on
  your computer.
- Download a text editor such as
  [Visual Studio Code](https://code.visualstudio.com/).

## Install and run the application

Follow the instructions below to install, configure, and run a copy of Poet on
your local machine.

1. [Set up MongoDB](#1-set-up-mongodb)
2. [Clone project files](#2-clone-project-files)
3. [Configure environment variables](#3-configure-environment-variables)
4. [Run the guest account setup utility](#4-run-the-guest-account-setup-utility)
5. [Start the application](#5-start-the-application)

If you would like to view the app in production, see the
[live demo](https://poet-instant-messenger.onrender.com/), hosted on Render
(Note: Render spins down applications on inactivity so it might take a minute or
so to load).

### 1. Set up MongoDB

Poet stores user and message data in a MongoDB database. In order to run your
own copy of Poet, you must connect your own database instance. Database setup
and configuration is beyond the scope of this document, however a free instance
hosted on MongoDB Atlas is the recommended approach. You can
[learn how to set up a hosted database on MongoDB's website](https://www.mongodb.com/basics/mongodb-atlas-tutorial).

Once you have set up a database and configured your access credentials, make
note of your application connection string. You will need this string for
step 3.

### 2. Clone project files

[Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
this repository to your computer. Once you have the project files, install
server and client dependencies.

1. Open a new terminal window.
2. `cd` into the `server` directory inside the project folder and install server
   dependencies.

   ```console
   $ cd poet/server && npm install
   ```

3. `cd` into the `client` directory and install client dependencies.

   ```console
   $ cd ../client && npm install
   ```

### 3. Configure environment variables

Poet requires several _environment variables_. An environment variable is a
variable set by whatever process is running your application. In production,
this process is your hosting platform (Poet runs on
[Render](https://render.com/)). In development, this process is your local
development server.

You need to set these environment variables locally so that Poet can access them
from the development server running on your computer.

1.  Open the project folder in your text editor of choice.
    [Visual Studio Code](https://code.visualstudio.com/) is a popular free
    option.

2.  Expand the file tree and create a file called `.env` inside the inside the
    `server` directory, and another inside the `client` directory.

    ```
    poet/
    ├─ client/
    │  ├─ ...
    │  └─ .env    +
    └─ server/
       ├─ ...
       └─ .env    +
    ```

3.  Paste the following into `server/.env`:

    ```
    PORT=3001

    MONGODB_URL_TEST="mongodb+srv://<DB_USERNAME>:<DB_PASSWORD>@<DB_HOST>/?retryWrites=true&w=majority"

    JWT_SECRET="<STRING_OF_RANDOM_CHARACTERS>"

    GUEST_PW="<PASSWORD>"
    ```

    - `PORT=3001` instructs the development server to run on localhost:3001. Do
      not change this variable.
    - `MONGODB_URL_TEST` is your MongoDB connection string. Replace the
      placeholder string with your MongoDB connection string from step 1.
    - `JWT_SECRET` is a private key that your application uses to encode and
      decode [JWT access tokens](https://jwt.io/) for user authorization.
      Replace `<STRING_OF_RANDOM_CHARACTERS>` with any random string; the
      recommended minimum length is 32 characters (alphanumeric, `-`, `_`, and
      `.`).
    - `GUEST_PW` is the password that Poet will assign to the guest account when
      you run database utility in the next step. Replace `<PASSWORD>` with any
      string of at least 8 characters.

4.  Open `client/.env` and paste in the following:

        REACT_APP_GUEST_PW="<PASSWORD>"

    - `REACT_APP_GUEST_PW` should match the guest password you provided in
      `server/.env`. Replace `<PASSWORD>` with the same password you provided
      above.

5.  Save and close both `.env` files.

### 4. Run the guest account setup utility

The `server/utils` directory contains several utilities for populating the
database with test and demo data. At a minimum, you only need to run `guest.js`,
which creates a guest account and saves the user details to the database,
enabling the **login as Guest** feature.

There is a predefined NPM script to execute `guest.js` and create the guest
account. Running this script will also help you ensure that your database
connects successfully.

1. Open a new terminal window.
2. `cd` in to the `server` directory and run the guest script.

   ```console
   $ cd poet/server && npm run guest
   ```

If the operation fails with a MongoDB-related error, double-check that the
connection string you provided in step 3 contains the correct database
credentials.

### 5. Start the application

In development mode, the client (front end) and server (back end) run
simultaneously on separate development servers (note the distinction between the
project directory called "server," which is the back end code; and the
development "server," which is the process on your computer that runs the code).

#### Start the `server` server

1. Open a new terminal window.
2. `cd` into the `server` directory and run the server start script.

   ```console
   $ cd poet/server && npm run dev
   ```

#### Start the `client` server

1. Open a second terminal window.
2. `cd` into the `client` directory and run the client start script.

   ```console
   $ cd poet/client && npm start
   ```

The client should start automatically on port 3000 at
[http://localhost:3000/](http://localhost:3000/) (and the server on port 3001).

You should now have a fully functional copy of Poet running locally. Try logging
in with the guest account using the **login as Guest** option at
[http://localhost:3000/login](http://localhost:3000/login), or create a new
account at [http://localhost:3000/register](http://localhost:3000/register).
