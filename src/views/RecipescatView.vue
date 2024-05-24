<template>
  <!--main-->
  <main class="main" role="main">
    <!--wrap-->
    <div class="wrap clearfix">
      <!--breadcrumbs-->
      <nav class="breadcrumbs">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li>Recipes</li>
        </ul>
      </nav>
      <!--//breadcrumbs-->

      <!--row-->
      <div class="row">
        <header class="s-title">
          <h1>Recipes</h1>
        </header>

        <aside class="above-sidebar full-width">
  <ul class="boxed">
    <li class="light">
      <router-link to="/recipes/Pasta" title="Appetizers">
        <i class="icon icon-recetamatch_pasta"></i>
        <span>Apetizers</span>
      </router-link>
    </li>
    <li class="medium">
      <router-link to="/recipes/Miscellaneous" title="Cocktails">
        <i class="icon icon-recetamatch_margarita2"></i>
        <span>Cocktails</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Dessert" title="Desserts">
        <i class="icon icon-recetamatch_cupcake"></i>
        <span>Deserts</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Breakfast" title="Eggs">
        <i class="icon icon-recetamatch_eggs"></i>
        <span>Eggs</span>
      </router-link>
    </li>
    <li class="medium">
      <router-link to="/recipes/Miscellaneous" title="Equipment">
        <i class="icon icon-recetamatch_blender"></i>
        <span>Equipment</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Chicken" title="Chicken">
        <i class="icon icon-recetamatch_turkey"></i>
        <span>Chicken</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Seafood" title="Fish">
        <i class="icon icon-recetamatch_fish2"></i>
        <span>Fish</span>
      </router-link>
    </li>
    <li class="medium">
      <router-link to="/recipes/Miscellaneous" title="Fitness">
        <i class="icon icon-recetamatch_biceps"></i>
        <span>Fitness</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Vegetarian" title="Healthy">
        <i class="icon icon-recetamatch_apple2"></i>
        <span>Healthy</span>
      </router-link>
    </li>
    <li class="medium">
      <router-link to="/recipes/Miscellaneous" title="Asian">
        <i class="icon icon-recetamatch_sushi"></i>
        <span>Asian</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Miscellaneous" title="Mexican">
        <i class="icon icon-recetamatch_peper"></i>
        <span>Mexican</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Miscellaneous" title="Pizza">
        <i class="icon icon-recetamatch_pizza-slice"></i>
        <span>Pizza</span>
      </router-link>
    </li>
    <li class="medium">
      <router-link to="/recipes/Miscellaneous" title="Kids">
        <i class="icon icon-recetamatch_happy"></i>
        <span>Kids</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Meat" title="Meat">
        <i class="icon icon-recetamatch_meat"></i>
        <span>Meat</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Starter" title="Snacks">
        <i class="icon icon-recetamatch_fried-potatoes"></i>
        <span>Snacks</span>
      </router-link>
    </li>
    <li class="medium">
      <router-link to="/recipes/Side" title="Salads">
        <i class="icon icon-recetamatch_eggplant"></i>
        <span>Salads</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Miscellaneous" title="Storage">
        <i class="icon icon-recetamatch_soup2"></i>
        <span>Soups</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Vegetarian" title="Vegetarian">
        <i class="icon icon-recetamatch_plant-symbol"></i>
        <span>Vegetarian</span>
      </router-link>
    </li>
  </ul>
</aside>

        <!--content-->
        <section class="content full-width">
          <!--entries-->
          <div class="entries row">
            <div
              v-for="recipe in displayedRecipescat"
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
          <!--//entries-->
          <div class="quicklinks">
            <button @click="loadMoreRecipesCat" class="button">
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
import { RecipCat } from "../mixins/category.js";

export default {
  mixins: [RecipCat],
  watch: {
    '$route': 'loadRecipesCatOnRouteChange'
  },
  methods: {
    async loadRecipesCatOnRouteChange() {
      try {
        const category = this.$route.params.recipeCat;
        await this.loadRecipesCat(category);
        if (this.recipesCat.length === 0) {
          this.$router.push('/recipes');
        }
      } catch (error) {
        console.error("Error loading recipes by category:", error);
      }
    }
  },
  mounted() {
    this.loadRecipesCatOnRouteChange();
  }
};
</script>
