# Bored-Games-Back-End

## API Docs

```bash
# User Routes

---------------------------------------------

POST /api/user/signup
creates a new user

Payload: {
	"username": "taylor123456",
	"password": "password",
	"firstName": "Taylor",
	"lastName": "Watters"
}

Returns: {
	"user": {
		"id": 9,
		"username": "taylor123456",
		"password": "$2b$04$Mi1HoiZzqRML0RwFIxnt.eiD9eA6wjGX4HK.i7md/OXHaQF2h4nFG",
		"firstName": "Taylor",
		"lastName": "Watters",
		"updatedAt": "2023-06-06T20:25:38.738Z",
		"createdAt": "2023-06-06T20:25:38.738Z"
	}
}

---------------------------------------------

POST /api/user/login
returns a token for the user session

Payload: {
	"username": "taylor1234",
	"password": "password"
}

Returns: {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRheWxvcjEyMzQiLCJpYXQiOjE2ODYwNzM5NTUsImV4cCI6MTY4NjA3NzU1NX0.OXZ5GUEEc5Qa7K64vqY5bJGhcds3-fDC1BRvBPAwDK0"
}

---------------------------------------------

GET /api/user
gets the full list of all users

Returns: [
	{
		"id": 1,
		"username": "taytay123",
		"password": "$2b$04$mO6LivaeHOWZTQskuxDm.eNJCAAow9KRlDm7qrt4zYkl.6//dhgtq",
		"firstName": "Taylor",
		"lastName": "Watters",
		"createdAt": "2023-06-01T19:16:01.000Z",
		"updatedAt": "2023-06-01T19:16:01.000Z"
	},
    ...
]

---------------------------------------------

GET /api/search/:username
allows you to search users by a username substring

Returns: [
	{
		"id": 1,
		"username": "taytay123",
		"password": "$2b$04$mO6LivaeHOWZTQskuxDm.eNJCAAow9KRlDm7qrt4zYkl.6//dhgtq",
		"firstName": "Taylor",
		"lastName": "Watters",
		"createdAt": "2023-06-01T19:16:01.000Z",
		"updatedAt": "2023-06-01T19:16:01.000Z"
	},
    ...
]

---------------------------------------------

POST /api/user/follow/:id (protected)
follows another user for the current user

---------------------------------------------

GET /api/user/following (protected)
gets the current user a list of who they are following


Returns: [
	{
		"id": 1,
		"username": "taytay123",
		"password": "$2b$04$mO6LivaeHOWZTQskuxDm.eNJCAAow9KRlDm7qrt4zYkl.6//dhgtq",
		"firstName": "Taylor",
		"lastName": "Watters",
		"createdAt": "2023-06-01T19:16:01.000Z",
		"updatedAt": "2023-06-01T19:16:01.000Z"
	},
    ...
]

---------------------------------------------

GET /api/user/followers (protected)
gets users a list of who their followers are


Returns: [
	{
		"id": 1,
		"username": "taytay123",
		"password": "$2b$04$mO6LivaeHOWZTQskuxDm.eNJCAAow9KRlDm7qrt4zYkl.6//dhgtq",
		"firstName": "Taylor",
		"lastName": "Watters",
		"createdAt": "2023-06-01T19:16:01.000Z",
		"updatedAt": "2023-06-01T19:16:01.000Z",
		"UserFollowers": {
			"createdAt": "2023-06-08T17:57:19.000Z",
			"updatedAt": "2023-06-08T17:57:19.000Z",
			"followingId": 1,
			"followerId": 11
		}
	}
]

---------------------------------------------

# Game Routes

---------------------------------------------

GET /api/games (protected)
gets all games for current user

Returns: [
		{
		"id": 3,
		"word": "supercalifragalisticexpialidotios",
		"maxGuessCount": 5,
		"guessedLetters": "",
		"createdAt": "2023-06-08T17:41:51.000Z",
		"updatedAt": "2023-06-08T17:41:51.000Z",
		"guesserId": 1,
		"questionerId": 11
	}
]

---------------------------------------------

POST /api/games (protected)
creates a game for the current user and an opponent

Payload: {
    "oponentId": 123,
    "maxGuessCount": 5,
    "word": "hello"
}

Returns: {
	"game": {
		"id": 4,
		"guesserId": 1,
		"questionerId": 11,
		"word": "supercalifragilisticexpialidocious",
		"maxGuessCount": 5,
		"guessedLetters": "",
		"updatedAt": "2023-06-08T17:55:23.569Z",
		"createdAt": "2023-06-08T17:55:23.569Z"
	}
}

---------------------------------------------

POST /api/games/guess_letter/:gameId (protected)
guesses a letter for current user with a game id param

Payload: {
    "letter": "a"
}

Returns: {
	"game": {
		"id": 1,
		"word": "Wassup",
		"maxGuessCount": 5,
		"guessedLetters": "t,d,h",
		"createdAt": "2023-06-08T17:41:06.000Z",
		"updatedAt": "2023-06-08T17:56:07.995Z",
		"guesserId": 1,
		"questionerId": 11
	}
}
```