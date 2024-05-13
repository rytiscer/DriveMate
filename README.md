# DriveMate

DriveMate is an internal system designed for a car rental company to streamline the car rental process. This web application allows managing cars, clients, orders, and service events in one place.

## Key Features

- **Car Management**: Ability to view, add, edit, and delete cars.
- **Client Management**: Manage client data, add new clients, edit, or delete existing ones.
- **Order Management**: Create new orders, view, edit, or delete existing orders. Each order assigns a car to a client, and the rental price is calculated based on the period the client plans to rent the car.
- **Car Service**: Register service events, such as technical inspections or oil changes. This helps track the technical condition of cars and plan future maintenance work.

## Getting Started

To run the application, follow these steps:
1. Clone the repository:
`
git clone https://github.com/rytiscer/DriveMate.git
`
3. Navigate to the backend directory:
`
cd backend
`
4. Update the .env file with your configuration variables.
5. Install dependencies with:
```npm install```
6. Start the development server with:
   `
   nodemon index.js
   `
7. Open a new terminal tab.
8. Navigate to the frontend directory:
`
cd frontend
`
10. Install dependencies:
   `
   npm install
   `
   9. Start the frontend server:
       `
       npm run dev
       `
      10. View the application in your browser by going to [http://localhost:5173/](http://localhost:5173/)

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js
- **Database**: MongoDB
