import services from "../services.js";

export const search = {
    data() {
        return {
            recipesIng: [],
            displayedRecipesing: [],
            batchSizeIng: 12,
            currentBatchIndexIng: 0,
        };
    },
      mounted() {
        this.loadRecipesIng();
      },
    methods: {
        async loadRecipesIng() {
            try {
                const recipeIng = this.$route.params.recipeIng;
                const response = await services.getRecipeByIng(recipeIng);
                this.recipesIng = response.result; 
                this.displayedRecipesing = this.recipesIng.slice(0, this.batchSizeIng); 
                this.currentBatchIndexIng = this.batchSizeIng;
            } catch (error) {
                console.error("Error loading recipes by Ingredient :", error);
            }
        },

          loadMoreRecipesIng() {
            const nextBatchIndex = this.currentBatchIndexIng + this.batchSizeIng;
            if (nextBatchIndex < this.recipesIng.length) {
              const newRecipes = this.recipesIng.slice(nextBatchIndex, nextBatchIndex + this.batchSizeIng);
              this.displayedRecipesing = [...this.displayedRecipesing, ...newRecipes];
              this.currentBatchIndexIng = nextBatchIndex;
            }
          },

          async loadRecipesName() {
            try {
                const recipeName = this.$route.params.recipeName;
                const response = await services.getRecipeByName(recipeName);
                this.recipesIng = response.result; 
                this.displayedRecipesing = this.recipesIng.slice(0, this.batchSizeIng); 
                this.currentBatchIndexIng = this.batchSizeIng;
            } catch (error) {
                console.error("Error loading recipes by Name :", error);
            }
        },

          loadMoreRecipesName() {
            const nextBatchIndex = this.currentBatchIndexIng + this.batchSizeIng;
            if (nextBatchIndex < this.recipesIng.length) {
              const newRecipes = this.recipesIng.slice(nextBatchIndex, nextBatchIndex + this.batchSizeIng);
              this.displayedRecipesing = [...this.displayedRecipesing, ...newRecipes];
              this.currentBatchIndexIng = nextBatchIndex;
            }
          },
          
    },
};