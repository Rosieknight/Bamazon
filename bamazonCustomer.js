//Node packages needed.
var inquirer = require("inquirer");
var mysql = require("mysql");

//Varable for MySQL connection information.
//Wiped my password from this. It won't work on a different system.
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

//Making the connection
connection.connect(function(err) {
  if (err) throw err;
});

//The welcome message. Yes must be chosen to proceed.
var start = function(){
	console.log("\n Welcome to Bamazon!");
	inquirer.prompt([
		{
			type: "confirm",
    		message: "Would you like to shop?",
    		name: "confirm",
    		default: true
		}
	]).then(function(shop){
		if(shop.confirm){
			buyStuff();
		}else{
			//The connection will only end if the shopper chooses no.
			console.log("Thank you and come again!");
			connection.end();
		}
	});
}

//The actual shopping functin is here.
var buyStuff = function(){
	console.log("\nHere is our current selection: \n");
	//Lists all the items in the shop.
	connection.query("SELECT * FROM products", function(error, results){
		for (var i = 0; i < results.length; i++) {
			console.log("Item ID: " + results[i].item_id + " | Item Name: " 
				+ results[i].product_name + " | Price: $" + results[i].cost);
		};

		//Choose item to buy and how many.
		inquirer.prompt([
			{
				name: "choice",
	        	type: "list",
        		choices: function() {
          			var choiceArray = [];
          			for (var i = 0; i < results.length; i++) {
            			choiceArray.push(results[i].item_id + ": " + results[i].product_name);
          			}
          			return choiceArray;
        		},
        		message: "Which item would you like to buy?"
			},
			{
				name: "number",
				type: "input",
				message: "How many would you like?"
			}
		]).then(function(answer){
			//Finds the chosen item in the results array.
			var chosenItem;
			for (var i = 0; i < results.length; i++) {
       			if (results[i].item_id + ": " + results[i].product_name === answer.choice) {
          			chosenItem = results[i];
       			}
      		}

      		//Determine if the quanity in stock is enough to cover the purchase.
      		//If there are, the database updates.
      		if (chosenItem.stock_quantity > parseInt(answer.number)) {
      			connection.query("UPDATE products SET ? WHERE ?", [{
      				stock_quantity: chosenItem.stock_quantity-=answer.number
      			}, {
          			item_id: chosenItem.item_id
        		}], function(error) {
          			if (error) throw error;
          			console.log("You bought " + answer.number + " " + chosenItem.product_name);
          			console.log("Your total is: " + answer.number*chosenItem.cost);
          			start();
        		});
      		} else {
        	//Too many items were ordered, sending the shopper back to the start.
        	//Database is unaltered.
        		console.log("Insufficient quantiy!");
       			start();
      		}
    	});
	});	
}

//Calling the intial list of items and the Welcome message.
start();
