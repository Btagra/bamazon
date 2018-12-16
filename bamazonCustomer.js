var mysql = require("mysql");
const cTable = require('console.table');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    display();
});

function display() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        purchaseItem();
    })
};
function purchaseItem() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "item_id",
                type: "input",
                message: "What is the item ID of the product you would like to buy?"

            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?"
            }])
            .then(function (answer) {
                // console.log(answer.item_id);
                // console.log(answer.quantity);
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.item_id)) {
                        // console.log(results[i].item_id);
                        chosenItem = results[i];
                        // console.log(chosenItem);
                        // console.log(answer.quantity);
                        var stock_quantity = chosenItem.stock_quantity;
                    }
                }
                // console.log(stock_quantity);

                if (stock_quantity > parseInt(answer.quantity) || stock_quantity === parseInt(answer.quantity)) {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stock_quantity - parseInt(answer.quantity)
                            },
                            {
                                item_id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("==============================================");
                            console.log(`Product purchased successfully!`);
                            console.log("==============================================");
                            console.log(`Purchase Summary`);
                            console.log("-----------------------------");
                            console.log(`Item Name: ${chosenItem.product_name}`);
                            console.log(`Item Count: ${parseInt(answer.quantity)}`);
                            console.log("-----------------------------");
                            console.log(`Total: $${chosenItem.price * parseInt(answer.quantity)}`);
                            console.log("==============================================");
                        });
                } else {
                    console.log("==============================================");
                    console.log("Insufficient stock.");
                }

            });
    });
}