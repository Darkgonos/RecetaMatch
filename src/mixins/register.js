import services from "../services.js";

export const Register = {
    methods: {
        registerUser(userData) {
            return new Promise((resolve, reject) => {
                services.registerUser(userData)
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
