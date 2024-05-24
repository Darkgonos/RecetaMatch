import Services from "../services.js";

export default {
    data() {
        return {
            isFavourite: false
        };
    },
    methods: {
        async addToFavourites(recipeId) {
            try {
                const response = await Services.addToFavourites(recipeId);
                if (response.ok) {
                    this.isFavourite = true;
                    console.log('Recipe added to favourites!');
                } else {
                    console.error('Error adding recipe to favourites: ' + response.error);
                }
            } catch (error) {
                console.error('Error:', error);
                console.log('An error occurred while adding the recipe to favourites');
            }
        },
        async removeFromFavourites(recipeId) {
            try {
                const response = await Services.removeFromFavourites(recipeId);
                if (response.ok) {
                    this.isFavourite = false;
                    console.log('Recipe removed from favourites!');
                } else {
                    console.error('Error removing recipe from favourites: ' + response.error);
                }
            } catch (error) {
                console.error('Error:', error);
                console.log('An error occurred while removing the recipe from favourites');
            }
        },
        async checkIfFavourite(recipeId) {
            try {
                const response = await Services.getCurrentUser();
                if (response.ok) {
                    const user = response.user;
                    this.isFavourite = user.favouriteRecipes.includes(Number(recipeId));
                } else {
                    console.error('Error retrieving user information:', response.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        
    }
};
