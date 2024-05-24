import services from "../services.js";

export const Recipeid = {
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
            ingredients: [],
        };
    },
    mounted() {
        this.loadRecipe();
    },
    methods: {
        async loadRecipe() {
            try {
                const recipeId = this.$route.params.id;
                const response = await services.getRecipeById(recipeId);
                const recipe = response.result[0];
                const authorId = recipe.postedby;

                this.recipeId = recipe.id;
                this.recipeTitle = recipe.title;
                this.recipeDescription = recipe.description;
                this.recipeImage = recipe.image;
                this.recipeSteps = recipe.steps.split('\r\n');
                this.preparationTime = recipe.preptime;
                this.cookingTime = recipe.cookingtime;
                this.difficulty = recipe.difficulty;
                this.category = recipe.category;

                try {
                    const authorResponse = await services.getAuthorName(authorId);
                    if (authorResponse.ok) {
                        this.postedBy = authorResponse.username;
                    } else {
                        console.error("Error fetching author name:", authorResponse.error);
                    }
                } catch (error) {
                    console.error("Error fetching author name:", error);
                }

                this.ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredientKey = 'ingredient' + i;
                    const measureKey = 'measure' + i;
                    if (recipe[ingredientKey]) {
                        this.ingredients.push({ name: recipe[ingredientKey], measure: recipe[measureKey] });
                    }
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
                this.$router.push('/recipes');
            }
        },
    },
};
