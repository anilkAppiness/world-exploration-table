# World Exploration Table

This project is a React.js web application that consumes a GraphQL endpoint to display country data and provides interactive features like sorting, filtering, and data visualization.

## Project Description

The project demonstrates the consumption of a GraphQL endpoint from [APIs-guru/graphql-apis](https://countries.trevorblades.com/). It utilizes React.js for the frontend, Shadcn/ui for the user interface components, and Tailwind CSS for styling. 

The application provides a table view with sorting, filtering, and basic interactions. When a filter selection is made, the data is reflected in both the pie chart and the table. The chart displays country names organized according to continent and language.

Initially, all languages are shown in the "Filter by Languages." However, when a "Filter by Continent" is selected, only the languages spoken in countries within that continent are displayed.

Additionally, it includes a summary display upon selection of a row and basic data visualization based on the GraphQL endpoint used.

### Testing with Cypress

The project includes end-to-end testing using Cypress to ensure the correctness and reliability of the application's functionality. One test case focuses on verifying that country details are retrieved correctly from the GraphQL endpoint.

## Table of Contents

- [How to Install and Run the Project](#how-to-install-and-run-the-project)
- [How to Use the Project](#how-to-use-the-project)
- [Tech Stack](#tech-stack)
- [Credits](#credits)
- [License](#license)

## How to Install and Run the Project

1. Clone this repository. (https://github.com/anilkAppiness/world-exploration-table.git)
2. Install dependencies using `npm install`.
3. Run the development server using `npm run dev`.

## How to Use the Project

1. Access the application via the provided [Vercel deployment link](#vercel-deployment-link).
2. Interact with the UI to search a country code in the search bar.
3. Explore the table view with sorting, filtering, and basic interactions.
4. Select a row to view a summary of the selected country details.
5. Experience the responsive UI for both browser and handheld devices.

## Vercel Deployment Link

The project is deployed on Vercel. You can access it [https://world-exploration-table.vercel.app/](#vercel-deployment-link).

## Tech Stack

### Frontend Framework

- React.js v18.2.0

### UI Components

- Shadcn/ui v0.8.0

### CSS Framework

- Tailwind CSS v3.4.3

## Pie Chart

- Nivo v0.86.0

### Testing

- Cypress v13.8.1

## Credits

- Project by [Anil Kumawat]

- Data provided by [APIs-guru/graphql-apis](https://countries.trevorblades.com/)

## License

This project is licensed under the [GPL License](https://choosealicense.com/licenses/gpl-3.0/).
