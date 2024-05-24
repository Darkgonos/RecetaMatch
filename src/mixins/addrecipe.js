import services from "../services.js";
import axios from 'axios';

const UPLOADCARE_PUB_KEY = '9893e75d14f8f26bcd67';

export const postRecipeMixin = {
  data() {
    return {
      newRecipe: {
        title: "",
        description: "",
        image: "",
        category: "",
        preptime: "",
        cookingtime: "",
        difficulty: "",
        postedby: null,
        ingredients: [{ ingredient: "", measure: "" }],
        instructions: [{ text: "" }],
      },
      submissionStatus: null,
      submissionMessage: "",
    };
  },
  methods: {
    addIngredient() {
      this.newRecipe.ingredients.push({ ingredient: "", measure: "" });
    },
    removeIngredient(index) {
      this.newRecipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.newRecipe.instructions.push({ text: "" });
    },
    removeInstruction(index) {
      this.newRecipe.instructions.splice(index, 1);
    },
    async submitRecipe() {
      try {
        const responseuser = await services.getCurrentUser();
        if (responseuser.ok && responseuser.user && responseuser.user.id) {
          this.newRecipe.postedby = responseuser.user.id;
        } else {
          throw new Error("Unable to get current user.");
        }

        const ingredientsData = {};
        this.newRecipe.ingredients.forEach((item, index) => {
          ingredientsData[`ingredient${index + 1}`] = item.ingredient;
          ingredientsData[`measure${index + 1}`] = item.measure;
        });

        const steps = this.newRecipe.instructions.map(instruction => instruction.text).join('\r\n');
        const recipeData = { ...this.newRecipe, steps, ...ingredientsData };

        if (!this.newRecipe.title || !this.newRecipe.description || !this.newRecipe.category || !this.newRecipe.preptime || !this.newRecipe.cookingtime || !this.newRecipe.difficulty || !this.newRecipe.ingredients.length || !this.newRecipe.instructions.length) {
          throw new Error("All fields are required.");
        }

        if (this.newRecipe.ingredients.length < 3) {
          throw new Error("Recipe must have at least 3 ingredients.");
        }

        if (this.newRecipe.instructions.length < 1) {
          throw new Error("Recipe must have at least 1 instruction.");
        }

        const file = this.$refs.fileInput.files[0];
        if (!file) {
          throw new Error("Please select an image.");
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('UPLOADCARE_STORE', '1');
        formData.append('UPLOADCARE_PUB_KEY', UPLOADCARE_PUB_KEY);

        const imageResponse = await axios.post('https://upload.uploadcare.com/base/', formData);
        const fileName = encodeURIComponent(file.name);
        const imageUrl = `https://ucarecdn.com/${imageResponse.data.file}/${fileName}`;
        recipeData.image = imageUrl;

        const response = await services.postRecipe(recipeData);

        if (response.ok || response.data.ok) {
          this.submissionStatus = "success";
          this.submissionMessage = response.ok ? response.message : response.data.message;
          setTimeout(() => {
            this.$router.push('/recipes');
          }, 3000);
        } else {
          this.submissionStatus = "error";
          this.submissionMessage = response.error || response.data.error || "An error occurred while submitting the recipe.";
        }
      } catch (error) {
        console.error("Error submitting recipe:", error);
        this.submissionStatus = "error";
        this.submissionMessage = error.message || "An error occurred while submitting the recipe.";
      }
    },
  },
};