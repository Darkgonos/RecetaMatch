import services from "../services.js";
import axios from 'axios';

const UPLOADCARE_PUB_KEY = '9893e75d14f8f26bcd67';

export const editRecipe = {
  data() {
    return {
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('UPLOADCARE_STORE', '1');
      formData.append('UPLOADCARE_PUB_KEY', UPLOADCARE_PUB_KEY);

      try {
        const imageResponse = await axios.post('https://upload.uploadcare.com/base/', formData);
        const fileName = encodeURIComponent(file.name);
        const imageUrl = `https://ucarecdn.com/${imageResponse.data.file}/${fileName}`;
        this.recipeImage = imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    validateRecipeData() {
      if (!this.recipeTitle || !this.recipeDescription || !this.category || !this.preparationTime || !this.cookingTime || !this.difficulty || !this.ingredients.length || !this.recipeSteps.length) {
        throw new Error("All fields are required.");
      }

      if (this.ingredients.length < 3) {
        throw new Error("Recipe must have at least 3 ingredients.");
      }

      if (this.recipeSteps.length < 1) {
        throw new Error("Recipe must have at least 1 instruction.");
      }
    },
    async updateRecipe() {
      try {
        this.validateRecipeData();

        const recipeData = {
          title: this.recipeTitle,
          description: this.recipeDescription,
          image: this.recipeImage,
          category: this.category,
          steps: this.recipeSteps.join('\r\n'),
          preptime: this.preparationTime,
          cookingtime: this.cookingTime,
          difficulty: this.difficulty,
        };

        this.ingredients.forEach((ingredient, index) => {
          recipeData[`ingredient${index + 1}`] = ingredient.name;
          recipeData[`measure${index + 1}`] = ingredient.measure;
        });

        const response = await services.editRecip(this.recipeId, recipeData);
        if (response.ok) {
          this.successMessage = "Recipe updated successfully.";
          setTimeout(() => {
            this.$router.push(`/recipe/${this.recipeId}`);
          }, 3000);
        } else {
          this.errorMessage = "Error updating recipe: " + response.error;
        }
      } catch (error) {
        this.errorMessage = error.message || "An error occurred while updating the recipe.";
      }
    }
  }
};
