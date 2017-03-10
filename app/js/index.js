function addClass(t,e){t.classList.add(e)}function removeClass(t,e){t.classList.remove(e)}function getStyles(t,e){var n=getComputedStyle(t)[e];return+n.substr(0,n.length-2)}function removeElement(t){t.parentNode.removeChild(t)}function isEmptyObject(t){for(key in t)if(t.hasOwnProperty(key))return!1;return!0}var EventHandler={on:function(t,e){document.addEventListener(t.action,function(n){for(var a=n.target;a!=document;){if(a.getAttribute(t.attr))return void e(n,a,t.attr);a=a.parentNode}},!1)}},Ajax={getXHR:function(){var t;try{t=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{t=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){t=!1}}return t||"undefined"==typeof XMLHttpRequest||(t=new XMLHttpRequest),t},post:function(t,e,n){var a=this.getXHR(),e=JSON.stringify(e);a.open("POST",t,!0),a.setRequestHeader("Content-Type","application/json;charset=UTF-8"),a.send(e),a.onreadystatechange=function(){4==a.readyState&&200==a.status&&n.call(a.responseText)}},get:function(t,e){var n=this.getXHR();n.open("GET",options.url,!0),n.setRequestHeader("Content-Type","application/json;charset=UTF-8"),n.send(null),n.onreadystatechange=function(){4==n.readyState&&200==n.status&&e.call(n.responseText)}},page:function(t,e){var n=this.getXHR();globalMenuIsActive=!1,n.open("GET","pages/"+t+".html",!0),n.send(null),n.onreadystatechange=function(){4==n.readyState&&200==n.status&&e.call(n.responseText)}}};
var config={apiKey:"AIzaSyBQ3bsbfog8AvGiPLKMqD5EP6ozdDe8X3U",authDomain:"geolocateme-74c18.firebaseapp.com",databaseURL:"https://geolocateme-74c18.firebaseio.com",storageBucket:"geolocateme-74c18.appspot.com",messagingSenderId:"376854950200"};firebase.initializeApp(config);var Rest={authenticate:function(e){firebase.auth().signInWithEmailAndPassword(e.email,e.password).catch(this.authenticationErrorHandler())},authenticationErrorHandler:function(e){switch(e.code){case"auth/user-not-found":alert("This user is not registered!");break;case"auth/wrong-password":alert("Invalid password!")}},useToken:function(){firebase.auth().onAuthStateChanged(function(e){e?Ajax.page("profile",function(){globalWrapper.innerHTML=this}):Ajax.page("login",function(){globalWrapper.innerHTML=this})})},getUser:function(){return firebase.auth().currentUser},signOut:function(){firebase.auth().signOut().then(function(){Ajax.page("login",function(){globalWrapper.innerHTML=this})}).catch(function(e){console.log(e)})}};
var Account={login:function(){var e=this.getLoginValues();""!==e.email.trim()&&""!==e.password.trim()?Rest.authenticate(e):alert("Please, fill all fields.")},registration:function(){var e=this.getRegistrationValues(),t=["firstName","lastName","email","password","repeatPassword"];this.validateTextFields({fields:e,fieldNames:t})&&(this.emailValidation(e.email)?this.passwordValidation(e.password)?alert("OK"):alert("Incorrect password. \n Assert a string has at least one number\nAssert a string has at least one special character\n Length: 8-30"):alert("Enter correct email!"))},getRegistrationValues:function(){return{firstName:document.getElementById("REGISTRATION_fname").value,lastName:document.getElementById("REGISTRATION_lname").value,email:document.getElementById("REGISTRATION_email").value,password:document.getElementById("REGISTRATION_password").value,repeatPassword:document.getElementById("REGISTRATION_password_r").value}},getLoginValues:function(){return{email:document.getElementById("LOGIN_email").value,password:document.getElementById("LOGIN_password").value}},validateTextFields:function(e){for(var t in e.fieldNames)if(""===e[t].trim())return alert("Please, fill all fields."),!1;return!0},emailValidation:function(e){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)},passwordValidation:function(e){return/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(e)}};
EventHandler.on({action:"click",attr:"data-load-page"},function(t,a,e){var n=a.getAttribute(e);document.getElementById("mapScript");Ajax.page(a.getAttribute(e),function(){globalMenuIsActive||(removeClass(menu,"show"),addClass(menu,"hide"),menu.style.left="-81vw",globalMenuIsActive=!1),globalWrapper.innerHTML=this,"map"==n&&initMap()})}),EventHandler.on({action:"click",attr:"data-login"},Account.login),EventHandler.on({action:"click",attr:"data-registration"},Account.registration);
var globalMenuIsActive=!1,CURRENT_USER_ID=1,globalWrapper=document.getElementById("wrapper");window.addEventListener("load",Rest.useToken(),!1),document.addEventListener("click",function(e){for(var t=e.target,l=document.getElementById("menu");t!=document;){if(t.getAttribute("data-toggle-menu")||t==l&&globalMenuIsActive)return removeClass(l,"hide"),addClass(l,"show"),l.style.left=0,void(globalMenuIsActive=!0);t=t.parentNode}globalMenuIsActive&&(removeClass(l,"show"),addClass(l,"hide"),l.style.left="-81vw",globalMenuIsActive=!1)},!1);
function initMap(){map=new google.maps.Map(document.getElementById("map"),{center:{lat:-34.397,lng:150.644},zoom:8,gestureHandling:"cooperative",draggable:!0}),bounds=new google.maps.LatLngBounds}function getCoordinates(o){var n=navigator.geolocation;n?n.getCurrentPosition(function(n){o.call(n)},function(){console.log("Error: The Geolocation service failed.")}):console.log("Error: Your browser doesn't support geolocation.")}function getUserPosition(){getCoordinates(function(){var o=this,n={lat:o.coords.latitude,lng:o.coords.longitude},t=setMarkerOnMap(n,"Your location","origin"),e=new google.maps.LatLng(t.lat,t.lng);sendUserPosition(t),bounds.extend(e),map.fitBounds(bounds)})}function setMarkerOnMap(o,n,t){void 0!==routePoints[t]&&routePoints[t].setMap(null);var e=new google.maps.Marker({position:o,map:map,title:n});return routePoints[t]=e,markerCoordinates[t]={lat:e.getPosition().lat(),lng:e.getPosition().lng()},markerCoordinates[t]}var map,bounds,routePoints={},markerCoordinates={};