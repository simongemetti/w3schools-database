# W3Schools Database in Docker

- a docker compose which sets up the DB on port 3309 (non-default, no clashes)
- initializes the database data from w3schools (provided by @AndrejPHP) 
- Visual Studio Code config

## Fork to your github account
Go to github.com, create a new account or login.
Fork my repo (https://github.com/yveseinfeldt/w3schools-database)

Now you have a repository w3schools-database in your github account.
Clone that with
```
git clone https://github.com/YOURUSERNAME/w3schools-database
cd w3schools-database
code .
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

## Features
1. Get and list all categories
2. Create a new category
3. Update an existing category
4. Delete a category
5. Give an error message to the user when trying to delete a category that can't be deleted

## Journal
### 14.09.2024
The project setup was quite difficult, as I am missing some linux and docker experience.
After some try and errors and support from ChatGPT I made it finally work

### 16.10.2024
asdf