export const Authentication = {
    data() {
        return {
          isAuthenticated: false,
        };
      },
      created() {
        this.checkAuthentication();
      },
      methods: {
        checkAuthentication() {
          this.isAuthenticated = !!localStorage.getItem('token');
        },
      },
};
