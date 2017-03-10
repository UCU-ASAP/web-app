var Account = {
  login: function(){
    var fields = this.getLoginValues();

    if(fields.email.trim() !== '' && fields.password.trim() !== ''){
      Rest.authenticate(fields);
    } else {
      alert('Please, fill all fields.');
    }
  },
  registration: function(){
    var fields = this.getRegistrationValues(),
        fieldNames = ['firstName', 'lastName', 'email', 'password', 'repeatPassword'],
        fieldsValidation = this.validateTextFields({
          fields: fields,
          fieldNames: fieldNames
        });

    if(fieldsValidation){
      alert('OK');
    }
  },
  getRegistrationValues: function(field){
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
  }
};
