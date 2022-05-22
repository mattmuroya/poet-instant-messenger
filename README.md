# Poet Instant Messenger

Poet is a modern full stack chat app with real-time client-server communication via Socket.io, styled in the spirit of the instant messengers of the ‘90s. Token-authenticated RESTful API with full CRUD functionality built following test-driven development (TDD) practices.

## '90s Styling

Poet is styled in the spirit of the early instant messenger apps of the '90s; think AIM, MSN Messenger, ICQ, and Yahoo! Messenger. The main theme uses the excellent [98.css package by jdan](https://github.com/jdan/98.css), with some custom elements and minor modifications in the interest of overall usability/accessibility. As much as we all love turn-of-the-century MS San Serif, it was never meant to be rendered in a modern web browser on the big, high-resolution displays we have today.

## JWT authentication layer with custom refresh implementation

When a user signs in, the server responds with a JSON web token (JWT) set to expire in 24 hours. The token is saved to localStorage. Each time the user reloads the application, the client executes a custom hook which sends the saved token back to the server for verification.

If the token is invalid or expired, the server responds with a 401 status code and the user is redirected to the login page. If the token is still valid, the server responds with a new token which replaces the original in localStorage, effectively resetting the 24 hour expiry period.

## Testing

Development of the API endpoints follows test-driven development (TDD) practices. In the project's current state, unit-level functionality is fairly basic and doesn't require automated testing, but for all major API functionality, including registration, login, authentication/authorization, sending/receiving invites, and sending/receiving messages, I've implemented fully automated integration and (segmented) end-to-end testing using [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest). I've also written a handy utility that I can use to reset the test DB with dummy data independent of the testing scripts.

## Optimizations

- Currently, the loginUser method and the useAuth hook both send two requests; a POST request to authenticate the current user (or get a new token), and then if authorized, a GET request to retrieve the user details. It might be more efficient/stable to send the authenticated user details along with the POST request response instead of requiring a second request. This would require a refactor for both the client request methods and the API controllers.
