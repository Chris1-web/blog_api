# Blog API

### Introduction

Blog API is a platform that allows users to share topics they are passionate about through their writing and get feedback from other users.

### Features

- Users can sign up and login into their account
- Users can write on a topic genre of their choosing
- Non-authenticated users have access to the login and signup routes only
- Authenticated users have access to all routes
- Users can comment on other users' post

### Installation Guide

- Clone this repository [here](https://github.com/Chris1-web/blog_api.git).
- Sign up or Login to your mongoDB account and create a collection
- Create an .env file in your project root folder and add your variables.
- Install all dependencies
- Start the server

```
git clone https://github.com/Chris1-web/blog_api.git
touch .env
npm install
npm start
```

### Usage

After running npm start

- Connect to the API using Postman on port 3001

### API Endpoints

- All API endpoint, except the sign up and login routes, need an Authorization Header with Bearer token in its request header to be accessed

e.g

```
fetch("http://localhost:3001/api/user", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: Bearer '.....' // Here you can add your token
    },
})
Authorization: Bearer ${token}
```

| HTTP Verbs | Endpoints                 | Action                                   |
| ---------- | ------------------------- | ---------------------------------------- |
| POST       | /api/user/                | To create a new user account             |
| POST       | /api/user/login           | To login an existing user account        |
| GET        | /api/user                 | To get list of existing users            |
| GET        | /api/post/?page=(number)  | To retrieve all posts                    |
| GET        | /api/post/:postid/comment | To retrieve comments of a single post    |
| GET        | /api/user/:user           | To retrieve the details of a single user |
| POST       | /api/post/                | To create a new post                     |
| POST       | /api/post/:postid/comment | To create a new comment for a post       |

## Technologies Used

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
- [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.
- [BcryptJS](https://www.npmjs.com/package/bcryptjs) This is used to obtain secure random numbers.
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) This is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims

### Authors

- [Chris1-web](https://github.com/Chris1-web)

### License

This project is available for use under the MIT License.
