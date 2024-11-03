# W3Schools Database in Docker

- a docker compose which sets up the DB on port 3309 (non-default, no clashes)
- initializes the database data from w3schools (provided by @AndrejPHP) 
- Visual Studio Code config

## Fork to your github account
Go to github.com, create a new account or login.
Fork my repo (https://github.com/simongemetti/w3schools-database)

Now you have a repository w3schools-database in your github account.
Clone that with
```
git clone https://github.com/simongemetti/w3schools-database
cd w3schools-database
code .
```
## Install dependencies
install all Node.js-Paket

npm install
```

Run the database and rest-api
```
sudo docker-compose up
```

Start the react app like this
```
cd my-app
npm start
```

## How to reset?

Execute:

```bash
docker compose down
rm -rf data
docker compose up -d
```
## Potential Issues and Solutions
Docker Port Conflicts: 
Ensure no other service is using port 3309 on your system. If necessary, you can change the port in the docker-compose.yml file.

Environment Variable Configuration: 
Make sure to configure the REACT_APP_API_URL in the .env file. This allows the app to connect to the correct API endpoint.

Network Connection for Docker:
If Docker cannot connect to the internet, verify that Docker has proper network access and restart if necessary.

Node.js and Package Errors:
If any errors occur with npm install, ensure you are using a compatible version of Node.js (14 or higher). You may also need to clear the cache by running npm cache clean --force.

## Tables

When the docker container starts, it creates database named __w3schools__ with the following tables

    categories
    customers
    employees
    orders
    order_details
    products
    shippers
    suppliers
    
and inserts the respective data. 

## Feature-Dokumentation
1. Navigation
A user-friendly navigation bar with links to the most important pages: Welcome, Customers, Categories and Products.

2. Homepage
Introduction to the application with a description of the most important functions and a call-to-action link for customer management.

3. Customer page
Show customers: Lists the last 10 customers, sorted by entry date.
Edit customers: Editing function for existing customer data.
Delete customers: Removes selected customers from the list.
Register new customer: Form for entering new customers with the fields CustomerName, Address, PostalCode and Country.
Search and sorting: Allows you to search by name and sort the list alphabetically (ascending and descending).

4. Category page
Show categories: Shows the last 10 categories added.
Edit categories: Editing option for existing categories.
Delete categories: Removes selected categories.
Register new category: Form for entering new categories with the CategoryName and Description fields.
Search and sorting: Supports searching and alphabetical sorting of categories.

5. Product page
Show products: Lists the last 10 products added.
Edit products: Editing option for existing products.
Delete products: Removes selected products.
Register new product: Form for new products with the fields ProductName and Price.
Search and sort: Allows you to search and sort by product name.

6. CSS and UI-Design
Uniform design with layout for all components.
Clear user guidance and legible display for all important functions.

7. Error and success messages
Users are informed of every action (successful or incorrect) by messages, e.g. successful saving, deletion or registration.

8. API-Integration
All data operations are managed via a REST API that is configured to REACT_APP_API_URL.

## Tech Stack
Frontend: HTML5 and React.js
Styling: CSS3
Backend API: Local JSON server or other API endpoint (configurable via .env).


## Journal
### 14.09.2024
The project setup was quite difficult, as I am missing some linux and docker experience.
After some try and errors and support from ChatGPT I made it finally work

### 25.10.2024
Project structure set up
React app created, and basic file structure and navigation implemented

### 28.10.2024
Component development
CustomerList, CategoryList and ProductList components created.

### 29.10.2024
API-Integration
CRUD operations implemented with fetch, REST API endpoints configured.

### 30.10.2024
Node version update and various bug fixes

### 31.10.2024
Search and sorting implemented
Search and sort functions for customers, categories and products added.

### 01.11.2024
CSS design optimized
Uniform styling with index.css, navigation bar and table style improved.
Additional welcome page implemented.

### 02.11.2024
Feature finalization and code review
Final adjustments and tests, ensuring functionality and code quality.

### 03.11.2024
Markdown documentation created
Added complete documentation of all functions and start guide in Markdown