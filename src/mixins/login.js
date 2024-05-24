import services from "../services.js";

export const Login = {
    methods: {
        loginUser(userData) {
            return new Promise((resolve, reject) => {
                services.loginUser(userData)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
};