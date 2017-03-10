var globalWrapper = document.getElementById('wrapper');

function loadLoginPage(){
  Ajax.page('map', function(){
    globalWrapper.innerHTML = this;
  });
}
