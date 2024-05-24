import services from "../services.js";

export const Favouriteid = {
    data() {
        return {
            recipes: [], 
            batchSizeFav: 3,
            currentBatchIndexFav: 0,
            displayedRecipesFav: [],
        };
    },
    methods: {
        async loadRecipefav() {
            try {
                if (this.currentUser && this.currentUser.favouriteRecipes) {
                    const favouriteRecipes = this.currentUser.favouriteRecipes;
        
                    for (const recipeId of favouriteRecipes) {
                        try {
                            const response = await services.getRecipeById(recipeId);
                            const recipe = response.result[0];
        
                            if (recipe.published === 1) {
                                this.recipes.push({
                                    id: recipe.id,
                                    title: recipe.title,
                                    image: recipe.image,
                                    difficulty: recipe.difficulty
                                });
                            }
                        } catch (error) {
                            if (error.response && error.response.status === 400) {
                                console.warn(`${error.response.data.error}`);
                            } else {
                                console.error("Error fetching recipe:", error);
                            }
                        }
                    }
                    this.displayedRecipesFav = this.recipes.slice(0, this.batchSizeFav);
                    this.currentBatchIndexFav = this.batchSizeFav;
                }
            } catch (error) {
                console.error("Error fetching favourite recipes:", error);
            }
        },

        loadMoreRecipeFav() {
            const remainingRecipes = this.recipes.slice(this.currentBatchIndexFav);
            const nextBatchIndex = this.currentBatchIndexFav + this.batchSizeFav;
            
            if (remainingRecipes.length <= this.batchSizeFav) {
                this.displayedRecipesFav = [...this.displayedRecipesFav, ...remainingRecipes];
                this.currentBatchIndexFav = this.recipes.length;
            } else {
                const newRecipes = remainingRecipes.slice(0, this.batchSizeFav);
                this.displayedRecipesFav = [...this.displayedRecipesFav, ...newRecipes];
                this.currentBatchIndexFav = nextBatchIndex;
            }
        },
        
        
        
    },
};
