#Poet Instant Messenger
Poet is a modern full stack chat app with real-time client-server communication via Socket.io, styled in the spirit of the instant messengers of the ‘90s. Token-authenticated RESTful API with full CRUD functionality built following test-driven development (TDD) practices.

###JWT token-based authentication layer with custom refresh implementation

When a user signs in, the server responds with a JWT token set to expire in 24 hours. The token is saved to localStorage. Each time the user reloads the application, the client executes a custom hook which sends the saved token back to the server for verification.

If the token is invalid or expired, the server responds with a 401 status code and the user is redirected to the login page. If the token is still valid, the server responds with a new token which replaces the original in localStorage, effectively resetting the 24 hour expiry period.
