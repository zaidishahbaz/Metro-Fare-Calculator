# Metro Fare Calculator

## Description

Written in Typescript, this project calculates the metro fare provided a CSV 

## Installation

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/zaidishahbaz/Metro-Fare-Calculator.git
    ```

2. Install dependencies using npm:

    ```bash
    npm install
    ```

## Usage

### Project Components

- **data**: This directory contains CSV files used for testing or providing sample data, this is the input source.

- **src**: This directory contains the source code of the project.
  - **FareCalculator.test.ts**: Test file for the FareCalculator module.
  - **FareCalculator.ts**: TypeScript file containing the implementation of the FareCalculator module.
  - **utils**: This directory contains utility files used by the project.
    - **constants.ts**: File containing constant values(i.e enums) used in the Fare Calculator.
    - **helpers.ts**: File containing helper functions used for the Fare Calculator.
- **tsconfig.json**: Configuration file for TypeScript, specifying compiler options and project settings.
- **jest.config.js**: Configuration file for Jest, the testing framework used in the project.
- **package.json**: Configuration file for npm, listing project dependencies and scripts.

### Running Tests

To run tests, execute the following command:

```bash
npm test

To run tests, use the following command:

```bash
npm test
