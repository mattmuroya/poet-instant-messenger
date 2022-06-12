# Poet Instant Messenger

![Poet Demo GIF](./assets/poet-demo.gif)

Poet is a full stack MERN (MongoDB, Express, React, and Node.js) instant messenger with real-time WebSocket communication, styled in the spirit of the retro-classic IM apps of the late ‘90s.

Try it out! https://poet.mattmuroya.com/

The rest of this document provides directions for setting up a copy of poet on your local machine, as well as a high level overview of the main application design features.

- [How to Run This Application](#how-to-run-this-application)
-

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

## Client Design

## Server Design

## Front end

The front end is a [React](https://reactjs.org/) client built using [create-react-app](https://create-react-app.dev/) and structured with [React Router](https://reactrouter.com/).

### Highlights

- Function components with `useEffect()` for performing lifecycle methods and `useState()` for managing local state.
- React Context API for global state managementment of the current user, chat, and WebSocket connection.
- Custom hook for validating the current session/auth token and fetching user details from the server.
- Retro-classic '90s styling based on the excellent [98.css by jdan](https://github.com/jdan/98.css), with a handful of custom elements and minor modifications to fonts and sizing in the interest of overall usability.

### Optimizations

- The home page at `<base>/` does not indicate chat IDs dynamically. I'd like to make the client-side routing such that the URL reads `<base>/chat/<username>` so that if the user refreshes the application, it can reopen the current chat.
- The UI doesn't notify you of missed messages. This would require extracting the individual items on the friend list to a separate component so you can render counts for each.
- Would like to add the ability to edit/delete sent messages.

## Back end

The back end is a [Node.js](https://nodejs.org/en/) server built on using the [Express](https://expressjs.com/) framework. The server also technically serves all the static client-side files from a build folder.

### Highlights

- Real-time event-driven WebSocket communication via [Socket.IO](https://socket.io/), allowing for live chat between users.
- JSON Web Token (JWT) user auth. Each time a user reloads the application, the server either refreshes the token (resetting the expiry period), or prompts re-authentication if it is missing/invalid/expired.
- Custom middlewares for error handling, token validation, and request logging (in development mode).
- Seperate development and production databases for ease of development/testing with a custom reset/sample data utility.
- Test-driven development (TDD) with [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest) for all API endpoints, focused mainly on segmented integration testing. Tests cover execution and error handling for authentication, user administration, user actions (sending invites and adding friends), and sending and receiving messages.

![Test Driven Development](./assets/poet-tdd.png)

### Optimizations

- Most API routes require token authorization, however an authorized user could technically request any data they want by accessing the endpoint and setting their token to the `Authorization` header. I would like to improve security by restricting access to a one's own data only.
- There are some event handlers/hooks on the front end e.g. `useAuth()` which require multiple fetch requests to retrieve the necessary data. It would improve speed and efficiency to modify server response data to eliminate the need for multiple requests.

## Development challenges

- Architecture: the planning stage is critical when building any full stack application. If you don't plan for loose coupling, modularity and extensibility, it can be difficult to implement new features. For example, in order to implement public/group chats, I'll need to refactor the Message schema and/or client message rendering entirely; currently, the entire front end depends on a very specific 1:1 sender-recipient relationship to render messages in the chat window. In a group chat, there is no specific recipient, unless I am able to treat a chat room as if it were another user ("chat" state in the app). To be determined...
- State management: At first, the current user details, chat, and WebSocket data were all managed in a single parent component; this required some messy prop-drilling until I refactored to manage these things globally with [React's Context API](https://reactjs.org/docs/context.html). I'm looking forward to exploring how [Redux](https://redux.js.org/) could improve my future projects.
