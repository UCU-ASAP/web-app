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
}, Account.login);

EventHandler.on({
  action: 'click',
  attr: 'data-registration'
}, Account.registration);

EventHandler.on({
  action: 'click',
  attr: 'data-logout'
}, Account.signOut);
