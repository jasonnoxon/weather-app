$(document).ready( function() {
  let $highLowH3 = $("<h3/>", { text: "60º/45º" });
  let $weatherImg = $("<img/>", { src: "https://cdn.apixu.com/weather/64x64/night/113.png"})
  let $dateH3 = $("<h3/>", { text: "1/15/2019"} );
  let $article = $("<article/>", { class: "col-1" } );

  $article.append($dateH3);
  $article.append($weatherImg);
  $article.append($highLowH3);

  $(".cards").append($article);

});


// let url = "http://api.apixu.com/v1/forecast.json?key=cc9c36b492994ba8993180021193103&q=12866&days=5";
// let weather;
//
// $.ajax(
//   {
//     url: url,
//     success: function(result){
//       //console.log(result);
//       let imgUrl = "https:" + result.current.condition.icon;
//       $("body").append(`<h2>${result.location.name}</h2>`);
//       $("body").append('<img src="' + imgUrl + '">' );
//
//       weather = result;
//
//       $.each(result.forecast.forecastday, function(index, day) {
//         $("body").append(`<p>${day.day.condition.text}</p>`);
//
//
//       });
//     }
//   });
