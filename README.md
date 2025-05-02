# Anywr Express Template

A production-ready Node.js backend template using **Express.js**, **TypeScript**, **InversifyJS**, **MongoDB**, and *
*Redis**. Designed for maintainability, modularity, and localization support (English/French).

![Node.js](https://img.shields.io/badge/node-22.x-brightgreen.svg)
![Express](https://img.shields.io/badge/express-4.21.1-lightgrey.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB-green.svg)
![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Example Endpoint](#example-endpoint)
- [Useful Scripts](#useful-scripts)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [How to Sign Off Your Commits](#how-to-sign-off-your-commits)
- [Author](#author)
- [License](#license)
- [Notes](#notes)

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js**: Version 22 or higher. You can check your version by running `node -v` in your terminal.
- **npm** or **pnpm**: Package managers for Node.js. npm comes bundled with Node.js, and pnpm can be installed globally
  with `npm install -g pnpm`.
- **Node.js** v22.x
- **MongoDB** instance (local or remote)
- **Redis** (for caching and rate limiting)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url> app_name
   cd app_name
   ```
2. **Install dependencies using npm (recommended):**

    ```bash
   pnpm install
   ```
   **Or, if you prefer using yarn:**
    ```bash
   yarn install
   ```

## Running Tests

To execute the test suite, use the following command:

   ```bash
   pnpm test
   ```
This command will run the tests located in the ```__tests_``` directory and provide coverage reports.

## Example Endpoint

The template includes a basic health check endpoint. Once your server is running [see Useful Scripts](#useful-scripts), you can access it at:

```
http://localhost:<your_port>/api/v1/health
```
This endpoint is defined in ```src/modules/system/health.controller.ts``` with the ```@Controller('/health')``` decorator.

## Useful Scripts

Here are some useful scripts defined in the ```package.json``` file:

* ```pnpm run dev``` or ```yarn run dev```: Runs the application in development mode with nodemon, which automatically restarts the server on file changes.
* ```pnpm run build``` or ```yarn run build```: Builds the TypeScript project into JavaScript, placing the output in the dist directory.
* ```pnpm run start``` or ```yarn run start```: Starts the built application from the dist directory.
* ```pnpm run test``` or ```yarn run test```: Runs the Jest test suite with coverage and in watch mode.

## Project Structure

   ```
    anywr-express-template/
    ├── __tests_/                       # Folders for tests
    ├── src/
    │   ├── common/
    │   │   ├── decorators/             # Contains class-transformer and class-validator configuration
    │   │   └── http/                   # Contains inversify-express-utils extensions
    │   ├── configs/
    │   │   ├── database/               # Database connection configurations
    │   │   │   ├── mongodb.ts
    │   │   │   └── redis.ts
    │   │   ├── inversify/              # Inversify IoC container configuration
    │   │   │   └── container.ts
    │   │   ├── i18n.ts                 # Internationalization configuration
    │   │   └── logger.ts               # Winston logger with daily rotation
    │   ├── dto/                        # Location for reusable DTOs (default: localized.dto.ts)
    │   ├── interfaces/                 # Location for interfaces
    │   ├── middlewares/                # Custom Express middlewares
    │   │   ├── badUrl.ts
    │   │   ├── cors.ts
    │   │   ├── errorHandler.ts
    │   │   ├── handleValidationErrors.ts
    │   │   ├── helmet.ts
    │   │   └── rateLimiter.ts
    │   ├── modules/                    # Location for application modules
    │   │   └── system/
    │   │       ├── dto/
    │   │       │   ├── Counter.dto.ts
    │   │       │   └── Log.dto.ts
    │   │       └── health.controller.ts
    │   │   └── loader.ts               # Loads controllers and services, binds them to the Inversify container
    │   ├── schemas/                    # Location for Mongoose schemas
    │   ├── services/                   # Location for reusable services (email, sms, etc.)
    │   │   └── translation.service.ts  # Translation service (French for DTOs)
    │   ├── types/                      # Location for custom TypeScript types
    │   │   └── express/
    │   │       └── index.d.ts
    │   └── utils/
    │       ├── types/                  # Exported utility types
    │       │   └── index.ts
    │       ├── validators/             # Custom class-validator validators
    │       │   └── match.validator.ts
    │       ├── appError.ts
    │       ├── encrypting.ts           # Data encryption and decryption using 'node:crypto'
    │       ├── formatPhoneNumber.ts
    │       ├── generateOneTimePassword.ts
    │       ├── generatePassword.ts
    │       ├── generateTransactionId.ts
    │       ├── getLanguage.ts          # Retrieves language from request headers, cookies, or default
    │       ├── internationalizePhoneNumber.ts # Formats phone numbers to international format (+243)
    │       ├── messages.ts             # Messages in multiple languages
    │       ├── normalizePort.ts
    │       └──
    │   └── main.ts                     # Main entry point of the application
    ├── .dockerignore
    ├── .env.example
    ├── .gitignore
    ├── .npmrc
    ├── Dockerfile
    ├── jest.config.mjs
    ├── LICENCE
    ├── nodemon.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── Profile
    ├── README.md
    ├── tsconfig.json
    └── tsconfig.prod.json
   ```

## Technologies Used
This template is built using the following core technologies:
* Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
* Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* TypeScript: A statically typed superset of JavaScript that compiles to plain JavaScript.
* MongoDB: A NoSQL database used for data persistence.
* Inversify: A powerful and lightweight inversion of control (IoC) container for TypeScript and JavaScript.
* class-transformer: A library for transforming plain JavaScript objects to class instances and vice versa.
* class-validator: A library for validating objects using decorator-based syntax.
* winston: A popular logging library for Node.js, with support for multiple transports.
* winston-daily-rotate-file: A Winston transport for rotating log files daily.
* ioredis: A robust, performance-focused, and full-featured Redis client for Node.js.
* mongoose: An elegant MongoDB object modeling tool for Node.js.
* helmet: A collection of middleware functions to help secure your Express apps by setting various HTTP headers.
* cors: Middleware for enabling Cross-Origin Resource Sharing.
* rate-limiter-flexible: A rate limiter for Express.js based on different algorithms (e.g., token bucket, leaky bucket).
* socket.io: Enables real-time, bidirectional, and event-based communication.
* jest: A delightful JavaScript Testing Framework with a focus on simplicity.

## How to Sign Off Your Commits
To sign off your commits and comply with the DCO:

```bash
git commit -s -m "your commit message"
```
This adds the following line at the end of your commit message:
Signed-off-by: Your Name [your.email@example.com]()

## Author
This template was created by [Didierson Amuri/Anywr Africa](https://github.com/didiamuri).

## Licence
This project is licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Notes
```
- This template provides a solid foundation for building robust and scalable backend applications with Express.js and TypeScript.
- It incorporates best practices for project structure, dependency injection, validation, logging, and error handling.
- Feel free to adapt and extend this template to fit the specific requirements of your projects.
```