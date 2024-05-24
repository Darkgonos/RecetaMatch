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
                <input type="submit" value="Search" @click="searchRecipes" />
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
                  <input
                    type="search"
                    placeholder="Find recipe by name"
                    v-model="recipeName"
                    @keyup.enter="searchRecipesName"
                  />
                  <input
                    type="submit"
                    value="Search"
                    @click="searchRecipesName"
                  />
                </div>
              </div>
            </div>
          </div>
          <!--//recipefinder-->

           <!--results-->
          <div class="entries row">
            <div
              v-for="recipe in displayedRecipesing"
              :key="recipe.id"
              class="entry one-fourth"
            >
              <figure class="entryimg2">
                <img :src="recipe.image" alt="" />
                <figcaption>
                  <router-link :to="`/recipe/${recipe.id}`">
                    <i class="icon icon-recetamatch_eye2"></i>
                    <span>View recipe</span>
                  </router-link>
                </figcaption>
              </figure>
              <div class="container">
                <h2>{{ recipe.title }}</h2>
                <div class="actions">
                  <div>
                    <div class="difficulty">
                      <i :class="'ico i-' + recipe.difficulty"></i>
                      <a href="#">{{ recipe.difficulty }}</a>
                    </div>
                    <div class="likes">
                      <i class="fa fa-heart"></i>
                      <a href="#">0</a>
                    </div>
                    <div class="comments">
                      <i class="fa fa-comment"></i>
                      <a href="#">0</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--//results-->
          <div class="quicklinks">
            <button @click="loadMoreRecipesIng" class="button">
              More recipes
            </button>
            <a href="#" class="button scroll-to-top"
              >Back to top</a
            >
          </div>
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
import { search } from "../mixins/search.js";

export default {
  mixins: [search],
  data() {
    return {
      newIngredient: "",
      ingredients: [],
      otherIngredients: [
        "Egg",
        "Butter",
        "Water",
        "Chicken",
        "Flour",
        "Oil",
        "Potatoes",
        "Onion",
        "Beef",
        "Bread",
        "Cheese",
      ],
      emphasizedIndex: null,
    };
  },
  watch: {
    '$route': 'loadRecipesIngOnRouteChange'
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
    searchRecipes() {
      const recipeIng = this.ingredients.join(',');
      this.$router.push(`/FindRecipe/${recipeIng}`);
    },
    searchRecipesName() {
      const recipeName = this.recipeName.trim();
      if (recipeName !== "") {
        this.$router.push(`/FindRecipes/${recipeName}`);
      }
    },
    async loadRecipesIngOnRouteChange() {
      try {
        const ingredient = this.$route.params.recipeIng;
        await this.loadRecipesIng(ingredient);
        if (this.recipesIng.length === 0) {
          this.$router.push('/FindRecipe');
        }
      } catch (error) {
        console.error("Error loading recipes by category:", error);
      }
    }
  },
  mounted() {
    this.loadRecipesIngOnRouteChange();
  }
};
</script>

<style>
.emphasized {
  font-weight: bold;
}
</style>