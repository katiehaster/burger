// Make sure we wait to attach our handlers until the DOM is fully loaded.
console.log("burgers.js triggered ");
$(function() {
    $(".devoured").on("click", function(event) {
      var id = $(this).data("id");
      var devours = $(this).data("devoured");
  
      var devoursState = {
        devoured: devours
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: devoursState
      }).then(
        function() {
          console.log("changed devoured to", devours);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurgers = {
        name: $("#ca").val().trim(),
        devoured: $("[name=devoured]:checked").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurgers
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    // $(".delete-burger").on("click", function(event) {
    //   var id = $(this).data("id");
  
    //   // Send the DELETE request.
    //   $.ajax("/api/burgers/" + id, {
    //     type: "DELETE"
    //   }).then(
    //     function() {
    //       console.log("deleted burger", id);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });
  });
  