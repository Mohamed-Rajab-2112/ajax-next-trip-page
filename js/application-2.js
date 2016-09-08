var moreDetails = {
  details: function(country) {
    var promise = $.Deferred();
    var moreDetailsBtn = $(this);
    var country = $(this).closest(".country");
    $.ajax("more-details.html", {
      data: {name: "more details html page"},
      success: function(response) {
        moreDetailsBtn.slideUp();
        console.log("thereeeeeeee"); promise.resolve(country.find(".more-details").html(response).slideDown());

        $.ajax("more-details.json", {
          dataType: "json",
          contentType: "application/json",
          data: {name : "JSON data for the html page"},
          success: function(response) {
            country.find(".img01").attr("src", "_img/" + response.emirates.image01);
            country.find(".img02").attr("src", "_img/" + response.emirates.image02);
            country.find(".img03").attr("src", "_img/" + response.emirates.image03);
            country.find(".weather").find("span").text(response. + country.data("name") + .Weather); country.find(".flight").find("span").text(response.emirates.FlightTime);
            country.find(".nights").val(1);
            country.find(".visitors").val(1);
          }
        });

      }
    });

    return promise;
  }
}

$(document).ready(function() {
  $(".emirates").on("click", ".more-details-btn", moreDetails.details);
  
  $(".morocco").on("click", ".more-details-btn", moreDetails.details);
  
});


//  $(".one").click(function() {
//    $.ajax("header.html", {
//      success: function(response) {
//        $(".back01").html(response).slideDown();
//      }
//    });
//  });
//  $(".two").click(function() {
//    $.ajax("header.html", {
//      success: function(response) {
//        $(".back02").html(response).slideDown();
//      }
//    });
//  });
//    $(".one").click(function() {
//    $.ajax("d2b.json", {
//      dataType: "json",
//      type: "POST",
//      contentType: "application/json",
//      data: $(this),
//      success: function(response) {
//        console.log(response);
//        var msg = $("<p></p>");
//        msg.append("Destination: " + response.comments.mark)
//        $(".back01").html(msg).slideDown();
//      }
//      
//    });
//  });
//  $(".two").click(function() {
//    $.ajax("header.html", {
//      success: function(response) {
//        $(".back02").html(response).slideDown();
//      }
//    });
//  });
