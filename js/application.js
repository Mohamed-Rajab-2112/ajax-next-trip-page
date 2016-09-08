///////////////////////////////////////////////////////////
//*******************************************************//
//*       code for interactive simple trip page using   *//
//*      HTML - CSS - SASS - BOOTSTRAP - JQUERY - AJAX  *//
//*                   BY/ MOHAMED RAGAB 
//*the design is optimized to be 1.5mb at full Ajax calls while less than 300kb at first load
//*******************************************************//
///////////////////////////////////////////////////////////

// the main function object to all countries
function Trip(country) {
  //  the variables of every trip
  var trip = this;
  this.country = $(country);
  this.quickDetailsBtn = $(country).find(".quick-details-btn");
  this.lessDetailsBtn = $(country).find("a").last();
  // hide less details button at the first initialization
  this.lessDetailsBtn.hide();
  // function to load the quick details html page
  this.loadQuickDetails = function(e) {
    e.preventDefault();
    console.log("hereeeeeee");
    // first ajax call to get the html content of quick-details.html file
    $.ajax("templates/quick-details.html", {
      timeout: 3000,
      success: function(response) {
        //make the quick details button slide up and hide
        trip.quickDetailsBtn.slideUp();
        //make the quick-details.html page loaded into div already in our page called quick-details
        trip.country.find(".quick-details").html(response).slideDown(1000);
        //assigning the price for go only trips from the html data class .country
        trip.country.find(".price").text(trip.country.closest(".country").data("go-only-price"));
        //make the .go-only input intialized to checked and disabled  
        trip.country.find(".go-only").prop("checked",true);
        trip.country.find(".go-only").prop("disabled",true);
        trip.lessDetailsBtn.fadeIn();
        // assigning the more details button to a variable , here because it wasn't loaded and we can't assign a variable to an object while it isn't loaded but now it is loaded.
        trip.moreDetailsBtn = $(country).find(".more-details-btn");
      }
    });
  };
  // function to load the more-details.html page
  this.loadMoreDetails = function(e) {
    e.preventDefault();
    // the second ajax call to get html content of more details section but it didn't has any data loaded in it just a the main content body
    $.ajax("templates/more-details.html", {
      data: {name: "more details html page"},
      success: function(response) {
        console.log("thereeeeeeee"); 
        // hide the more details button
        trip.moreDetailsBtn.slideUp();
        // showing the more details section and load it into the page
        trip.country.find(".more-details").html(response).slideDown();
        // assigning getTicketBtn, nights and visitors input numbers to a variable , we can't did that earlier because it wasn't loaded
        trip.getTicketBtn = $(country).find(".get-ticket-btn");
        trip.nights = $(country).find(".nights");
        trip.visitors = $(country).find(".visitors");
        // the third ajax call , it is nested in the second ajax call , it is supposed to load the data to the more-details html body
        $.ajax("Json/more-details.json", {
          dataType: "json",
          contentType: "application/json",
          data: {name : "JSON data for the html page"},
          success: function(response) {
            // for loop to load the images into its tags , as it is only 3 images for every country the i = 1 and increasing to reach 3 only
            for (var i=1 ; i<=3 ; i++) {
              trip.country.find(".img0"+i).attr("src", "images/" + response[country]["image0"+i]);
            }
            // assigning the text data like weather, flight time, etc...
            trip.country.find(".weather").find("span").text(response[country].Weather);
            trip.country.find(".flight").find("span").text(response[country].FlightTime);
            // initialize the cost of 1 visitor at 1 night
            trip.lastCostText = trip.country.find(".more-details").find("label").last();
            trip.nightPrice = trip.country.data("night-price");
            trip.lastCostText.find("span").last().text(trip.nightPrice);
          }
        });
      }
    });
  }

  // function to less details button
  this.lessDetails = function(e) {
    e.preventDefault();
    console.log(this);
    if ($(this).closest("country").find(".more-details-btn")) {
      trip.moreDetailsBtn.closest(".quick-details").slideUp();
      trip.quickDetailsBtn.slideDown();
      trip.lessDetailsBtn.slideUp();
      trip.getTicketBtn.closest(".more-details").slideUp();
    }
  };
  // function to update the total cost by changing the number of visitors or nights
  this.cost = function() {
    var invalidParagraphForm = $(country).find('form');
    if (trip.visitors.val() > 0 && trip.nights.val() > 0) { 
      var nightsCost = trip.nightPrice * trip.visitors.val() * trip.nights.val();
      trip.lastCostText.find("span").first().text(trip.nights.val());
      trip.lastCostText.find("span:nth-child(2)").text(trip.visitors.val());
      trip.lastCostText.find("span").last().text(nightsCost);
      invalidParagraphForm.find('.invalid').remove();
    } else {
      invalidParagraphForm.append('<p class="invalid"></p>');
      invalidParagraphForm.find('.invalid').text('invalid input');
    }
  };
  // function to alert message when click get ticket button
  this.gettingTicket = function(e) {
    e.preventDefault();
    console.log(this);
    alert('Happy NEXT trip');
  };
  // button events to get things work :)
  $(country).on("click", ".quick-details-btn", this.loadQuickDetails);
  $(country).on("click", ".more-details-btn", this.loadMoreDetails);
  $(country).on("click", ".less-details-btn", this.lessDetails);
  $(country).find(".more-details").on("change", "input", this.cost)
  $(country).on('click', '.get-ticket-btn', this.gettingTicket);
}

// document ready event**************************************************************
$(document).ready(function() {
  var emirates = new Trip(".emirates");
  var morocco = new Trip(".morocco");
  var morocco = new Trip(".russia");
  var morocco = new Trip(".china");
  var morocco = new Trip(".france");
  var morocco = new Trip(".england");

  // function to make changes when go-back checkbox clicked
  function goBackChange() {
    var country = $(this).closest(".country");
    var price = country.data("go-back-price");
    country.find(".go-only").prop("checked", false);
    country.find(".go-only").prop("disabled", false);
    country.find(".go-back").prop("disabled", true); 
    country.find(".go-back").prop("checked", true); 
    country.find(".price").text(price);
  }
  // function to make changes when go-only checkbox clicked
  function goOnlyChange() {
    var country = $(this).closest(".country");
    var price = country.data("go-only-price");
    country.find(".go-back").prop("checked", false);
    country.find(".go-only").prop("checked", true);
    country.find(".go-back").prop("disabled", false);
    country.find(".go-only").prop("disabled", true);
    country.find(".price").text(price);
  }
  // event handlers to use the 2 above function
  $(".country").on("change", ".go-back", goBackChange);
  $(".country").on("change", ".go-only", goOnlyChange);
  // events to make go-only/go-back active when click on its label can't use property "for" of label because we have many labels and should act separated
  $(".country").on("click", ".goBackLabel", goBackChange);
  $(".country").on("click", ".goOnlyLabel", goOnlyChange);
});

