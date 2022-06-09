'use strict';

class CoffeeAutomat {
   constructor({ wrapper, drink, image }) {
      this.wrapper = document.querySelector(wrapper);
      this.drink = this.wrapper.querySelector(drink);
      this.image = this.wrapper.querySelector(image);
      this.namesDinks = [];
   }

   removeDrinks() {
      this.drink.remove();
   }

   getRecipes() {
      fetch('/recept.json')
         .then((response) => {
            if (response.status !== 200) {
               throw new Error('Response status is not 200')
            }
            return response.json();
         })
         .then((data) => {
            data.forEach(item => {
               console.dir(item);
               this.namesDinks.push(item.title_ua);
            })
         })
         .catch((error) => console.error(error));
   }

   addDrinks() {
      // console.log(typeof this.namesDinks);
      let drink = this.drink.cloneNode(true);
      this.namesDinks.forEach((item) => {
         console.dir(item);
         drink.innerText = item;
         this.wrapper.querySelector('.names').insertAdjacentElemen('beforeend', drink);
      });
   }




   init() {
      console.dir(this);
      this.removeDrinks();
      this.getRecipes();
      this.addDrinks();
   }
}

let obj = {
   wrapper: '.wrapper',
   drink: '.drink',
   image: '.image',
}

const coffee = new CoffeeAutomat(obj);
coffee.init();