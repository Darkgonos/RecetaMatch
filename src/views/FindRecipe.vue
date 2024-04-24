<template>
  <!--main-->
  <main class="main" role="main">
    <!--wrap-->
    <div class="wrap clearfix">
      <!--breadcrumbs-->
      <nav class="breadcrumbs">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li>Search for Recipes</li>
        </ul>
      </nav>
      <!--//breadcrumbs-->

      <!--row-->
      <div class="row">
        <header class="s-title">
          <h1>Search for Recipes</h1>
        </header>

        <!--content-->
        <section class="content full-width">
          <!--recipefinder-->
          <div class="container recipefinder">
            <div class="left">
              <h3>Search by ingredients</h3>
              <p>
                Click the '-' to remove an ingredient, or click the ingredient
                itself to emphasize
              </p>
              <div class="f-row">
                <input
                  type="text"
                  placeholder="Add ingredients (one at a time)"
                  v-model="newIngredient"
                  @keyup.enter="addIngredient"
                />
                <button class="add" @click="addIngredient">+</button>
              </div>
              <div
                v-for="(ingredient, index) in ingredients"
                :key="index"
                class="f-row"
              >
                <input
                  type="text"
                  :value="ingredient"
                  @click="emphasizeIngredient(index)"
                />
                <button class="remove" @click="removeIngredient(index)">
                  -
                </button>
              </div>
              <div class="f-row">
                <input type="submit" value="Search" />
              </div>
            </div>
            <div class="right">
              <div class="ingredients">
                <h3>Do you also have?</h3>
                <a
                  v-for="(otherIngredient, index) in otherIngredients"
                  :key="index"
                  href="#"
                  class="button gold"
                  @click.prevent="toggleOtherIngredient(index)"
                  >{{ otherIngredient }}</a
                >
              </div>
              <h3>Or you might want to search directly</h3>
              <div class="row">
                <div class="search one-half">
                  <input type="search" placeholder="Find recipe by name" />
                  <input type="submit" value="Search" />
                </div>
                <div class="one-half">
                  <select>
                    <option>or select a category</option>
                    <option>Apetizers</option>
                    <option>Cocktails</option>
                    <option>Deserts</option>
                    <option>Main courses</option>
                    <option>Snacks</option>
                    <option>Soups</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!--//recipefinder-->

          <!--results-->
          <div class="entries row">
            <!--item-->
            <div class="entry one-fourth">
              <figure>
                <img src="../frontend/images/img.jpg" alt="" />
                <figcaption>
                  <a href="#"
                    ><i class="icon icon-recetamatch_eye2"></i>
                    <span>View recipe</span></a
                  >
                </figcaption>
              </figure>
              <div class="container">
                <h2><a href="#">Recipe title example</a></h2>
                <div class="actions">
                  <div>
                    <div class="difficulty">
                      <i class="ico i-medium"></i><a href="#">medium</a>
                    </div>
                    <div class="likes">
                      <i class="fa fa-heart"></i><a href="#">0</a>
                    </div>
                    <div class="comments">
                      <i class="fa fa-comment"></i><a href="#">0</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--item-->

            <!--item-->
            <div class="entry one-fourth">
              <figure>
                <img src="../frontend/images/img.jpg" alt="" />
                <figcaption>
                  <a href="#"
                    ><i class="icon icon-recetamatch_eye2"></i>
                    <span>View recipe</span></a
                  >
                </figcaption>
              </figure>
              <div class="container">
                <h2><a href="#">Recipe title example</a></h2>
                <div class="actions">
                  <div>
                    <div class="difficulty">
                      <i class="ico i-hard"></i><a href="#">hard</a>
                    </div>
                    <div class="likes">
                      <i class="fa fa-heart"></i><a href="#">0</a>
                    </div>
                    <div class="comments">
                      <i class="fa fa-comment"></i><a href="#">0</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--item-->

            <!--item-->
            <div class="entry one-fourth">
              <figure>
                <img src="../frontend/images/img.jpg" alt="" />
                <figcaption>
                  <a href="#"
                    ><i class="icon icon-recetamatch_eye2"></i>
                    <span>View recipe</span></a
                  >
                </figcaption>
              </figure>
              <div class="container">
                <h2><a href="#">Recipe title example</a></h2>
                <div class="actions">
                  <div>
                    <div class="difficulty">
                      <i class="ico i-easy"></i><a href="#">easy</a>
                    </div>
                    <div class="likes">
                      <i class="fa fa-heart"></i><a href="#">0</a>
                    </div>
                    <div class="comments">
                      <i class="fa fa-comment"></i><a href="#">0</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--item-->

            <!--item-->
            <div class="entry one-fourth">
              <figure>
                <img src="../frontend/images/img.jpg" alt="" />
                <figcaption>
                  <a href="#"
                    ><i class="icon icon-recetamatch_eye2"></i>
                    <span>View recipe</span></a
                  >
                </figcaption>
              </figure>
              <div class="container">
                <h2><a href="#">Recipe title example</a></h2>
                <div class="actions">
                  <div>
                    <div class="difficulty">
                      <i class="ico i-hard"></i><a href="#">hard</a>
                    </div>
                    <div class="likes">
                      <i class="fa fa-heart"></i><a href="#">0</a>
                    </div>
                    <div class="comments">
                      <i class="fa fa-comment"></i><a href="#">0</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--item-->
          </div>
          <!--//results-->
        </section>
        <!--//content-->
      </div>
      <!--//row-->
    </div>
    <!--//wrap-->
  </main>
  <!--//main-->
</template>

<script>
export default {
  data() {
    return {
      newIngredient: "",
      ingredients: [],
      otherIngredients: [
        "ingredient",
        "ingredient1",
        "ingredient2",
        "ingredient3",
        "ingredient4",
        "ingredient5",
        "ingredient6",
        "ingredient7",
        "ingredient8",
        "ingredient9",
        "ingredient10",
      ],
      emphasizedIndex: null,
    };
  },
  methods: {
    addIngredient() {
      if (this.newIngredient.trim() !== "") {
        this.ingredients.push(this.newIngredient.trim());
        this.newIngredient = "";
      }
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
      if (this.emphasizedIndex === index) {
        this.emphasizedIndex = null;
      }
    },
    emphasizeIngredient(index) {
      this.emphasizedIndex = index;
    },
    toggleOtherIngredient(index) {
      const ingredient = this.otherIngredients[index];
      const inIngredients = this.ingredients.includes(ingredient);
      if (inIngredients) {
        this.ingredients = this.ingredients.filter((i) => i !== ingredient);
      } else {
        this.ingredients.push(ingredient);
      }
    },
  },
};
</script>

<style>
.emphasized {
  font-weight: bold;
}
</style>