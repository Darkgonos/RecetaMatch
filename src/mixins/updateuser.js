import services from "../services.js";

export const UserProfile = {
    data() {
        return {
            email: "",
            name: "",
            oldPassword: "",
            newPassword: "",
            updateStatus: null,
            updateMessage: "",
        };
    },
    methods: {
        async updateUserProfile() {
            try {
              const data = {};
              if (this.email) data.email = this.email;
              if (this.name) data.name = this.name;
              if (this.oldPassword) data.oldPassword = this.oldPassword;
              if (this.newPassword) data.newPassword = this.newPassword;
              
          
              const response = await services.updateUser(data);

    if (response.ok) {
      this.updateStatus = "success";
      this.updateMessage = response.message;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      this.updateStatus = "error";
      this.updateMessage = response.error;
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    this.updateStatus = "error";
    this.updateMessage = error.message;
  }
},
    },
};
