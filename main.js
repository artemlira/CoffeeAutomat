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
                  this.namesDinks.push(item.title_ua);
               }
            })
            this.addDrinks(this.namesDinks);
            this.showRecipe(data);
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

   showRecipe(arr) {
      this.wrapper.addEventListener('click', (even) => {
         let target = even.target;
         if (target.matches('.drink')) {
            this.image.classList.forEach(v => {
               if (v != 'image') {
                  this.image.classList.remove(v);
               }
            })
            arr.forEach(item => {
               if (target.innerText == item.title_ua) {
                  this.image.querySelectorAll('.coffee').forEach(i => i.remove());
                  this.image.querySelectorAll('.milk').forEach(i => i.remove());
                  this.image.querySelectorAll('.water').forEach(i => i.remove());
                  this.image.querySelectorAll('.milkfoam').forEach(i => i.remove());


                  item.recipe.forEach((v, i, c) => {
                     let drink = this.drink.cloneNode();
                     drink.classList.remove('drink');
                     target.closest('.wrapper').querySelector('.image').prepend(drink);
                     drink.classList.add(v.class_name);

                     if (v.class_name == 'coffee') {
                        this.wrapper.querySelector('.coffee').style.height = v.volume * 30 + 'px';
                     }
                     if (v.class_name == 'milk') {
                        this.wrapper.querySelector('.milk').style.height = v.volume * 30 + 'px';
                     }
                     if (v.class_name == 'water') {
                        this.wrapper.querySelector('.water').style.height = v.volume * 30 + 'px';
                     }
                     if (v.class_name == 'milkfoam') {
                        this.wrapper.querySelector('.milkfoam').style.height = v.volume * 30 + 'px';
                     }

                  });
               }
            })
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