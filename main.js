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
         //    , {
         //    method: 'POST',
         //    mode: 'cors',
         //    headers: {
         //       'Content-Type': 'application/x-www-form-urlencoded'
         //    },
         //    credentials: "include"
         // })
         .then((response) => {
            if (response.status !== 200) {
               throw new Error('Response status is not 200')
            }
            return response.json();
         })
         .then((data) => {
            data.forEach(item => {
               if (item.title_en) {
                  this.namesDinks.push(item.title_en);
               }
            })
            this.addDrinks(this.namesDinks);
         })
         .catch((error) => console.error(error));
   }

   addDrinks(arr) {
      arr.forEach((item) => {
         let drink = this.drink.cloneNode();
         drink.innerText = item;
         this.wrapper.querySelector('.names').append(drink);
      });
   }

   choiceDrink() {
      this.wrapper.addEventListener('click', (even) => {
         let target = even.target;
         if (target.matches('.drink')) {
            this.wrapper.querySelectorAll('.active').forEach(item => {
               item.classList.remove('active');
            });
            target.classList.add('active');
         }
      });
   }




   init() {
      console.dir(this);
      this.removeDrinks();
      this.getRecipes();
      this.choiceDrink();
   }
}

let obj = {
   wrapper: '.wrapper',
   drink: '.drink',
   image: '.image',
}

const coffee = new CoffeeAutomat(obj);
coffee.init();