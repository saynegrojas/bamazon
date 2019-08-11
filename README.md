# bamazon
MySQL database for bamazon

<<<<<<< HEAD
Create a MySQL Database called bamazon.
Then create a Table inside of that database called products.
The products table should have each of the following columns:

item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)

Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
The app should then prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.
=======
This application creates a database of products in MySQL.  

It displays a list of products, given: 
item id 
product name 
department name
price
stock quantity

It prompts the user to choose an item id and how many of that product.

If the user inputs a quantity above the stock quantity, then it will provide an insufficient quantity message. 

The application then calculates the total amount and displays on terminal.

Screen shots:

https://drive.google.com/drive/folders/13-N0Gm4Ufk4v6gEAuZ2GQmihH2r9t4nh


>>>>>>> d1564ca742b95907644a69e11b773420d66dc08b
