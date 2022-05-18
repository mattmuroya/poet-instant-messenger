# Poet Instant Messenger
Poet is a modern full stack chat app with real-time client-server communication via Socket.io, styled in the spirit of the instant messengers of the ‘90s. Token-authenticated RESTful API with full CRUD functionality built following test-driven development (TDD) practices.

## '90s Styling
Poet is styled in the spirit of the early instant messenger apps of the '90s; think AIM, ICQ, and Yahoo! Messenger. The main look and feel relies on the excellent [98.css package by jdan]([https://www.google.com](https://github.com/jdan/98.css)), with some minor modifications in the interest of overall usability/accessibility. As much as we all love turn-of-the-century MS San Serif, it was never meant to be rendered in a modern web browser on the big, high-resolution displays we have today.

## JWT authentication layer with custom refresh implementation
When a user signs in, the server responds with a JSON web token (JWT) set to expire in 24 hours. The token is saved to localStorage. Each time the user reloads the application, the client executes a custom hook which sends the saved token back to the server for verification.

If the token is invalid or expired, the server responds with a 401 status code and the user is redirected to the login page. If the token is still valid, the server responds with a new token which replaces the original in localStorage, effectively resetting the 24 hour expiry period.
