# Headless CMS

6.14.2023

<br>

## Project Overview

The Cerulean Lion Team was originally tasked with building a functional headless CMS website, with a decoupled front-end and back-end. The project was to have a duration of a week. However, three days into the project the lead disappeared. With a day of figuring out who was going to lead and then getting the team back on track, we had 3 days left. Nonetheless, for 3 days of work, I am proud of the work the contributors were able to accomplish considering their experience levels.

![Home Page ScreenShot](/client/next-app/src/image/Screenshot.png)

<br>

## Tech Stack

Our tech stack consists of Figma/Sketch for design, Next.Js/React for frontend implementation, and Express as our pseudo-backend. To save user data for authentication and posts the DB used was MongoDB.

<br>

## Build Process

Our build process was simple. First, we designed our site using a vector editor such as Figma/Sketch. Next, we handed off our design to our Front End dev team, who then used React to create components that render our site according to the design teams specifications. Back End team created the API endpoints through Express. The API endpoints are as follows:

<br>

## API Endpoints:

POST /auth/register: Allows a user to register by creating a new user with a username and password. Returns the created user object if successful.

POST /auth/login: Handles user authentication by checking the provided username and password. If the credentials are valid, it generates a JSON Web Token (JWT) and sets it as a cookie in the response. Returns the token if successful.

POST /auth/logout: Clears the authentication token cookie, logging the user out.

POST /posts: Creates a new post. Requires authentication with a valid token. Expects the title and content of the post in the request body. Associates the post with the authenticated user. Returns a success message if the post is created successfully.

GET /posts: Retrieves all posts from the database. No authentication is required.

GET /posts/:username: Retrieves posts associated with a specific username. Requires the username as a URL parameter. Returns the posts associated with the given username if found.

GET /posts/🆔 Retrieves a specific post by its ID. Requires the id of the post as a URL parameter. Returns the post if found.

PUT /posts/🆔 Updates a specific post by its ID. Requires authentication with a valid token. Expects the title and content of the post in the request body. Only the authenticated user who created the post can update it. Returns a success message if the post is updated successfully.

DELETE /posts/🆔 Deletes a specific post by its ID. Requires authentication with a valid token. Only the authenticated user who created the post can delete it. Returns a success message if the post is deleted successfully.

POST /posts/:id/comments: Adds a comment to a specific post. Requires authentication with a valid token. Expects the content of the comment in the request body. Associates the comment with the authenticated user. Returns a success message if the comment is added successfully.

GET /posts/:id/comments: Retrieves comments associated with a specific post. Requires the id of the post as a URL parameter. Returns the comments associated with the given post if found.

POST /auth/login: Handles user authentication by checking the provided username and password. If the credentials are valid, it generates a JSON Web Token (JWT) and sets it as a cookie in the response. Returns the token if successful.

<br>

## Project Requirements </br>

Our projects technical requirements are as follows:

- Develop a functional headless CMS website.
- Ensure the Blog page is populated with engaging text and images.
- Have the ability to register/login users and, edit/create/delete posts.

<br>

## Project Roles

- Project Lead: Eddie Padilla (1Dedios)

- Logo: Egat

- User's Blog Page Design: Exo

- FE: Random Dude, DNA, Eddie Padilla (1Dedios)

- BE: TOM, Shotdown, SomeDude
