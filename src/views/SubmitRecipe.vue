<template>
  <main class="main" role="main">
    <div class="wrap clearfix">
      <nav class="breadcrumbs">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li>Submit a recipe</li>
        </ul>
      </nav>

      <div class="row">
        <header class="s-title">
          <h1>Add a new recipe</h1>
        </header>

        <section class="content full-width">
          <div class="submit_recipe container">
            <section>
              <h2>Basics</h2>
              <p>All fields are required.</p>
              <div class="f-row">
                <div class="full">
                  <input
                    v-model="newRecipe.title"
                    type="text"
                    placeholder="Recipe title"
                    required
                  />
                </div>
              </div>
              <div class="f-row">
                <div class="third">
                  <input
                    v-model="newRecipe.preptime"
                    type="text"
                    placeholder="Preparation time (for example 5min)"
                    required
                  />
                </div>
                <div class="third">
                  <input
                    v-model="newRecipe.cookingtime"
                    type="text"
                    placeholder="Cooking time (for example 10min)"
                    required
                  />
                </div>
              </div>
              <div class="f-row">
                <div class="third">
                  <select v-model="newRecipe.difficulty" required>
                    <option disabled value="">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div class="third">
                  <select v-model="newRecipe.category" required>
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
                    v-model="newRecipe.description"
                    placeholder="Recipe Description"
                    required
                  ></textarea>
                </div>
              </div>
            </section>

            <section>
              <h2>Ingredients</h2>
              <div
                v-for="(ingredient, index) in newRecipe.ingredients"
                :key="index"
                class="f-row ingredient"
              >
                <div class="large">
                  <input
                    type="text"
                    v-model="ingredient.ingredient"
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
                v-for="(instruction, index) in newRecipe.instructions"
                :key="index"
                class="f-row instruction"
              >
                <div class="full">
                  <input
                    type="text"
                    v-model="instruction.text"
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
    <input ref="fileInput" type="file" />
  </div>
</section>


            <div class="f-row full">
              <button @click="submitRecipe" class="button">
                Publish this recipe
              </button>
            </div>
            <div v-if="submissionStatus" :class="submissionStatus === 'success' ? 'success-message' : 'error-message'">
                <h3> {{ submissionMessage }} </h3>
            </div>
            <br>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { postRecipeMixin } from "../mixins/addrecipe.js";

export default {
  mixins: [postRecipeMixin],
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
