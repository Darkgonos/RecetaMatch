<template>
  <!--main-->
  <main class="main" role="main">
    <!--wrap-->
    <div class="wrap clearfix">
      <!--breadcrumbs-->
      <nav class="breadcrumbs">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li>Submit a recipe</li>
        </ul>
      </nav>
      <!--//breadcrumbs-->

      <!--row-->
      <div class="row">
        <header class="s-title">
          <h1>Add a new recipe</h1>
        </header>

        <!--content-->
        <section class="content full-width">
          <div class="submit_recipe container">
            <!-- <form> -->
            <section>
              <h2>Basics</h2>
              <p>All fields are required.</p>
              <div class="f-row">
                <div class="full">
                  <input type="text" placeholder="Recipe title" />
                </div>
              </div>
              <div class="f-row">
                <div class="third">
                  <input type="text" placeholder="Preparation time" />
                </div>
                <div class="third">
                  <input type="text" placeholder="Cooking time" />
                </div>
                <div class="third">
                  <select>
                    <option selected="selected">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <div class="f-row">
                <div class="third">
                  <input type="text" placeholder="Serves how many people?" />
                </div>
                <div class="third">
                  <select>
                    <option selected="selected">Select a category</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h2>Description</h2>
              <div class="f-row">
                <div class="full">
                  <textarea placeholder="Recipe Description"></textarea>
                </div>
              </div>
            </section>

            <section>
              <h2>Ingredients</h2>
              <div
                v-for="(ingredient, index) in ingredients"
                :key="index"
                class="f-row ingredient"
              >
                <div class="large">
                  <input
                    type="text"
                    v-model="ingredient.name"
                    placeholder="Ingredient"
                  />
                </div>
                <div class="small">
                  <input
                    type="text"
                    v-model="ingredient.quantity"
                    placeholder="Quantity"
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
                v-for="(instruction, index) in instructions"
                :key="index"
                class="f-row instruction"
              >
                <div class="full">
                  <input
                    type="text"
                    v-model="instruction.text"
                    placeholder="Instructions"
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
                <input type="file" />
              </div>
            </section>

            <div class="f-row full">
              <input
                type="submit"
                class="button"
                id="submitRecipe"
                value="Publish this recipe"
              />
            </div>
            <!-- /form-->
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
export default {
  data() {
    return {
      ingredients: [{ name: "", quantity: "" }],
      instructions: [{ text: "" }],
    };
  },
  methods: {
    addIngredient() {
      this.ingredients.push({ name: "", quantity: "" });
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.instructions.push({ text: "" });
    },
    removeInstruction(index) {
      this.instructions.splice(index, 1);
    },
  },
};
</script>