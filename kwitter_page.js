//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyD1GayEmpyug7jei15cB1CYYgoffm_Qrws",
      authDomain: "kwitter-2-17b88.firebaseapp.com",
      databaseURL: "https://kwitter-2-17b88-default-rtdb.firebaseio.com",
      projectId: "kwitter-2-17b88",
      storageBucket: "kwitter-2-17b88.appspot.com",
      messagingSenderId: "1021640377907",
      appId: "1:1021640377907:web:e192e82e02b62dce544546",
      measurementId: "G-1ZZD4RQFDW"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name=localStorage.getItem("user_name");
    room_name=localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);
      username=message_data['name'];
      message=message_data['message'];
      like=message_data['like'];
      username_with_tag="<h4>"+username+"<img src='tick.png' class='user_tick'></h4>";
      message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
      like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";

      row=username_with_tag+message_with_tag+like_button+span_with_tag;
      document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("click on like button"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_like=Number(likes)+1;
      console.log(updated_like);

      firebase.database().ref(room_name).child(message_id).update({
            like:updated_like
      });
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}

function send()
{
msg=document.getElementById("msg").value;
firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
});
document.getElementById("msg").value="";
}