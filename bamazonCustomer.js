var mysql = require("mysql");
var inquirer = require("inquirer");
//var Table = require("cli-table");

const divider = "\n******************************************************\n";

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayStock();
 
});

//function to display inventory
function displayStock() { //example from playlistRead.js activity

  var formattedDataArray = [];

  connection.query("SELECT * FROM products", function(err, res) {
    console.log("*Item ID*****Product********Dept*****Price***Stock Quantity**");
    for (var i = 0; i < res.length; i++) {
      //console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
         formattedData = [res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity].join("\n\n");
        formattedDataArray.push(formattedData); 
    }
    
    console.log(formattedDataArray.join("\n") + divider);
    console.log("-----------------------------------------------");
    
  });
  
  //run function order with time out delay to allow display of stock
  setTimeout(order, 1500);

}

//function to order: ask two questions item and how many to order
function order() { //greatBayBasic.js activity 
  inquirer
  .prompt([
    {
      name: "itemInput",
      type: "input",
      message: "Please enter ID of the product you would like to buy?"
    },
    {
      name: "quantityInput",
      type: "input",
      message: "Please enter units of the product you would like to buy?",
      validate: function(value) {
        if (isNaN(value) === false && value > 0) {
          return true;
        }
        return false;
      }
    },
    
  ]) //after selection proceed, check inventory 
  .then(function(answer) {

      var orderItem = answer.itemInput;
      var orderQuantity = answer.quantityInput;

      connection.query("SELECT * FROM products WHERE ?",
       { 
         item_id: orderItem 
        }, 

       //if not enough inventory 
       function(err, res) {
        if (orderQuantity > res[0].stock_quantity) {
           console.log("Sorry insufficient quantity");
           displayStock();                     
        } 
        
        else  {
          //if enough inventory
          var newQuantity = res[0].stock_quantity - orderQuantity;
          
          //console.log(orderQuantity);
          //console.log(res[0].Stock_quantity);
          //console.log(newQuantity);
          connection.query("UPDATE products SET ? WHERE ?", 
            [
              { 
                stock_quantity: newQuantity
              },
              { 
                item_id: orderItem
              }             
            ],
                    
            function(error) {
            if (error) throw err;
            console.log("Order placed successfully!");
            displayOrderTotal(orderItem, orderQuantity);
            
           }
        
        
          )
        }


      });
   
    
  });
}

function displayOrderTotal(orderItem, orderQuantity) {

  connection.query("SELECT * FROM products WHERE ?",
  { 
  Item_ID: orderItem
  }, 

  function(error, res) {
  if (error) throw err;
  var orderTotal;

  orderTotal = orderQuantity * res[0].price;
  console.log("Total Order purchase is $" + orderTotal);
  purchaseAgain();
      
  });
};


function purchaseAgain() { 
inquirer
  .prompt( {
    type: "list",
    name: "purchaseAgain",
    message: "Would you like to purchase again?",
    choices: ["Yes, order again", "No, I am done"]
  })
  .then (function(answer) {
  if (answer.purchaseAgain === "Yes, order again") {
    displayStock();

  } 
  else {
    console.log("Thank you have a nice day!");
    connection.end();
 
  }
  });

}
