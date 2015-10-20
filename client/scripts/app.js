
//make empty object rooms(where rooms and number of messages in each goes)
var rooms = {};
var currentRoom = "4chan";

//------------FUNCTIONS--------------//
var roomTypes = function(chats) {
	//loop through chats and see how many rooms there are
	for (var i = 0; i < chats.length; i++) {
		// validate rooms roomname/room

	}
		//if roomname exists in rooms
			//then increment roomname by one
		//else 
			//add roomname to rooms and start value at 1
};

var addRooms = function() {
	//populate navbar with the keys of the rooms object(global)
};

var roomFilter = function(roomName) {
	//take the most popular room from rooms
	//append those chats to the current page
	//change link/button/background of room clickable to show current room
};

var validateDisplay = function(str) {
	//stuff here from lower
  	var nums = '0123456789';
  	var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.!?:%;';
  	var $chats = $("<div class='chat-list'></div>")
	// loop through our messages and
	_.each(str.results, function(datum, index){
		var userTxt = "";
		var userName = "";

		_.each(datum.username, function(letter) {
			if(alpha.indexOf(letter) === -1 && nums.indexOf(letter) === -1) {
				userName += '\\';
			}
			userName += letter;
		});

		_.each(datum.text, function(char) {
			if(alpha.indexOf(char) === -1 && nums.indexOf(char) === -1) {
				userTxt += '\\';
			}
			userTxt += char;

		});
		//dont allow empty usernames or empty text
		if (userName.length !== 0 && userTxt.length !== 0) {
			//append them to messages list url
			$(".chat-list").append("<li>" + userName + ' : ' + userTxt + "</li>")
		}
	})
	console.log($chats);
	$("#chats").html("");
	$("#chats").append($chats);
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

var get = function(){
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'GET',
	  contentType: 'application/json',
	  success: function(data){
	  	validateDisplay(data);
	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('get failed');
	  }
	});
};

//-------------------------------------------------------------------------//

$(document).ready(function(){
	//get the rooms
	//get all the stuffs

	setInterval(function(){
		//get the posts
		get();
		console.log("working?");
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
