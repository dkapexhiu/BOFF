
$(document).ready(function(){

  // Add smooth scrolling to all links
  $(".navbar a, footer a[href='#home']").on('click', function(event) {
    
    // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
    
        // Store hash
        var hash = this.hash;
    
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').stop().animate({
          scrollTop: $(hash).offset().top-125
        }, 800, function(){
       
        // Add hash (#) to URL when done scrolling (default click behavior)
          history.pushState(null, null, hash);
        });
      } // End if
  });

  //The Active class
  const navbarLink = $(".navbar a");
  navbarLink.on("click", function(){
    $('.navbar a').removeClass("active");
    $(this).addClass("active");
  });

  //Responsive videos on modal
  $(".modal-body").fitVids();

  //ScrollReveal classes
  window.sr = ScrollReveal({reset: true}); 
  sr.reveal('.heading', {duration: 200}, 50);
  sr.reveal('.text', {duration: 200}, 50);
  sr.reveal('.info-image', {duration: 200}, 50);
  sr.reveal('.news-image', {duration: 200}, 50);
  sr.reveal('.star-wars', {duration: 200}, 50);
  sr.reveal('.thor', {duration: 200}, 50);
  sr.reveal('.imitation-game', {duration: 200}, 50);
  sr.reveal('.requiem', {duration: 200}, 50);
  sr.reveal('.flag-flying', {duration: 200}, 50);
  sr.reveal('.brave', {duration: 200}, 50);
  sr.reveal('.saw', {duration: 200}, 50);
  sr.reveal('.geostorm', {duration: 200}, 50);
  sr.reveal('.ittefaq', {duration: 200}, 50);
  sr.reveal('.light-moon', {duration: 200}, 50);
  sr.reveal('.thank-you', {duration: 200}, 50);
  sr.reveal('.fireflies', {duration: 200}, 50);
  sr.reveal('.register', {duration: 200}, 50);
  sr.reveal('#map', {duration: 200}, 50);

});


//Service Worker registration
if ('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('/BOFF/sw.js')
    .then(function(registration){
        console.log('ServiceWorker Registered', registration);
    })
    .catch(function(err){
        console.log('ServiceWorker failed to Register', err);
    })
}

//Push notifications registration
if (!('Notification' in window)) {
  console.log('This browser does not support notifications!');
}

//Request permission for push notifications
Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});

function displayNotification(){
  if (Notification.permission == 'granted') {
  navigator.serviceWorker.getRegistration().then(function(reg) {

    var options = {
      body: 'This is Brooklyn Outdoor Film Festival',
      icon: '/BOFF/img/icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
    
      actions: [
        {action: 'explore', title: 'Explore the site',
          icon: '/BOFF/img/checkmark.png'},
        {action: 'close', title: 'Close the notification',
          icon: '/BOFF/img/xmark.png'},
      ]
    };
    reg.showNotification('Welcome!', options);
  });
  }
}

function notification2(){
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
  
      var options = {
        body: 'Please register for free tickets!',
        icon: '/BOFF/img/icon.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 2
        },
      
        actions: [
          {action: 'explore', title: 'Register & Contact Us',
            icon: '/BOFF/img/checkmark.png'},
          {action: 'close', title: 'Close the notification',
            icon: '/BOFF/img/xmark.png'},
        ]
      };
      reg.showNotification('Register!', options);
    });
  }
}

var note2 = document.getElementById("notification-2");
note2.addEventListener('click', function() {
  notification2();
});

window.addEventListener('beforeinstallprompt', function(e) {
  // beforeinstallprompt Event fired

  // e.userChoice will return a Promise.
  // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
  e.userChoice.then(function(choiceResult) {

    console.log(choiceResult.outcome);

    if(choiceResult.outcome == 'dismissed') {
      console.log('User cancelled home screen install');
    }
    else {
      console.log('User added to home screen');
    }
  });
});
