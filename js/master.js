$(document).ready( function() {

  $("#location-input").focus();
  $(".sk-circle").hide();

  $("#location-input").on("input", function(){
    if($(this).val().length == 5 ) {

      let url = `https://api.apixu.com/v1/forecast.json?key=cc9c36b492994ba8993180021193103&q=${$(this).val()}&days=${$('input[name="days"]:checked').val()}`;

      $.ajax(
       {
         url: url,
         beforeSend: function() {
           $(".sk-circle").show();
         },
         error: function() {
           $(".sk-circle").hide();
           $("#cards").text("");
           $("#forecast-heading").text("Something went horribly wrong. Check your Zip Code!");
         },
         success: function(result){
           $(".sk-circle").hide();

           let forecast = [];
           $("#forecast-heading").text(`${$('input[name="days"]:checked').val()}-Day Forecast for ${result.location.name}, ${result.location.region}`);

           $("#cards").text("");

           $.each (result.forecast.forecastday, function(index, item) {

             forecast.push(
               {
                 high: item.day.maxtemp_f.toFixed(0),
                 low: item.day.mintemp_f.toFixed(0),
                 iconUrl: `https:${item.day.condition.icon}`,
                 text: item.day.condition.text,
                 date: item.date
               }
             );

           });

           $("#forecast-template").tmpl(forecast).appendTo("#cards");
         }
       });
    }
  });
});
