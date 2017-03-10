var globalMenuIsActive = false;
var CURRENT_USER_ID = 1;

window.addEventListener('load', function(){
  loadLoginPage();
}, false);

document.addEventListener('click', function(event){
  var target = event.target,
      menu = document.getElementById('menu');

  while(target != document){
    if(target.getAttribute('data-toggle-menu') ||
    (target == menu && globalMenuIsActive))
    {
      removeClass(menu, 'hide');
      addClass(menu, 'show');

      menu.style.left = 0;
      globalMenuIsActive = true;

      return;
    }
    target = target.parentNode;
  }
  if(globalMenuIsActive){
    removeClass(menu, 'show');
    addClass(menu, 'hide');
    menu.style.left = '-81vw';
    globalMenuIsActive = false;
  }
}, false);
