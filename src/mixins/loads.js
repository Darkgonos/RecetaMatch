import services from "../services.js";

export const loads = {
    data() {
        return {
            recipeId: null,
            recipeTitle: "",
            recipeDescription: "",
            recipeImage: "",
            recipeSteps: [],
            preparationTime: "",
            cookingTime: "",
            difficulty: "",
            category: "",
            postedBy: "",
            ingredients: {},
            latestRecipes: [],
            sixRecipes: [],
            recipes: [],
            displayedRecipes: [],
            batchSize: 12,
            currentBatchIndex: 0,
        };
      },
      mounted() {
        this.loadLastRecipe();
        this.loadLatestRecipes();
        this.loadSixRecipes();
        this.loadRecipes();
      },
      methods: {
        async loadLastRecipe() {
          try {
            const response = await services.getLastRecipe();
            const lastRecipe = response.result[0];
            if (lastRecipe) {
              this.recipeId = lastRecipe.id;
              this.recipeTitle = lastRecipe.title;
              this.recipeDescription = lastRecipe.description;
              this.recipeImage = lastRecipe.image;
            }
          } catch (error) {
            console.error("Error fetching last recipe:", error);
          }
        },
        async loadLatestRecipes() {
          try {
            const response = await services.getLastSixRecipe();
            this.latestRecipes = response.result.map((recipe) => ({
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
              difficulty: recipe.difficulty,
              likes: recipe.likes,
              comments: recipe.comments,
            }));
          } catch (error) {
            console.error("Error fetching latest recipes:", error);
          }
        },
    
        async loadSixRecipes() {
          try {
            const response = await services.getSixRecipe();
            this.sixRecipes = response.result.map((recipe) => ({
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
              difficulty: recipe.difficulty,
              likes: recipe.likes,
              comments: recipe.comments,
            }));
          } catch (error) {
            console.error("Error fetching latest recipes:", error);
          }
        },

          async loadRecipes() {
            try {
              const response = await services.getRecipes();
              this.recipes = response.result;
              this.displayedRecipes = this.recipes.slice(0, this.batchSize);
            } catch (error) {
              console.error("Error fetching recipes:", error);
            }
          },

          loadMoreRecipes() {
            const nextBatchIndex = this.currentBatchIndex + this.batchSize;
            if (nextBatchIndex < this.recipes.length) {
              const newRecipes = this.recipes.slice(nextBatchIndex, nextBatchIndex + this.batchSize);
              this.displayedRecipes = [...this.displayedRecipes, ...newRecipes];
              this.currentBatchIndex = nextBatchIndex;
            }
          },

          
          
          
      },
};


