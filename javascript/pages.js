var globalWrapper = document.getElementById('wrapper');

function loadLoginPage(){
  Ajax.page('profile', function(){
    globalWrapper.innerHTML = this;
  });
}
