<template>
  <main class="main" role="main" v-if="isAllowed">
    <div class="wrap clearfix">
      <nav class="breadcrumbs">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li>Edit recipe</li>
        </ul>
      </nav>

      <div class="row">
        <header class="s-title">
          <h1>Edit Recipe</h1>
        </header>

        <section class="content full-width">
          <div class="submit_recipe container">
            <section>
              <div class="f-row">
                <div class="full">
                  <input
                    type="text"
                    v-model="recipeTitle"
                    required
                  />
                </div>
              </div>
              <div class="f-row">
                <div class="third">
                  <input
                    type="text"
                    v-model="preparationTime"
                    placeholder="Preparation time (for example 5min)"
                    required
                  />
                </div>
                <div class="third">
                  <input
                    type="text"
                    v-model="cookingTime"
                    placeholder="Cooking time (for example 10min)"
                    required
                  />
                </div>
              </div>
              <div class="f-row">
                <div class="third">
                  <select v-model="difficulty" required>
                    <option disabled value="">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div class="third">
                  <select v-model="category" required>
                    <option disabled value="">Select a category</option>
                    <option value="Meat">Meat</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Lamb">Lamb</option>
                    <option value="Side">Side</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Starter">Starter</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h2>Description</h2>
              <div class="f-row">
                <div class="full">
                  <textarea
                    v-model="recipeDescription"
                    placeholder="Recipe Description"
                    required
                  ></textarea>
                </div>
              </div>
            </section>

            <section>
              <h2>Ingredients</h2>
              <div
                class="f-row ingredient"
                v-for="(ingredient, index) in ingredients"
                :key="index"
              >
                <div class="large">
                  <input
                    type="text"
                    v-model="ingredient.name"
                    placeholder="Ingredient"
                    required
                  />
                </div>
                <div class="small">
                  <input
                    type="text"
                    v-model="ingredient.measure"
                    placeholder="Quantity"
                    required
                  />
                </div>
                <button class="remove" @click="removeIngredient(index)">
                  -
                </button>
              </div>
              <div class="f-row full">
                <button class="add" @click="addIngredient">
                  Add an ingredient
                </button>
              </div>
            </section>

            <section>
              <h2>
                Instructions
                <span>(enter instructions, each step at a time)</span>
              </h2>
              <div
                class="f-row instruction"
                v-for="(step, index) in recipeSteps"
                :key="index"
              >
                <div class="full">
                  <input
                    type="text"
                    v-model="recipeSteps[index]"
                    placeholder="Instructions"
                    required
                  />
                </div>
                <button class="remove" @click="removeInstruction(index)">
                  -
                </button>
              </div>
              <div class="f-row full">
                <button class="add" @click="addInstruction">Add a step</button>
              </div>
            </section>

            <section>
              <h2>Photo</h2>
              <div class="f-row full">
                <div class="image">
                  <img :src="recipeImage" alt="Recipe Image" />
                </div>
                <br><br>
                <input ref="fileInput" type="file" @change="handleFileUpload" />
              </div>
            </section>

            <center><div class="f-row full">
              <button @click="submitRecipe" class="button">
                Edit this recipe
              </button>
            </div></center>
            <div class="error-message" v-if="errorMessage">
              {{ errorMessage }}
            </div>
            <div class="success-message" v-if="successMessage">
              {{ successMessage }}
            </div>
            <br>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { CurrentUser } from '../mixins/currentuser.js';
import { Recipeid } from "../mixins/recipeid.js";
import { editRecipe } from "../mixins/editrecipe.js";

export default {
  mixins: [CurrentUser, Recipeid, editRecipe],
  data() {
    return {
      isAllowed: true,
      recipeId: this.$route.params.id
    };
  },
  mounted() {
    this.checkAdminAccess();
  },
  updated() {
    this.checkAdminAccess();
  },
  methods: {
    checkAdminAccess() {
      if (this.currentUser && this.currentUser.isAdmin !== 1) {
        this.isAllowed = false;
        this.$router.push('/');
      }
    },
    addIngredient() {
      this.ingredients.push({ name: '', measure: '' });
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.recipeSteps.push('');
    },
    removeInstruction(index) {
      this.recipeSteps.splice(index, 1);
    },
    async submitRecipe() {
      this.errorMessage = '';
      this.successMessage = '';
      
      try {
        await this.updateRecipe();
      } catch (error) {
        this.errorMessage = error.message || "An error occurred while updating the recipe.";
      }
    }
  }
};
</script>

<style>
.error-message {
  color: red;
  text-align: center;
}

.success-message {
  color: green;
  text-align: center;
}
</style>
