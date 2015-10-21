$(document).ready(function(){

//make empty object rooms(where rooms and number of messages in each goes)
	var currentRoom = "4chan";

	//------------FUNCTIONS--------------//

	var validateDisplay = function(str) {
		//stuff here from lower
		$('.chat-list').empty();
		// loop through our messages and
		_.each(str.results, function(datum, index){
			var userTxt = datum.username || "Anonymous";
			var userName = datum.text || "[---]";
			//console.log(datum.roomname);
			var className;

			if (datum.roomname) {
				if (datum.roomname.length < 10) {
					className = datum.roomname;
				} 
			} else {
				className = "other";
			}

			//dont allow empty usernames or empty text
			if (userName.length !== 0 && userTxt.length !== 0) {
				//append them to messages list url
				$(".chat-list").prepend($("<li>").addClass(className).text( userTxt+ ' : ' + userName));

			}
		})

	};


	var post = function(message){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'https://api.parse.com/1/classes/chatterbox',
		  type: 'POST',
		  data: JSON.stringify(message),
		  contentType: 'application/json',
		  success: function (data) {
		    console.log('chatterbox: Message sent');
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to send message');
		  }
		});
	};

	var allData;

	var get = function(){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'https://api.parse.com/1/classes/chatterbox',
		  type: 'GET',
		  contentType: 'application/json',
		  success: function(data){
		  	data.results.reverse();
		  	validateDisplay(data);
		  	roomTypes(data);
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('get failed');
		  }
		});
		//wait for the get request to set returnedData
		//then return the data
	};

	var roomTypes = function(data) {
		var rooms = {};
		//loop through chats and see how many rooms there are
		_.each(data.results, function(datum) {
			//if roomname is already present in datum
			if (datum.hasOwnProperty("roomname")) {
				// if the room is already in our rooms object
				if (rooms.hasOwnProperty(datum.roomname)) {
					//increment that room count by 1
					rooms[datum.roomname] += 1;
				} else {
					//not in our rooms object
					//set it to 1
					rooms[datum.roomname] = 1;
				}
			//datum does not have a roomname property
			} else {
				if (rooms.hasOwnProperty("other")) {
					rooms.other += 1;
				} else {
					//make a new room for the noRoom chats
					rooms.other = 1;
				}
			}
		});
			// console.log(rooms);
		addRooms(rooms);
	};

	var addRooms = function(roomObj) {
		//populate navbar with the keys of the rooms object(global)
		$('.roomBar').empty();
		var $roomBar = $('.roomBar');

		for (var key in roomObj) {
			//make an extra div with button to $roomBar
			$roomButton = $('<div class="roomButton">'+'<button>'+key+'</button>'+'</div>');
			$roomBar.append($roomButton);
		}
		$('#bar').append($roomBar);
		//click handler for room buttons
		$(".roomButton").on("click", function(){
			//get the button details
			var context = $(this);
			var buttonName = context[0].innerText;

		});
	};

	var roomFilter = function(roomName) {
		//take roomName that is passed in

		//append those chats to the current page
		//change link/button/background of room clickable to show current room
	};
//-------------------------------------------------------------------------//


	get();1
	setInterval(function(){
		// get the posts
		get();
	},1000);
	

	//when submit button is clicked, POST the name and message and room to server
	$(".submitButton").on("click", function(){
		//get the value from the message box
		var input = $(".message").val();
		// when button is clicked
		//get user from URL
		var username = window.location.search.split("=")[1];
		//get the room name

		var message = {
		  username: username,
		  text: input,
		  roomname: currentRoom
		};
		//post that to the server with ajax POST
		post(message);
		//clear the text box
		$(".message").val("");
	});


});
