import services from "../services.js";

export const UnpublishedRecipes = {
  data() {
    return {
      unpRecipes: [],
      batchSizeUnp: 3,
      currentBatchIndexUnp: 0,
      displayedRecipesUnp: [],
      confirmationDialog: false,
      confirmationMessage: "",
      recipeToDeleteOrPublish: null
    };
  },
  methods: {
    async loadUnpRecipes() {
      try {
        const response = await services.getUnpRecipes();
        this.unpRecipes = response.result;
        this.totalUnpRecipes = this.unpRecipes.length;
        this.displayedRecipesUnp = this.unpRecipes.slice(0, this.batchSizeUnp);
        this.currentBatchIndexUnp = this.batchSizeUnp;
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    },
    loadMoreUnpRecipe() {
      const nextBatch = this.unpRecipes.slice(this.currentBatchIndexUnp, this.currentBatchIndexUnp + this.batchSizeUnp);
      this.displayedRecipesUnp = [...this.displayedRecipesUnp, ...nextBatch];
      this.currentBatchIndexUnp += this.batchSizeUnp;
    },
    async confirmPublish(recipe) {
      this.recipeToDeleteOrPublish = recipe;
      this.confirmationMessage = "Are you sure you want to publish this recipe?";
      this.confirmationDialog = true;
    },
    async confirmDelete(recipe) {
      this.recipeToDeleteOrPublish = recipe;
      this.confirmationMessage = "Are you sure you want to delete this recipe?";
      this.confirmationDialog = true;
    },
    async confirmAction() {
      try {
        if (this.confirmationMessage.includes("publish")) {
          await this.publishRecipe(this.recipeToDeleteOrPublish.id);
        } else if (this.confirmationMessage.includes("delete")) {
          await this.deleteRecipe(this.recipeToDeleteOrPublish.id);
        }
        this.loadUnpRecipes();
        this.confirmationDialog = false;
      } catch (error) {
        console.error("Error:", error);
      }
    },
    cancelAction() {
      this.confirmationDialog = false;
    },
    async publishRecipe(recipeId) {
      try {
        const response = await services.publishRecip(recipeId); 
        console.log(response);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error publishing recipe:", error);
      }
    },
    async deleteRecipe(recipeId) {
      try {
        await services.deleteRecipe(recipeId);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  },
  created() {
    this.loadUnpRecipes();
  }
};
