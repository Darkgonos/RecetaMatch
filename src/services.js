import axios from 'axios';

const API_URL = '/api';

class services {

    static getRecipes() {
        return axios.get(`${API_URL}/recipes`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getUnpRecipes() {
        return axios.get(`${API_URL}/unrecipes`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getLastRecipe() {
        return axios.get(`${API_URL}/recipes/last`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getLastSixRecipe() {
        return axios.get(`${API_URL}/recipes/last6`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getSixRecipe() {
        return axios.get(`${API_URL}/recipes/hasard`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getRecipeById(recipeId) {
        return axios.get(`${API_URL}/recipe/${recipeId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }


    static getRecipeByAuthor(authorId) {
        return axios.get(`${API_URL}/recipeauthor/${authorId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getRecipeByCat(recipeCat) {
        return axios.get(`${API_URL}/category/${recipeCat}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getRecipeByIng(recipeIng) {
        return axios.get(`${API_URL}/ingredient/${recipeIng}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getRecipeByName(recipeName) {
        return axios.get(`${API_URL}/recipename/${recipeName}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getAuthorName(authorId) {
        return axios.get(`${API_URL}/author/${authorId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static postRecipe(recipeData) {
        return axios.post(`${API_URL}/recipe`, recipeData)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            if (error.response) {
              return error.response.data;
            } else if (error.request) {
              throw new Error('No response received from the server');
            } else {
              throw new Error('Error setting up the request');
            }
          });
      }

      static editRecip(recipeId, recipeData) {
        return axios.put(`${API_URL}/recipe/${recipeId}`, recipeData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }
    
      static deleteRecipe(recipeId) {
        return axios.delete(`${API_URL}/recipe/${recipeId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static publishRecip(recipeId) {
        return axios.put(`${API_URL}/unrecipes/${recipeId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static registerUser(userData) {
        return axios.post(`${API_URL}/register`, userData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static loginUser(userData) {
        return axios.post(`${API_URL}/login`, userData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static updateUser(data) {
        return axios.put(`${API_URL}/updateUser`, data)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            if (error.response) {
              return error.response.data;
            } else if (error.request) {
              throw new Error('No response received from the server');
            } else {
              throw new Error('Error setting up the request');
            }
          });
      }
    

    static getCurrentUser() {
        return axios.get(`${API_URL}/CurrentUser`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static addToFavourites(recipeId) {
        return axios.post(`${API_URL}/addToFavourites`, { recipeId })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static removeFromFavourites(recipeId) {
        return axios.post(`${API_URL}/removeFromFavourites`, { recipeId })
             .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getUserName(userId) {
        return axios.get(`${API_URL}/User/${userId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static getRecipeComment(recipeId) {
        return axios.get(`${API_URL}/Commentrec/${recipeId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static deleteComment(commentId) {
        return axios.delete(`${API_URL}/Comment/${commentId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }
    
    static addComment(comment, recipid) {
        return axios.post(`${API_URL}/Comment`, { comment, recipid })
          .then(response => {
            return response.data;
          })
          .catch(error => {
            throw error;
          });
      }
      
    static addMessage(messageData) {
        return axios.post(`${API_URL}/Message`, messageData)
            .then(response => response.data)
            .catch(error => { throw error; });
    }

    static getMessage() {
            return axios.get(`${API_URL}/Message`)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    throw error;
                });
    }


    static deleteMessage(messageID) {
        return axios.delete(`${API_URL}/Message/${messageID}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    static markMessageAsRead(messageID) {
        return axios.put(`${API_URL}/Message/${messageID}/read`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
      }
    
}

export default services;
