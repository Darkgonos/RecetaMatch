<template>
  <!--main-->
  <main class="main" role="main">
    <!--intro-->
    <div class="intro">
      <figure class="bg">
        <img src="../frontend/images/intro.jpg" alt="" />
      </figure>

      <!--wrap-->
      <div class="wrap clearfix">
        <!--row-->
        <div class="row">
          <article class="three-fourth text">
            <h1>Welcome to RecetaMatch !</h1>
            <p>
              RecetaMatch is the ultimate
              <strong>culinary community platform</strong>, where recipes come
              to life. Wondering what you'll gain by joining us? Let us give you
              a taste.
            </p>
            <p>
              By joining us, you will have the chance to make new friendships
              and share delicious recipes. Get ready to discover a world of
              flavors and conviviality!
            </p>
            <div v-if="isAuthenticated">
            </div>
            <div v-else>              
            <router-link to="/Sign_up" class="button white more medium"
              >Join our community <i class="fa fa-chevron-right"></i
            ></router-link>
            <p>
              Already a member? Click
              <router-link to="/Sign_in">here</router-link> to login.
            </p>
            </div>
          </article>

          <!--search recipes widget-->
          <div class="one-fourth">
            <div class="widget container">
              <div class="textwrap">
                <h3>Search for recipes</h3>
                <p>
                  Simply enter your desired ingredient, dish, or keyword into
                  the search bar
                </p>
                <p>or browse through our categories with ease.</p>
                <p>
                  With just a click, you'll unlock a world of delicious
                  possibilities waiting to tantalize your taste buds.
                </p>
                <p>Enjoy!</p>
              </div>
              <form action="#">
                <div class="f-row">
                  <input type="text" placeholder="Enter your search term" v-model="recipeName" @keyup.enter="searchRecipesName" />
                </div>
                <div class="f-row bwrap">
                  <input type="submit" value="Start cooking!" @click="searchRecipesName" />
                </div>
              </form>
            </div>
          </div>
          <!--//search recipes widget-->
        </div>
        <!--//row-->
      </div>
      <!--//wrap-->
    </div>
    <!--//intro-->

    <!--wrap-->
    <div class="wrap clearfix">
      <!--row-->
      <div class="row">
        <!--content-->
        <section class="content full-width">
          <div class="icons dynamic-numbers">
            <header class="s-title">
              <h2 class="ribbon large">RecetaMatch in numbers</h2>
            </header>

            <!--row-->
            <div class="row">
              <!--item-->
              <div class="one-fourth">
                <div class="container">
                  <i class="icon icon-recetamatch_chef-hat"></i>
                  <span class="title dynamic-number" data-dnumber="2">0</span>
                  <span class="subtitle">members</span>
                </div>
              </div>
              <!--//item-->

              <!--item-->
              <div class="one-fourth">
                <div class="container">
                  <i class="icon icon-recetamatch_pan"></i>
                  <span class="title dynamic-number" data-dnumber="301">0</span>
                  <span class="subtitle">recipes</span>
                </div>
              </div>
              <!--//item-->

              <!--item-->
              <div class="one-fourth">
                <div class="container">
                  <i class="icon icon-recetamatch_image"></i>
                  <span class="title dynamic-number" data-dnumber="301">0</span>
                  <span class="subtitle">photos</span>
                </div>
              </div>
              <!--//item-->

              <!--item-->
              <div class="one-fourth">
                <div class="container">
                  <i class="icon icon-recetamatch_pencil"></i>
                  <span class="title dynamic-number" data-dnumber="3">0</span>
                  <span class="subtitle">posts</span>
                </div>
              </div>
              <!--//item-->

              <div class="cta" v-if="!isAuthenticated">
                <router-link to="/Sign_in" class="button big"
                  >Join us !</router-link
                >
              </div>
            </div>
            <!--//row-->
          </div>
        </section>
        <!--//content-->

        <!--content-->
        <section class="content three-fourth">
          <!--cwrap-->
          <div class="cwrap">
            <!--entries-->
            <div class="entries row">
              <!--featured recipe-->
              <div class="featured full-third">
                <header class="s-title">
                  <h2 class="ribbon">Recipe of the Day</h2>
                </header>
                <article class="entry">
                  <figure class="entryimg">
                    <img :src="recipeImage" alt="" />
                    <figcaption>
                      <router-link :to="'/Recipe/' + recipeId"
                        ><i class="icon icon-recetamatch_eye2"></i>
                        <span>View recipe</span></router-link
                      >
                    </figcaption>
                  </figure>
                  <div class="container">
                    <h2>
                      <router-link :to="'/Recipe/' + recipeId">{{
                        recipeTitle
                      }}</router-link>
                    </h2>
                    <p>{{ recipeDescription }}</p>
                    <div class="actions">
                      <div>
                        <router-link :to="'/Recipe/' + recipeId" class="button"
                          >See the full recipe</router-link
                        >
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <!--//featured recipe-->
            </div>
            <!--//entries-->
          </div>
          <!--//cwrap-->

          <!--cwrap-->
          <div class="cwrap">
            <header class="s-title">
              <h2 class="ribbon bright">Latest recipes</h2>
            </header>

            <div class="entries row">
              <!-- Repeatable entry -->
              <div
                v-for="recipe in latestRecipes"
                :key="recipe.id"
                class="entry one-third"
              >
                <figure class="entryimg2">
                  <img :src="recipe.image" alt="Recipe Image" />
                  <figcaption>
                    <router-link :to="'/Recipe/' + recipe.id"
                      ><i class="icon icon-recetamatch_eye2"></i>
                      <span>View recipe</span></router-link
                    >
                  </figcaption>
                </figure>
                <div class="container">
                  <h2>
                    <router-link :to="'/Recipe/' + recipe.id">{{
                      recipe.title
                    }}</router-link>
                  </h2>
                  <div class="actions">
                    <div>
                      <div class="difficulty">
                        <i class="ico" :class="'i-' + recipe.difficulty"></i
                        ><a href="#">{{ recipe.difficulty }}</a>
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
              <!-- Repeatable entry -->

              <div class="quicklinks">
                <router-link to="/Recipes" class="button">More recipes</router-link>
                <a href="javascript:void(0)" class="button scroll-to-top"
                  >Back to top</a
                >
              </div>
            </div>
          </div>

          <!--cwrap-->
          <div class="cwrap">
            <header class="s-title">
              <h2 class="ribbon bright">Latest articles</h2>
            </header>
            <!--entries-->
            <div class="entries row">
              <!--item-->
              <div class="entry one-third">
                <figure>
                  <img src="../frontend/images/img.jpg" alt="" />
                  <figcaption>
                    <a href="#"
                      ><i class="icon icon-recetamatch_eye2"></i>
                      <span>View post</span></a
                    >
                  </figcaption>
                </figure>
                <div class="container">
                  <h2><a href="#">Title</a></h2>
                  <div class="actions">
                    <div>
                      <div class="date">
                        <i class="fa fa-calendar"></i
                        ><a href="#">20 Avr 2024</a>
                      </div>
                      <div class="comments">
                        <i class="fa fa-comment"></i><a href="#">0</a>
                      </div>
                    </div>
                  </div>
                  <div class="excerpt">
                    <p>This is an articles description example . . .</p>
                  </div>
                </div>
              </div>
              <!--item-->

              <!--item-->
              <div class="entry one-third">
                <figure>
                  <img src="../frontend/images/img.jpg" alt="" />
                  <figcaption>
                    <a href="#"
                      ><i class="icon icon-recetamatch_eye2"></i>
                      <span>View post</span></a
                    >
                  </figcaption>
                </figure>
                <div class="container">
                  <h2><a href="#">Title</a></h2>
                  <div class="actions">
                    <div>
                      <div class="date">
                        <i class="fa fa-calendar"></i
                        ><a href="#">20 Avr 2024</a>
                      </div>
                      <div class="comments">
                        <i class="fa fa-comment"></i><a href="#">0</a>
                      </div>
                    </div>
                  </div>
                  <div class="excerpt">
                    <p>This is an articles description example . . .</p>
                  </div>
                </div>
              </div>
              <!--item-->

              <!--item-->
              <div class="entry one-third">
                <figure>
                  <img src="../frontend/images/img.jpg" alt="" />
                  <figcaption>
                    <a href="#"
                      ><i class="icon icon-recetamatch_eye2"></i>
                      <span>View post</span></a
                    >
                  </figcaption>
                </figure>
                <div class="container">
                  <h2><a href="#">Title</a></h2>
                  <div class="actions">
                    <div>
                      <div class="date">
                        <i class="fa fa-calendar"></i
                        ><a href="#">20 Avr 2024</a>
                      </div>
                      <div class="comments">
                        <i class="fa fa-comment"></i><a href="#">0</a>
                      </div>
                    </div>
                  </div>
                  <div class="excerpt">
                    <p>This is an articles description example . . .</p>
                  </div>
                </div>
              </div>
              <!--item-->

              <div class="quicklinks">
                <a href="#" class="button">More posts</a>
                <a href="javascript:void(0)" class="button scroll-to-top"
                  >Back to top</a
                >
              </div>
            </div>
            <!--//entries-->
          </div>
          <!--//cwrap-->
        </section>
        <!--//content-->

        <!--right sidebar-->
        <aside class="sidebar one-fourth">
          <div class="widget">
  <h3>Recipe Categories</h3>
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
    <li class="medium">
      <router-link to="/recipes/Breakfast" title="Eggs">
        <i class="icon icon-recetamatch_eggs"></i>
        <span>Eggs</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Miscellaneous" title="Equipment">
        <i class="icon icon-recetamatch_blender"></i>
        <span>Equipment</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Chicken" title="Events">
        <i class="icon icon-recetamatch_turkey"></i>
        <span>Events</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Seafood" title="Fish">
        <i class="icon icon-recetamatch_fish2"></i>
        <span>Fish</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Miscellaneous" title="Fitness">
        <i class="icon icon-recetamatch_biceps"></i>
        <span>Fitness</span>
      </router-link>
    </li>
    <li class="medium">
      <router-link to="/recipes/Vegetarian" title="Healthy">
        <i class="icon icon-recetamatch_apple2"></i>
        <span>Healthy</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Miscellaneous" title="Asian">
        <i class="icon icon-recetamatch_sushi"></i>
        <span>Asian</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Miscellaneous" title="Mexican">
        <i class="icon icon-recetamatch_peper"></i>
        <span>Mexican</span>
      </router-link>
    </li>
    <li class="medium">
      <router-link to="/recipes/Miscellaneous" title="Pizza">
        <i class="icon icon-recetamatch_pizza-slice"></i>
        <span>Pizza</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Miscellaneous" title="Kids">
        <i class="icon icon-recetamatch_happy"></i>
        <span>Kids</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Meat" title="Meat">
        <i class="icon icon-recetamatch_meat"></i>
        <span>Meat</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Starter" title="Snacks">
        <i class="icon icon-recetamatch_fried-potatoes"></i>
        <span>Snacks</span>
      </router-link>
    </li>
    <li class="light">
      <router-link to="/recipes/Side" title="Salads">
        <i class="icon icon-recetamatch_eggplant"></i>
        <span>Salads</span>
      </router-link>
    </li>
    <li class="medium">
      <router-link to="/recipes/Miscellaneous" title="Soups">
        <i class="icon icon-recetamatch_soup2"></i>
        <span>Soups</span>
      </router-link>
    </li>
    <li class="dark">
      <router-link to="/recipes/Vegetarian" title="Vegetarian">
        <i class="icon icon-recetamatch_plant-symbol"></i>
        <span>Vegetarian</span>
      </router-link>
    </li>
  </ul>
</div>


          <div class="widget">
            <h3>Tips and tricks</h3>
            <ul class="articles_latest">
              <li v-for="recipe in sixRecipes" :key="recipe.id">
                <a :href="'/Recipe/' + recipe.id">
                  <img :src="recipe.image" alt="Recipe Image" />
                  <h6>{{ recipe.title }}</h6>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <!--//right sidebar-->
    </div>
    <!--//wrap-->
  </main>
  <!--//main-->
</template>

<script>
import { loads } from "../mixins/loads.js";
import { Authentication } from "../mixins/authentication.js";

export default {
  mixins: [loads, Authentication],
  methods: {
    searchRecipesName() {
      const recipeName = this.recipeName.trim();
      if (recipeName !== "") {
        this.$router.push(`/FindRecipes/${recipeName}`);
      }
    },
  },
};
</script>