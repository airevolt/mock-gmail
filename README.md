I changed the express backend app.js in certain parts to make sent emails seperate from recieved emails (changed name to inbox.json) and added another json file (called sent.json) for the sent emails.

What my app.js looks like now for the backend:
```javascript
const fs = require("fs");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = 3001;
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

app.use(bodyParser.json());

const emails = JSON.parse(fs.readFileSync("inbox.JSON"));
const sent = JSON.parse(fs.readFileSync("sent.JSON"));

app.get("/emails", (req, res) => res.json(emails));
app.get("/emails/:id", (req, res) => res.send(emails[req.params.id]));
app.get("/sent", (req, res) => res.json(sent));

app.get("/search", (req, res) => {
  const query = decodeURIComponent(req.query.query);
  const filteredEmails = emails.filter((email) =>
    email.subject.includes(query)
  );

  res.send(filteredEmails);
});

app.post("/send", function (req, res) {
  let result;
  const emailSender = req.body;
  if (
    emailSender.sender &&
    emailSender.recipient &&
    emailSender.subject &&
    emailSender.message
  ) {
    sent.push({
      date: emailSender.date,
      id: emailSender.id,
      sender: emailSender.sender,
      recipient: emailSender.recipient,
      subject: emailSender.subject,
      message: emailSender.message,
    });

    result = {
      status: "success",
      message: "The message was successfully sent",
    };
  } else {
    result = {
      status: "failed",
      message: "The message was not sent",
    };
    res.status(400);
  }

  res.json(result);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
