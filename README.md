# Home Library Service

Home Library Service allows users to manage their library of Artists, Tracks, and Albums, and add them to a Favorites list.

## Prerequisites

Before you begin, ensure you have the following installed:

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

Clone the repository to your local machine by running:

```
git clone git@github.com:SvitlanaG/nodejs2024Q3-service.git
cd nodejs2024Q3-service
```

## Installing NPM modules

Install the required npm packages by running:

```
npm install
```

## Running application

Start the Server with:

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
This documentation provides a complete reference to the API endpoints, request and response structures, and error codes.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

The project includes automated tests to ensure functionality.

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization (will be implemented soon)

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

The project includes scripts to help maintain code quality and consistent formatting.

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
