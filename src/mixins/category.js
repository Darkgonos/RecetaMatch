import services from "../services.js";

export const RecipCat = {
    data() {
        return {
            recipesCat: [],
            displayedRecipescat: [],
            batchSizeCat: 12,
            currentBatchIndexCat: 0,
        };
    },
      mounted() {
        this.loadRecipesCat();
      },
    methods: {
        async loadRecipesCat() {
            try {
                const recipeCat = this.$route.params.recipeCat;
                const response = await services.getRecipeByCat(recipeCat);
                this.recipesCat = response.result; 
                this.displayedRecipescat = this.recipesCat.slice(0, this.batchSizeCat); 
                this.currentBatchIndexCat = this.batchSizeCat;
            } catch (error) {
                console.error("Error loading recipes by category:", error);
            }
        },

          loadMoreRecipesCat() {
            const nextBatchIndex = this.currentBatchIndexCat + this.batchSizeCat;
            if (nextBatchIndex < this.recipesCat.length) {
              const newRecipes = this.recipesCat.slice(nextBatchIndex, nextBatchIndex + this.batchSizeCat);
              this.displayedRecipescat = [...this.displayedRecipescat, ...newRecipes];
              this.currentBatchIndexCat = nextBatchIndex;
            }
          },
          
    },
};