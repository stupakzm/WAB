//set map options
var price;
var from;
var to;
var distance;

var myLatLng = { lat: 50.3460, lng: 20.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT, DRIVING
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            price = result.routes[0].legs[0].distance.value / 1000;
            from = document.getElementById("from").value;
            to = document.getElementById("to").value;
            distance = result.routes[0].legs[0].distance.text;
            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Drone could not retrieve distance.</div>";
        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);


//selecting drones
const air = document.getElementById('air');
const land = document.getElementById('land');

air.addEventListener('change', () => {
  if (air.checked) {
    console.log('Air delivery selected');
  }
});

land.addEventListener('change', () => {
  if (land.checked) {
    console.log('Land delivery selected');
  }
});

//setting price
function setPrice(value) {
    value *= price;
    document.getElementById('price').innerHTML = '$' + value.toFixed(2);
      //price.toFixed(2) This will update the value of the "Price" span with the calculated price
  
}


// function setPriceText() {
//   if (price && localStorage.getItem('email')) {
//       document.querySelector('.button').addEventListener('click', function() {
//           document.querySelector('.button').textContent = 'Paid';
//           // Save the values in localStorage
//           localStorage.setItem('from', from);
//           localStorage.setItem('to', to);
//           localStorage.setItem('price', price);
//           localStorage.setItem('distance', distance);
//       });
//   } else {
//       alert('Please enter a valid distance and log in before making a payment.');
//   }
// }


function setPriceText() {
      
      // Check if user is logged in before retrieving login information
      if (price != null) {
        document.querySelector('.button').addEventListener('click', function() {
          document.querySelector('.button').textContent = 'Paid';

          var fromSave = document.getElementById('from').value;
          var toSave = document.getElementById('to').value;
          var priceSave = document.getElementById('price').textContent;
          var distanceSave = document.getElementById('output').textContent;
          
          
    saveTaskServ(document);

          fetch('/Services', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, from, to, distance, price })
          })
            .then(response => response.json())
            .then(user => {
      
              console.log('user - ' + user); // check the value of user object
              console.log(name, email);
            });
        });
      }
      else {
        alert('Please enter a valid distance and log in before making a payment.');
    }
}
  