EventHandler.on({
  action: 'click',
  attr: 'data-load-page'
}, function(event, target, attr){
  var value = target.getAttribute(attr),
      mapScriptTag = document.getElementById('mapScript');

  Ajax.page(target.getAttribute(attr), function(){
    if(!globalMenuIsActive){
      removeClass(menu, 'show');
      addClass(menu, 'hide');
      menu.style.left = '-81vw';
      globalMenuIsActive = false;
    }
    globalWrapper.innerHTML = this;
    if(value == 'map'){
      initMap();
    }
  });
});

EventHandler.on({
  action: 'click',
  attr: 'data-login'
}, sendLoginData);

EventHandler.on({
  action: 'click',
  attr: 'data-registration'
}, sendRegistrationData);

EventHandler.on({
  action: 'click',
  attr: 'data-delete-friend'
}, sendDeleteFriendRequest);

EventHandler.on({
  action: 'click',
  attr: 'data-drow-route-to-user'
}, getUserLocation);

EventHandler.on({
  action: 'click',
  attr: 'data-get-position'
}, getUserPosition);
