import services from "../services.js";

export const AuthorRecipes = {
    data() {
        return {
            authorRecipes: [], 
            batchSizeAuthor: 3,
            currentBatchIndexAuthor: 0,
            displayedAuthorRecipes: [],
            totalSubmittedRecipes: 0,
        };
    },
    methods: {
        async loadAuthorRecipes() {
            try {
                if (this.currentUser && this.currentUser.id) {
                    const authorId = this.currentUser.id;
                    const response = await services.getRecipeByAuthor(authorId);
                    this.authorRecipes = response.result; 
                    this.totalSubmittedRecipes = this.authorRecipes.length;

                    this.displayedAuthorRecipes = this.authorRecipes.slice(0, this.batchSizeAuthor); 
                    this.currentBatchIndexAuthor = this.batchSizeAuthor;
                }
            } catch (error) {
                console.error("Error loading recipes by author:", error);
            }
        },

        loadMoreAuthorRecipes() {
            const remainingRecipes = this.authorRecipes.slice(this.currentBatchIndexAuthor);
            const nextBatchIndex = this.currentBatchIndexAuthor + this.batchSizeAuthor;
            
            if (remainingRecipes.length <= this.batchSizeAuthor) {
                this.displayedAuthorRecipes = [...this.displayedAuthorRecipes, ...remainingRecipes];
                this.currentBatchIndexAuthor = this.authorRecipes.length;
            } else {
                const newRecipes = remainingRecipes.slice(0, this.batchSizeAuthor);
                this.displayedAuthorRecipes = [...this.displayedAuthorRecipes, ...newRecipes];
                this.currentBatchIndexAuthor = nextBatchIndex;
            }
        },
    },
};
