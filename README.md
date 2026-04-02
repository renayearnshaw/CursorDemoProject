# Cursor Demo Project
This project contains code I wrote while following the [AI For Developers With GitHub Copilot, Cursor AI & ChatGPT](https://www.udemy.com/course/ai-for-developers-with-github-copilot-cursor-ai-chatgpt/) course by Maximilian Schwarzmüller. This course teaches developers to leverage AI to boost productivity using Cursor.

### Description
This is a complete demo project (REST API) built using `Cursor`. It is a `Node.js` (ES modules) and `Express` backend that uses `SQLite` as its database.

Users can sign up and sign in, passwords are hashed using `bcrypt`, and sign-in returns a `JWT` which is used on protected routes.

Users can attend events. The API supports listing and fetching events, and creating/updating/deleting events when authenticated. Create and update expect multipart uploads with an image file (handled by `Multer`). Image files are stored under the `public/images` folder, and the filename is stored in the database. Static hosting (via `express.static("public")`) means those images are available in the browser at paths like `locathost:3000/images/<filename>` (`cors` allows browser clients on other origins to call the API).

To attend an event a user must register for it. All users registered for an event are stored in the database.

## Useful commands

* `npm run dev`    starts the server

## HTTP Requests

This project uses the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for Visual Studio Code/Cursor. This allows you to send HTTP requests and view the response in Visual Studio Code directly.
Any HTTP requests used during development are stored in the file `requests.http`. 
