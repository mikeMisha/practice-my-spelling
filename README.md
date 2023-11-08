<br/>
<p align="center">
  <a href="https://github.com/mikemisha/practice-my-spelling">
    <img src="https://practicemyspelling.com/images/logo.png" alt="Logo" width="500" height="100">
  </a>

  <h3 align="center">Practice My Spelling</h3>

  <p align="center">
  Created By Michael Karabach
    <br/>
    <br/>
    <a href="https://github.com/mikemisha/practice-my-spelling"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://practicemyspelling.com/">View Website</a>
    .
    <a href="https://github.com/mikemisha/practice-my-spelling/issues">Report Bug</a>
    .
    <a href="https://github.com/mikemisha/practice-my-spelling/issues">Request Feature</a>
  </p>
</p>



## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Authors](#authors)

## About The Project

![Screen Shot](https://michaelkarabach.com/images/pms-project.png)

Online app for spelling practice. The website provides a simple and modern user-interface with multiple features like adding and removing words to a list, creating an account to save your list, selecting number of reps and a wordlist shuffling feature.

## Built With

* React
* Redux
* Framer motion
* Auth0

## Getting Started

To get a local copy up and running follow these simple example steps.


### Installation

1. Get a free API Key from auth0 at [https://auth0.com/](https://auth0.com/) and Firebase API key at [https://firebase.google.com/](https://firebase.google.com/)

2. Clone the repo

```sh
git clone https://github.com/mikeMisha/practice-my-spelling.git
```

3. Install NPM packages

```sh
npm install
```

4. Create `.env` file and enter your API keys:

```JS
REACT_APP_AUTH0_DOMAIN=<Your Auth0 Domain>
REACT_APP_AUTH0_CLIENT_ID=<Your Auth0 Client ID>
REACT_APP_FIREBASE_APIKEY=<Your Firebase API Key>
REACT_APP_FIREBASE_AUTHDOMAIN=<Your Firebase Auth Domain>
REACT_APP_FIREBASE_PROJECTID=<Your Firebase Project ID>
REACT_APP_FIREBASE_STORAGEBUCKET=<Your Firebase Storage Bucket>
REACT_APP_FIREBASE_MESSAGINGSENDERID=<Your Firebase Messaging Sender ID>
REACT_APP_FIREBASE_APPID=<Your Firebase App ID>
REACT_APP_FIREBASE_MEASUREMENTID=<Your Firebase Measurement ID>
```

## Usage

`cd` into the project file and run:
 `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

You can find detailed instructions on using Create React App and many tips in [its documentation](https://facebook.github.io/create-react-app/).


### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License.

## Authors

* **Michael Karabach** - *Front End Developer * - [Michael Karabach](https://github.com/mikeMisha) - **


