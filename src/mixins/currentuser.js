import Services from "../services.js";

export const CurrentUser = {
    data() {
        return {
            currentUser: null,
            currentUserError: null
        };
    },
    methods: {
        fetchCurrentUser() {
            Services.getCurrentUser()
                .then(data => {
                    this.currentUser = data.user;
                })
                .catch(error => {
                    this.currentUserError = error;
                });
        }
    },
    created() {
        this.fetchCurrentUser();
    }
}
