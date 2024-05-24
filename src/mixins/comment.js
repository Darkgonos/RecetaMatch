import services from "../services.js";

export const commentsMixin = {
  data() {
    return {
      comments: [],
      newComment: '',
      recipeId: 1,
      commentError: ''
    };
  },
  methods: {
    async fetchComments(recipeId) {
      try {
        const response = await services.getRecipeComment(recipeId);
        const comments = response.comment;

        for (const comment of comments) {
          try {
            const userResponse = await services.getUserName(comment.author);
            if (userResponse.ok) {
              comment.authorName = userResponse.user.name;
            } else {
              console.error("Error fetching comment author name:", userResponse.error);
              comment.authorName = "Unknown";
            }
          } catch (error) {
            console.error("Error fetching comment author name:", error);
            comment.authorName = "Unknown";
          }
        }

        this.comments = comments;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },

    async deleteComment(commentId) {
      if (!window.confirm("Are you sure you want to delete this comment?")) {
        return;
      }

      try {
        const response = await services.deleteComment(commentId);
        if (response.ok) {
          this.comments = this.comments.filter(comment => comment.id !== commentId);
          console.log("Comment deleted successfully");
        } else {
          console.error("Error deleting comment:", response.error);
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    },

    async addComment() {
      if (!this.newComment.trim()) {
        this.commentError = "Comment cannot be empty.";
        return;
      }

      try {
        const response = await services.addComment(this.newComment, this.recipeId);
        if (response.ok) {
          this.comments.push(response.comment);
          this.newComment = '';
          this.commentError = '';
          window.location.reload();
        } else {
          console.error("Error adding comment:", response.error);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  }
};
