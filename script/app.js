'use strict';

const listenToButton = function () {
    document.querySelectorAll('.js-button').forEach((button) => {
      button.addEventListener('click', function (e) {
        console.log('button clicked');
        document.querySelector('.c-flip--inner').classList.toggle('is-flipped');
      });
    });
  };
  
const init = function(){
    console.log("App initialized");
    listenToButton();
}

document.addEventListener("DOMContentLoaded", init);