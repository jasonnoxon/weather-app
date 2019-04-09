$(document).ready( function() {

  let $zipCode = $("#location-input");

  $zipCode.focus();
  $(".sk-circle").hide();

  $zipCode.on("input", function(){
    if($(this).val().length == 5 ) {
      updateForecast();
    }
  });

  $('input[name="days"]').on("change", function(){
    if ($zipCode.val().length == 5 ) {
      updateForecast();
    }
  });

  let updateForecast = function() {

      let url = `https://api.apixu.com/v1/forecast.json?key=cc9c36b492994ba8993180021193103&q=${$zipCode.val()}&days=${$('input[name="days"]:checked').val()}`;

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
                 date: new Date(item.date).toLocaleDateString("US-en", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
               }
             );

           });

           $("#forecast-template").tmpl(forecast)
                                  .appendTo("#cards")
                                  .animate({ opacity: 1}, 1000);
         }
       });
     }
});
