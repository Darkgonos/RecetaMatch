const express = require('express');
const Recipes = require('../schemaRecipe');
const User = require('../schemaUser');
const Comment = require('../schemaComment');
const Message = require('../schemaMessage');
const protectRoute = require('../authorization');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const api = express.Router();

dotenv.config();

// Middleware to extract user from token for all routes
api.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET, (err, decoded) => {
            if (!err) {
                User.findOne({ username: decoded.login })
                    .then(user => {
                        if (user) {
                            req.user = user;
                        }
                        next();
                    })
                    .catch(error => {
                        console.error("Error finding user:", error);
                        next();
                    });
            } else {
                next();
            }
        });
    } else {
        next();
    }
});

// Get all published recipes
api.get('/recipes', (req, res) => {
    Recipes.find({ published: 1 }) 
        .then(result => {
            res.status(200).send({ ok: true, result: result });
        })
        .catch(error => {
            res.status(400).send({ ok: false, error: "Error reading published recipes" });
        });
});

// Get all unpublished recipes
api.get('/unrecipes', protectRoute("admin"), (req, res) => {
    Recipes.find({ published: 0 }) 
        .then(result => {
            res.status(200).send({ ok: true, result: result });
        })
        .catch(error => {
            res.status(400).send({ ok: false, error: "Error reading unpublished recipes" });
        });
});


// Get recipe by id 
api.get('/recipe/:id', async (req, res) => {
    try {
        let recipeId = req.params.id;
        let query = { id: recipeId, published: 1 };

        if (req.user && req.user.role === 'admin') {
            query = { id: recipeId };
        }

        const result = await Recipes.find(query);

        if (result.length > 0) {
            res.status(200).send({ ok: true, result: result });
        } else {
            res.status(400).send({ ok: false, error: "The recipe doesn't exist or is not published" });
        }
    } catch (error) {
        res.status(400).send({ ok: false, error: "Error searching the recipe" });
    }
});



// Get recipe by author 
api.get('/recipeauthor/:id', protectRoute("user"), (req, res) => {
    let authorId = req.params.id;
    Recipes.find({"postedby":authorId})
        .then(result => {
            if (result.length > 0)
                res.status(200).send({ ok: true, result: result });
            else
                res.status(400).send({ ok: false, error: "The recipe doesn't exist" });
        })
        .catch(error => {
            res.status(400).send({ ok: false, error: "Error searching the recipe" });
        });
});

// Get author name
api.get('/author/:id', (req, res) => {
    let authorId = req.params.id;
    User.findOne({ id: authorId }, 'username')
        .then(result => {
            if (result)
                res.status(200).send({ ok: true, username: result.username });
            else
                res.status(400).send({ ok: false, error: "The user doesn't exist" });
        })
        .catch(error => {
            res.status(400).send({ ok: false, error: "Error searching the user" });
        });
});




// Insert new recipe 
api.post('/recipe', protectRoute("user"), (req, res) => {
    const {
        title, description, image, category, steps, preptime, cookingtime, difficulty, postedby,
        ingredient1, measure1, ingredient2, measure2, ingredient3, measure3, ingredient4 = "",
        measure4 = "",ingredient5 = "",measure5 = "",ingredient6 = "",measure6 = "",ingredient7 = "",
        measure7 = "",ingredient8 = "",measure8 = "",ingredient9 = "",measure9 = "",ingredient10 = "",
        measure10 = "",ingredient11 = "",measure11 = "",ingredient12 = "",measure12 = "",ingredient13 = "",
        measure13 = "",ingredient14 = "",measure14 = "",ingredient15 = "",measure15 = "",ingredient16 = "",
        measure16 = "",ingredient17 = "",measure17 = "",ingredient18 = "",measure18 = "",ingredient19 = "",
        measure19 = "",ingredient20 = "",measure20 = ""
    } = req.body;

        if (!title || !description || !image || !category || !steps || !preptime ||
            !cookingtime || !difficulty || !postedby || !ingredient1 || !measure1 ||
            !ingredient2 || !measure2 || !ingredient3 || !measure3) {
            return res.status(400).json({ ok: false, error: 'All required fields must be completed' });
          }
    
    const newRecipe = new Recipes({
            title,description,image,category,steps,preptime,cookingtime,difficulty,postedby,
            ingredient1,measure1,ingredient2,measure2,ingredient3,measure3,ingredient4,measure4,
            ingredient5,measure5,ingredient6,measure6,ingredient7,measure7,ingredient8,measure8,
            ingredient9,measure9,ingredient10,measure10,ingredient11,measure11,ingredient12,measure12,
            ingredient13,measure13,ingredient14,measure14,ingredient15,measure15,ingredient16,measure16,
            ingredient17,measure17,ingredient18,measure18,ingredient19,measure19,ingredient20,measure20,
            id: null,createdat: new Date(), published: 0
            });

    Recipes.findOne().sort({ id: -1 }).then(lastRecipe => {
        let newId = 1;
        if (lastRecipe) {
            newId = lastRecipe.id + 1;
        }

        newRecipe.id = newId;

        newRecipe.save()
            .then(result => {
                res.status(201).send({ ok: true, message: "Recipe added successfully", result: result });
            })
            .catch(error => {
                res.status(400).send({ ok: false, error: "Error adding the recipe", details: error });
            });
    }).catch(error => {
        res.status(400).send({ ok: false, error: "Error finding the last recipe", details: error });
    });
});


// Update existing recipe
api.put('/recipe/:id', protectRoute("admin"), (req, res) => {
    const recipeId = req.params.id;

    const {
        title, description, image, category, steps, preptime, cookingtime, difficulty,
        ingredient1, measure1, ingredient2, measure2, ingredient3, measure3, ingredient4 = "",
        measure4 = "",ingredient5 = "",measure5 = "",ingredient6 = "",measure6 = "",ingredient7 = "",
        measure7 = "",ingredient8 = "",measure8 = "",ingredient9 = "",measure9 = "",ingredient10 = "",
        measure10 = "",ingredient11 = "",measure11 = "",ingredient12 = "",measure12 = "",ingredient13 = "",
        measure13 = "",ingredient14 = "",measure14 = "",ingredient15 = "",measure15 = "",ingredient16 = "",
        measure16 = "",ingredient17 = "",measure17 = "",ingredient18 = "",measure18 = "",ingredient19 = "",
        measure19 = "",ingredient20 = "",measure20 = ""
    } = req.body;

    if (!title || !description || !image || !category || !steps || !preptime ||
        !cookingtime || !difficulty || !ingredient1 || !measure1 ||
        !ingredient2 || !measure2 || !ingredient3 || !measure3) {
        return res.status(400).json({ ok: false, error: 'All required fields must be completed' });
    }


    Recipes.findOneAndUpdate(
        { id: recipeId },
        {
            title, description, image, category, steps, preptime, cookingtime, difficulty,
            ingredient1, measure1, ingredient2, measure2, ingredient3, measure3, ingredient4, measure4,
            ingredient5, measure5, ingredient6, measure6, ingredient7, measure7, ingredient8, measure8,
            ingredient9, measure9, ingredient10, measure10, ingredient11, measure11, ingredient12, measure12,
            ingredient13, measure13, ingredient14, measure14, ingredient15, measure15, ingredient16, measure16,
            ingredient17, measure17, ingredient18, measure18, ingredient19, measure19, ingredient20, measure20,
        },
        { new: true } 
    )
        .then(updatedRecipe => {
            if (!updatedRecipe) {
                return res.status(404).json({ ok: false, error: "Recipe not found" });
            }
            res.status(200).json({ ok: true, message: "Recipe updated successfully", result: updatedRecipe });
        })
        .catch(error => {
            res.status(400).json({ ok: false, error: "Error updating the recipe", details: error });
        });
});



// Delete recipe by id 
api.delete('/recipe/:id', protectRoute("admin"), (req, res) => {
    let recipeId = req.params.id;
    Recipes.findOneAndDelete({"id": recipeId})
        .then(result => {
            if (result)
                res.status(200).send({ ok: true, message: "Recipe deleted successfully" });
            else
                res.status(404).send({ ok: false, error: "The recipe doesn't exist" });
        })
        .catch(error => {
            res.status(400).send({ ok: false, error: "Error deleting the recipe" });
        });
});


// Publish an existing recipe
api.put('/unrecipes/:id', protectRoute("admin"), async (req, res) => {
    try {
      const recipeId = req.params.id;
  
      const updatedRecipe = await Recipes.findOneAndUpdate(
        { id: recipeId },
        { published: 1 },
        { new: true }
      );
  
      if (!updatedRecipe) {
        return res.status(404).json({ ok: false, error: 'Recipe not found' });
      }
  
      res.status(200).json({ ok: true, message: 'Recipe published successfully', result: updatedRecipe });
    } catch (error) {
      console.error('Error publishing recipe:', error);
      res.status(500).json({ ok: false, error: 'Internal server error' });
    }
  });


// Get recipe by name
api.get('/recipename/:name', (req, res) => {
    let recipeName = req.params.name.toLowerCase(); 
    const regex = new RegExp(`.*${recipeName}.*`, 'i');
  
    Recipes.find({ title: regex, published: 1 }) 
      .then(result => {
        if (result.length > 0) {
          res.status(200).send({ ok: true, result: result });
        } else {
          res.status(400).send({ ok: false, error: "The recipe doesn't exist or is not published" });
        }
      })
      .catch(error => {
        res.status(400).send({ ok: false, error: "Error searching the recipe" });
      });
});

// Get last recipe by date
api.get('/recipes/last', (req, res) => {
    Recipes.find({ published: 1 }) 
        .sort({ createdat: -1 })
        .limit(1)
        .then(result => {
            res.status(200).send({ ok: true, result: result });
        })
        .catch(error => {
            res.status(400).send({ ok: false, error: "Error reading recipes" });
        });
});

// Get 6 last recipes by date 
api.get('/recipes/last6', (req, res) => {
    Recipes.find({ published: 1 }) 
        .sort({ createdat: -1 })
        .limit(6)
        .then(result => {
            res.status(200).send({ ok: true, result: result });
        })
        .catch(error => {
            res.status(400).send({ ok: false, error: "Error reading recipes" });
        });
});

// Get 6 recipes at random
api.get('/recipes/hasard', (req, res) => {
    Recipes.aggregate([
        { $match: { published: 1 } },
        { $sample: { size: 6 } }
    ])
    .then(result => {
        res.status(200).send({ ok: true, result: result });
    })
    .catch(error => {
        res.status(400).send({ ok: false, error: "Error reading recipes" });
    });
});



// Get recipe by category
api.get('/category/:category', (req, res) => {
    let recipeCategory = req.params.category.toLowerCase(); 
    Recipes.find({ category: { $regex: new RegExp("^" + recipeCategory + "$", "i") }, published: 1 }) 
        .then(result => {
            if (result.length > 0)
                res.status(200).send({ ok: true, result: result });
            else
                res.status(400).send({ ok: false, error: "The category doesn't exist or has no published recipes" });
        })
        .catch(error => {
            res.status(400).send({ ok: false, error: "Error searching the category" });
        });
});


// Get recipe by ingredient
api.get('/ingredient/:ingredient', async (req, res) => {
    try {
        let searchIngredients = req.params.ingredient.split(',').map(ing => ing.trim().toLowerCase());
    

        let searchPromises = searchIngredients.map(ingredient => {
            return Recipes.find({ $or: [
                    { ingredient1: { $regex: `\\b${ingredient}\\b`, $options: 'i' } },
                    { ingredient2: { $regex: `\\b${ingredient}\\b`, $options: 'i' } },
                    { ingredient3: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient4: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient5: { $regex: `\\b${ingredient}\\b`, $options: 'i' } },
                    { ingredient6: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient7: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient8: { $regex: `\\b${ingredient}\\b`, $options: 'i' } },
                    { ingredient9: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient10: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient11: { $regex: `\\b${ingredient}\\b`, $options: 'i' } },
                    { ingredient12: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient13: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient14: { $regex: `\\b${ingredient}\\b`, $options: 'i' } },
                    { ingredient15: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient16: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient17: { $regex: `\\b${ingredient}\\b`, $options: 'i' } },
                    { ingredient18: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient19: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }, 
                    { ingredient20: { $regex: `\\b${ingredient}\\b`, $options: 'i' } }], published: 1
                    }).exec();
        });

        let results = await Promise.all(searchPromises);

        let commonRecipes = results.reduce((common, current) => {
            return common.filter(recipe => current.some(item => item._id.toString() === recipe._id.toString()));
        });

        if (commonRecipes.length > 0) {
            res.status(200).send({ ok: true, result: commonRecipes });
        } else {
            res.status(400).send({ ok: false, error: "No recipes found with the provided ingredients" });
        }
    } catch (error) {
        res.status(400).send({ ok: false, error: "Error searching by ingredient" });
    }
});



// ---------------------------------------------- USER API ----------------------------------------------

// Register new user
api.post('/register', async (req, res) => {
    const {
        username, password, email, name, role, profilepic, favouriteRecipes
    } = req.body;
    
    if (password.length < 8) {
        return res.status(400).json({ ok: false, error: "The password must have at least 8 characters" });
    }
    
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ ok: false, error: "This email or username is already registered" });
        }

        const lastUser = await User.findOne().sort({ id: -1 }).exec();
        let newId = 1;
        if (lastUser) {
            newId = lastUser.id + 1;
        }
        
        const hash = await bcrypt.hash(password, 10);
        
        if (!username || !password || !email) {
            return res.status(400).json({ ok: false, error: 'All required fields must be completed' });
        }
        
        const newUser = new User({
            id: newId, username, password: hash, email, name: username, role, profilepic, favouriteRecipes
        });
        
        const result = await newUser.save();
        
        newUser.password = "SECRET";
        
        res.status(201).json({ ok: true, message: "User registered successfully", result: result });
    } catch (error) {
        res.status(400).json({ ok: false, error: "Error saving user to database", details: error });
    }
});


// Generate login token and api for login
let generateToken = login => {
    return jwt.sign({login: login}, process.env.TOKEN_SECRET, {expiresIn: "24 hours"});
    };
    
    api.post('/login', (req, res) => {
        const { username, password } = req.body;
    
        User.findOne({ username })
            .then(result => {
                if (result) {
                    if (bcrypt.compareSync(password, result.password)) {
                        const token = generateToken(username);
                        res.status(200).json({ ok: true, token }); 
                    } else {
                        res.status(409).json({ ok: false, error: "Wrong password or username" }); 
                    }
                } else {
                    res.status(409).json({ ok: false, error: "Wrong password or username" });
                }
            })
            .catch(error => {
                res.status(400).json({ ok: false, error: "Login error: " + error }); 
            });
    });



// Update User 
api.put('/updateUser', protectRoute("user"), async (req, res) => {
    try {
        const user = req.user;
        const { email, name, oldPassword, newPassword } = req.body;

        if (!email && !name && !newPassword) {
            return res.status(400).json({ ok: false, error: "No data provided for update" });
        }

        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(409).json({ ok: false, error: "This email is already registered" });
            }
            user.email = email;
        }

        if (name && name !== user.name) {
            user.name = name;
        }

        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({ ok: false, error: 'Old password is required to set a new password' });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ ok: false, error: 'Old password is incorrect' });
            }

            if (newPassword.length < 8) {
                return res.status(400).json({ ok: false, error: 'The new password must have at least 8 characters' });
            }

            user.password = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await user.save();

        updatedUser.password = "SECRET";

        res.status(200).json({ ok: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ ok: false, error: "Error updating user information", details: error });
    }
});


// Get Current User 
api.get('/CurrentUser', protectRoute("user"), async (req, res) => {
    try {
        const user = req.user;
        const favouriteRecipesCount = user.favouriteRecipes.length;
        let responseData = {
            id: user.id,
            name: user.name,
            email: user.email,
            favouriteRecipes: user.favouriteRecipes,
            favouriteRecipesCount
        };

        if (user.role === 'admin') {
            responseData.isAdmin = 1;
        }

        res.status(200).json({ ok: true, user: responseData });
    } catch (error) {
        res.status(500).json({ ok: false, error: "Error retrieving user information", details: error });
    }
});


// Get User name and profilepic by ID
api.get('/User/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findOne({"id":userId});
  
      if (!user) {
        return res.status(404).json({ ok: false, error: 'User not found' });
      }
  
      const userInfo = {
        name: user.name,
        profilepic: user.profilepic
      };
  
      res.status(200).json({ ok: true, user: userInfo });
    } catch (error) {
      res.status(500).json({ ok: false, error: "Error retrieving user information", details: error });
    }
  });




// Add a recipe to favourite
api.post('/addToFavourites', protectRoute("user"), async (req, res) => {
    try {
        const userId = req.user.id;
        const recipeId = req.body.recipeId;

        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ ok: false, error: 'User not found' });
        }

        if (!user.favouriteRecipes) {
            user.favouriteRecipes = [];
        }

        if (user.favouriteRecipes.includes(recipeId)) {
            return res.status(400).json({ ok: false, error: 'Recipe already in favourites' });
        }

        user.favouriteRecipes.push(recipeId);
        await user.save();

        res.status(200).json({ ok: true, message: 'Recipe added to favourites' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ ok: false, error: 'Error adding recipe to favourites', details: error });
    }
});


// Remove recipe from favourite
api.post('/removeFromFavourites', protectRoute("user"), async (req, res) => {
    try {
        const userId = req.user.id;
        const recipeId = req.body.recipeId;

        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ ok: false, error: 'User not found' });
        }

        const index = user.favouriteRecipes.indexOf(recipeId);
        if (index === -1) {
            return res.status(400).json({ ok: false, error: 'Recipe not found in favourites' });
        }

        user.favouriteRecipes.splice(index, 1);
        await user.save();

        res.status(200).json({ ok: true, message: 'Recipe removed from favourites' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ ok: false, error: 'Error removing recipe from favourites', details: error });
    }
});


// ---------------------------------------------- COMMENT API ----------------------------------------------

// Create a new comment
api.post('/Comment', protectRoute("user"), async (req, res) => {
    try {
      const { comment, recipid } = req.body;
      const author = req.user.id;
  
      if (!comment) {
        return res.status(400).json({ ok: false, error: 'Missing required fields' });
      }
      
      const lastComment = await Comment.findOne().sort({ id: -1 });
      const newId = lastComment ? lastComment.id + 1 : 1;

      const newComment = new Comment({
        id:newId,
        comment,
        recipid,
        author,
        createdat: new Date()
      });
 
      await newComment.save(); 
      res.status(201).json({ ok: true, comment: newComment });
    } catch (error) {
      res.status(500).json({ ok: false, error: "Error creating comment", details: error.message });
    }
  });

// Get comments by recipe ID
api.get('/Commentrec/:id', async (req, res) => {
    try {
      const recipeId = req.params.id;
  
      const comment = await Comment.find({ recipid: recipeId }).sort({ createdat: -1 });
  
      if (comment.length === 0) {
        return res.status(404).json({ ok: false, error: 'Comments not found' });
      }
  
      const commentInfo = comment.map(comment => ({
        id: comment.id,
        comment: comment.comment,
        recipid: comment.recipid,
        author: comment.author,
        createdat: comment.createdat
      }));
  
      res.status(200).json({ ok: true, comment: commentInfo });
    } catch (error) {
      res.status(500).json({ ok: false, error: "Error retrieving comments information", details: error });
    }
  });


// Delete comment by id
api.delete('/Comment/:id', protectRoute("user"), async (req, res) => {
    try {
      const commentId = req.params.id;
      const userId = req.user.id;
  
      const comment = await Comment.findOne({ id: commentId });
  
      if (!comment) {
        return res.status(404).send({ ok: false, error: "The comment doesn't exist" });
      }
  
      if (comment.author !== userId) {
        return res.status(403).send({ ok: false, error: "You are not authorized to delete this comment" });
      }
  
      await Comment.findOneAndDelete({ id: commentId });
      res.status(200).send({ ok: true, message: "Comment deleted successfully" });
    } catch (error) {
      res.status(400).send({ ok: false, error: "Error deleting the comment", details: error });
    }
  });
  
// ---------------------------------------------- MESSAGE API ----------------------------------------------

// Create a new message
api.post('/Message', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const lastMessage = await Message.findOne().sort({ id: -1 });
        const newId = lastMessage ? lastMessage.id + 1 : 1;

        const newMessage = new Message({
            id: newId,
            name,
            email,
            message,
            readit: 0,
            createdat: new Date()
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving message' });
    }
});


// Get all Messages
api.get('/Message', protectRoute("admin"), async (req, res) => {
    try {
      const messages = await Message.find().sort({ createdat: -1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching messages' });
    }
  });

// Delete recipe by id 
api.delete('/Message/:id', protectRoute("admin"), (req, res) => {
    let messageId = req.params.id;
    Message.findOneAndDelete({"id": messageId})
        .then(result => {
            if (result)
                res.status(200).send({ ok: true, message: "Message deleted successfully" });
            else
                res.status(404).send({ ok: false, error: "The Message doesn't exist" });
        })
        .catch(error => {
            res.status(400).send({ ok: false, error: "Error deleting the Message" });
        });
});


// Update message read status
api.put('/Message/:id/read', protectRoute("admin"), async (req, res) => {
    const messageId = req.params.id;
  
    try {
      const message = await Message.findOneAndUpdate({ id: messageId }, { readit: 1 }, { new: true });
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: "Error updating message read status" });
    }
  });
  

module.exports = api;