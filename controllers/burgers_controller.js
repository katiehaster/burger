var express = require("express");

var router = express.Router();

// Import model (burger.js) to use its database functions
var burger = require("../models/burger")

// Create all routes and set up logic w/in those routes where required
router.get("/", function(req,res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
          };
          console.log(hbsObject);
          res.render("index", hbsObject);
    })
})

// This post route will add a new burger, need post function
router.post("/api/burgers", function(req, res) {
  console.log("req.body.dev", req.body.devoured)
    burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
      // Send back the ID of the new quote
     
      res.json({ id: result.insertId });
    });
  });
// Devour button
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(req.body);
  burger.update(
    {
      devoured: req.body.devoured
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});
  
// Export routes for server.js to use.
module.exports = router;
  