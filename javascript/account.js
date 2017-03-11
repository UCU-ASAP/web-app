var Account = {
  login: function(){
    var fields = Account.getLoginValues();

    if(fields.email.trim() !== '' && fields.password.trim() !== ''){
      Rest.authenticate(fields);
    } else {
      alert('Please, fill all fields.');
    }
  },
  registration: function(){
    var fields = Account.getRegistrationValues(),
        fieldNames = ['firstName', 'lastName', 'email', 'password', 'repeatPassword'],
        fieldsValidation = Account.validateTextFields({
          fields: fields,
          fieldNames: fieldNames
        });

    if(fieldsValidation){
      if(Account.emailValidation(fields.email)){
        if(Account.passwordValidation(fields.password)){
          alert('OK');
        } else {
          alert('Incorrect password. \n Assert a string has at least one number\nAssert a string has at least one special character\n Length: 8-30');
        }
      } else {
        alert('Enter correct email!');
      }
    }
  },
  getRegistrationValues: function(){
    return {
      firstName: document.getElementById('REGISTRATION_fname').value,
      lastName: document.getElementById('REGISTRATION_lname').value,
      email: document.getElementById('REGISTRATION_email').value,
      password: document.getElementById('REGISTRATION_password').value,
      repeatPassword: document.getElementById('REGISTRATION_password_r').value
    };
  },
  getLoginValues: function(){
    return {
      email: document.getElementById('LOGIN_email').value,
      password: document.getElementById('LOGIN_password').value
    };
  },
  validateTextFields: function(params){
    for(var field in params.fieldNames){
      if(params[field].trim() === ''){
        alert('Please, fill all fields.');
        return false;
      }
    }
    return true;
  },
  emailValidation: function(email){
    var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
  },
  passwordValidation: function(password){
    var passwordPattern = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    return passwordPattern.test(password);
  },
  signOut: function(){
    Rest.signOut(function(){
      Ajax.page('login', function(){
        var menu = document.getElementById('menu');

        removeClass(menu, 'show');
        addClass(menu, 'hide');
        menu.style.left = '-81vw';
        globalMenuIsActive = false;
        
        globalWrapper.innerHTML = this;
      });
    });
  }
};
