# Poet Instant Messenger

Poet is a full stack MERN (MongoDB, Express, React, and Node.js) instant messenger with real-time client-server communication, styled in the spirit of the retro-classic IM apps of the late ‘90s.

![GIF](./assets/poet-demo.gif)

Try it out! https://poet.mattmuroya.com/login

## Front end

The front end is a [React](https://reactjs.org/) client built using [create-react-app](https://create-react-app.dev/) and structured with [React Router](https://reactrouter.com/).

### Highlights

- Function components with `useEffect()` for performing lifecycle methods and `useState()` for managing local state.
- React Context API for global state managementment of the current user, chat, and WebSocket connection.
- Custom hook for validating the current session/auth token and fetching user details from the server.
- Retro-classic '90s styling based on the excellent [98.css by jdan](https://github.com/jdan/98.css), with minor modifications to fonts and sizing in the interest of overall usability.

### Optimizations

- The home page at `<base>/` does not indicate chat IDs dynamically. I'd like to make the client-side routing such that the URL reads `<base>/chat/<username>` so that if the user refreshes the application, it can reopen the current chat.
- The UI doesn't notify you of missed messages. This would require extracting the individual items on the friend list to a separate component so you can render counts for each.
- Would like to add the ability to edit/delete sent messages.

## Back end

The backend is a [Node.js](https://nodejs.org/en/) application built on an [Express](https://expressjs.com/) server. The server also technically serves all the static client-side files from a build folder.

### Highlights

- Real-time event-driven WebSocket communication via [Socket.IO](https://socket.io/), allowing for live chat between users.
- JSON Web Token (JWT) user auth. Each time a user reloads the application, the server either refreshes the token (resetting the expiry period), or prompts re-authentication if it is missing/invalid/expired.
- Custom middlewares for error handling, token validation, and request logging (in development mode).
- Seperate development and production databases for ease of development/testing with a custom reset/sample data utility.
- Test-driven development (TDD) with [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest) for all API endpoints, focused mainly on segmented integration testing. Tests cover execution and error handling for authentication, user administration, user actions (sending invites and adding friends), and sending and receiving messages.

### Optimizations

- Most API routes require token authorization, however an authorized user could technically request any data they want by accessing the endpoint and setting their token to the `Authorization` header. I would like to improve security by restricting access to a one's own data only.
- There are some event handlers/hooks on the front end e.g. `useAuth()` which require multiple fetch requests to retrieve the necessary data. It would improve speed and efficiency to modify server response data to eliminate the need for multiple requests.

## Development challenges

- Architecture: the planning stage is critical when building any full stack application. If you don't plan for loose coupling, modularity and extensibility, it can be difficult to implement new features. For example, in order to implement public/group chats, I'll need to refactor the Message schema and/or client message rendering entirely; currently, the entire front end depends on a very specific 1:1 sender-recipient relationship to render messages in the chat window. In a group chat, there is no specific recipient, unless I am able to treat a chat room as if it were another user ("chat" state in the app). To be determined...
- State management: At first, the current user details, chat, and WebSocket data were all managed in a single parent component; this required some messy prop-drilling until I refactored to manage these things globally with [React's Context API](https://reactjs.org/docs/context.html). I'm looking forward to exploring how [Redux](https://redux.js.org/) could improve my future projects.
