function initMap() {
			var myLatLng = {lat: 43.0849081, lng: -89.5465078};
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 8,
				center: myLatLng
			});
		}

		$('.searchZip').click(function() {
				// $('.grid').layout({
    // 				itemMargin : 5,
    // 				itemPadding : 5
				// });
				$('p.searchHere input').hide();
				$('body').removeClass('noScroll');
				$('#map').show();
				$('.quote').hide();
				$('.quoteAuthor').hide();
				console.log('search');
				var searchTerm = $('p.searchHere input').val();
				$('.page__title-main').text('Results for ' + searchTerm);
				$('.grid').html('');
				$.getJSON( "https://api.petfinder.com/pet.find?format=json&key=098529fe3eb8ab94d6e0b43f456c889e&animal=dog&age=senior&location="+searchTerm+"&callback=?", function( pets ) {
					var pet1 = pets.petfinder.pets.pet;
					console.log(pet1);
					$.each(pet1, function() {
						var name = this.name.$t;
						var size = this.size.$t;
						var shelterFrom = this.shelterId.$t;
						var gender = this.sex.$t;
						var description = this.description.$t;
						var image = this.media.photos.photo[2].$t;
						for (i=0; i<this.breeds.breed.length; i++) {
							var breeds = this.breeds.breed[i].$t;
						
						}

						$('<li class="grid__item" style="opacity: 1"><a class="grid__link '+gender+'"><img class="grid__img resultImage" src="'+image+'" alt="Some image"/><h3 class="grid__item-title">'+name+', '+size+'</h3><div class="dogDescription"></div></a><a href="http://awos.petfinder.com/shelters/'+shelterFrom+'.html">Contact Shelter</a></li>')
      						.click(function() {
         						$(this).children("a.grid__link").children('.dogDescription').html(description).show();
      						})
     						.appendTo('.grid');
					})

				})


				$.getJSON( "http://api.petfinder.com/shelter.find?format=json&key=098529fe3eb8ab94d6e0b43f456c889e&location="+searchTerm+"&animal=dog&callback=?", function( json ) {
					var allShelters = [];
						console.log(allShelters);
						for (i=0; i<15; i++) {
							var shelterName = json.petfinder.shelters.shelter[i].name.$t;
							var latitude = json.petfinder.shelters.shelter[i].latitude.$t;
							var longitude = json.petfinder.shelters.shelter[i].longitude.$t;
							var phone = json.petfinder.shelters.shelter[i].phone.$t;
							var email = json.petfinder.shelters.shelter[i].email.$t;
							allShelters.push([shelterName, latitude, longitude, i, phone, email]);
						}	

					var newLat = json.petfinder.shelters.shelter[0].latitude.$t;
					var newLng = json.petfinder.shelters.shelter[0].longitude.$t;
					var shelterName = json.petfinder.shelters.shelter[0].name.$t;

					var newLat2 = json.petfinder.shelters.shelter[1].latitude.$t;
					var newLng2 = json.petfinder.shelters.shelter[1].longitude.$t;
					var shelterName2 = json.petfinder.shelters.shelter[1].name.$t;
					var shelters = [
						[shelterName, newLat, newLng, 2],
						[shelterName2, newLat2, newLng2, 1],
					]
					var map = new google.maps.Map(document.getElementById('map'), {
						zoom: 10,
						center: new google.maps.LatLng(newLat, newLng),
					});

					var infowindow = new google.maps.InfoWindow();

					var marker, i;

				    for (i = 0; i < allShelters.length; i++) { 
				      marker = new google.maps.Marker({
				        position: new google.maps.LatLng(allShelters[i][1], allShelters[i][2]),
				        map: map,
				        title: allShelters[i][0],
						icon: 'http://katie.thinkful.us/pawprint.png'
				      });

				      google.maps.event.addListener(marker, 'click', (function(marker, i) {
				        return function() {
				          infowindow.setContent(allShelters[i][0]+ '<br>'+'Phone: '+allShelters[i][4]+'<br>'+'Email: '+allShelters[i][5]);
				          infowindow.open(map, marker);
				        }
				      })(marker, i));
				    }

				 });
			})