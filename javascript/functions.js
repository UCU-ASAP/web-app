function sendLoginData(){
  var fields = {
    email: document.getElementById('LOGIN_email').value,
    password: document.getElementById('LOGIN_password').value
  };

  if(fields.email != '' && fields.password != ''){
    Ajax.post('/api/v1.0/login', fields, function(){
      var data = JSON.parse(this);

      if(data.success){
        goToHomePage();
      } else {
        alert(data.message);
      }
    });
  } else {
    alert('Please, fill all fields.');
  }
}

function sendRegistrationData(){
  var fields = {
    firstName: document.getElementById('REGISTRATION_fname').value,
    lastName: document.getElementById('REGISTRATION_lname').value,
    email: document.getElementById('REGISTRATION_email').value,
    password: document.getElementById('REGISTRATION_password').value,
    repeatPassword: document.getElementById('REGISTRATION_password_r').value
  };

  if(fields.firstName != '' && fields.lastName != '' && fields.email != ''
  && fields.password != '' && fields.repeatPassword != '')
  {
    Ajax.post('/api/v1.0/registration', fields, function(){
      var data = JSON.parse(this);

      if(data.success){
        goToHomePage();
      } else {
        alert(data.message);
      }
    });
  } else {
    alert('Please, fill all fields.');
  }
}

function sendDeleteFriendRequest(event, target, attr){
  var id = +target.getAttribute(attr);

  Ajax.get('/api/v1.0/deleteFriend/' + id, function(){
    var data = JSON.parse(this);

    if(data.success){
      deleteFriend();
    } else {
      alert(data.message);
    }
  });
}

function getUserLocation(event, target, attr){
  var id = +target.getAttribute(attr);

  Ajax.get('/api/v1.0/location/' + id, function(){
    var data = JSON.parse(this);

    if(data.success){
      drawRoute(data.coordinates);
    } else {
      alert(data.message);
    }
  });
}
