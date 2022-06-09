'use strict';

class CoffeeAutomat {
   constructor({ wrapper, drink, image }) {
      this.wrapper = document.querySelector(wrapper);
      this.drink = this.wrapper.querySelector(drink);
      this.image = this.wrapper.querySelector(image);
   }

   removeDrinks() { }




   init() {
      console.dir(this);

   }
}

let obj = {
   wrapper: '.wrapper',
   drink: '.drink',
   image: '.image',
}

const coffee = new CoffeeAutomat(obj);
coffee.init();