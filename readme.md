# Stream As It

## Overview

Stream As It is a web application that allows users to effortlessly stream content to various social media platforms directly from their browser without any additional installations. This project serves as a one-click streaming solution, simplifying the process for content creators to reach their audience seamlessly.

### Features

-   **One-Click Streaming:** Easily initiate streaming sessions with just a single click.

-   **Multi-Platform Support:** Stream to various social media platforms simultaneously.

-   **No Installation Required:** Enjoy the convenience of streaming directly from the browser.

## Tech Stack

-   **Frontend:** Built with React for a responsive and dynamic user interface.

-   **Styling:** Utilizes TailwindCSS for a clean and modern design.

-   **Backend:** Developed with NestJS, following the Model-View-Controller (MVC) pattern.

-   **Database:** PostgreSQL is used as the database to store relevant information.

<div style="display:flex;">
  <img src="https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png" height="100"/>
  <img src="https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png" height="100"/>
  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nest-js-icon.png" width="100"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/993px-Postgresql_elephant.svg.png" height="100" />
</div>

## Getting Started

1.  **Clone the Repository:**

```bash

git clone https://github.com/allenabraham777/stream-as-it.git

cd stream-as-it

```

2.  **Install Dependencies:**

```bash

# Install frontend dependencies

cd client

npm install

# Install backend dependencies

cd ../server

npm install

```

3.  **Database Setup:**

-   Create a PostgreSQL database and update the configuration in the backend.

-   Run migrations to set up the database schema.

4.  **Run the Application:**

```bash

# Run the frontend

cd client

npm run dev

# Run the backend

cd ../server

npm start

```

5.  **Open in Browser:**

Open your browser and navigate to `http://localhost:5173` to access the Stream As It.

## Project Status

This project is a side project created for learning advanced app development. It is a clone of the product StreamYard, aiming to explore and implement various technologies in a real-world application.

### Disclaimer

Stream As It is a side project and a learning exercise. It is not intended for production use, and its features may not be as robust as commercial streaming solutions.

## Acknowledgments

This project draws inspiration from StreamYard, a leading streaming platform. It serves as a practical implementation to enhance skills in React, TailwindCSS, NestJS, and PostgreSQL while exploring the MVC pattern in the backend. Feel free to contribute, provide feedback, or use it for educational purposes.

## Plan of action

-   [x] Create UI with all basic functionality
-   [x] Setup NestJs backend
-   [x] Achieve basic streaming with hard coded url
-   [x] Migrate to NextJS
-   [x] Add Shadcn ui
-   [x] Implement authentication backend
-   [x] Bring authentication layer to frontend
-   [x] Implement stream manager server
-   [x] Implement streaming server
-   [ ] Add reverse proxy
-   [ ] Combine swagger docs
-   [x] Integrate apis with UI
-   [ ] Dockerize application (In progress)
-   [ ] Migrate from prisma to typeorm
-   [ ] Add banner support
-   [ ] Add live chat support (Display only)
