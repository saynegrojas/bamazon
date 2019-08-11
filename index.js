//Get npm requirements
const mysql = require("mysql");
const inquirer = require('inquirer');
const env = require('dotenv').config();

 //create conncetion with mysql
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazon_db"
});
//connect mysql connection
connection.connect(err => {
    if (err) throw err;

    console.log("connected as id : " + connection.threadId);
    console.log("_________________________________________________");
    //call to display products 
    queryAllProducts();
    //call to get user's choice, quantity condition and update
    afterConnection();
});

const afterConnection = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        //ask the user for product id and quantity
        inquirer.prompt([{
            name: 'item',
            type: 'rawlist',
            choices: () => {
                //put options from database and push to array
                var selectedArr = [];
                res.forEach((result) => {
                    selectedArr.push(result.item_id);
                });
                //return an array with new elements 
                return selectedArr;
            },
            msg: "Please select a product id. "
        }, {
            name: "quantity",
            type: "input",
            msg: "How many would you like? "
        }]).then(answers => {
            //save user's selected product id 
            var selectedItem;
            res.forEach((result) => {
                if (result.item_id === answers.item) {
                    selectedItem = result;
                };
            });

            //Bamazon with insufficient quantity
            if (selectedItem.stock_quantity < answers.quantity) {
                console.log(`Insufficient quantity for product id: ${selectedItem.item_id}. Max order for product id: ${selectedItem.item_id} is ${selectedItem.stock_quantity}.`);
            } else {
                //update quantity of selected product id
                connection.query('UPDATE products SET ? WHERE ?', [{
                    stock_quantity: selectedItem.stock_quantity - answers.quantity
                }, {
                    item_id: answers.item,
                }],
                    (err) => {
                        if (err) throw err;
                        var salesTax = 0.08875;
                        console.log("\n_____________ORDER TOTAL_______________________");
                        console.log("_______________________________________________");
                        console.log(`Product: ${selectedItem.product_name} \nQuantity: ${answers.quantity}`);
                        //console.log(`Total: $${selectedItem.price} * ${answers.quantity}`);
                        var total = selectedItem.price * answers.quantity;
                        console.log(`Net Amount (excluding tax)         $ ${total}`);
                        salesTax = salesTax * total;
                        console.log(`Tax (8.875%)                       $ ${salesTax.toFixed(2)}`);
                        total = total + salesTax;
                        console.log(`Total (including tax)              $ ${total.toFixed(2)}\n\n`);
                    }
                )
            }
            //end connection when all questions are answered
            connection.end();
        });
    });
};
 //query display all products and its info
const queryAllProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        res.forEach((result) => {
            console.log("\n_____________PRODUCT LIST______________________");
            console.log("Product ID: " + result.item_id + '\n' + "Product Name: " + result.product_name + '\n' + "Department: " + result.department_name + '\n' + "Price: $" + result.price + '\n' + "Stock Quantity: " + result.stock_quantity);
            console.log("_______________________________________________");
        });
    });
};
