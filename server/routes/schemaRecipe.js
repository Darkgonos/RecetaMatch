const mongoose = require('mongoose');


const recipesSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    steps: { type: String, required: true },
    preptime: { type: String, required: true },
    cookingtime: { type: String, required: true },
    difficulty: { 
        type: String, 
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    postedby: { type: Number, required: true },
    ingredient1: { type: String, required: true },
    measure1: { type: String, required: true },
    ingredient2: { type: String, required: true },
    measure2: { type: String, required: true },
    ingredient3: { type: String, required: true },
    measure3: { type: String, required: true },
    ingredient4: { type: String, required: false },
    measure4: { type: String, required: false },
    ingredient5: { type: String, required: false },
    measure5: { type: String, required: false },
    ingredient6: { type: String, required: false },
    measure6: { type: String, required: false },
    ingredient7: { type: String, required: false },
    measure7: { type: String, required: false },
    ingredient8: { type: String, required: false },
    measure8: { type: String, required: false },
    ingredient9: { type: String, required: false },
    measure9: { type: String, required: false },
    ingredient10: { type: String, required: false },
    measure10: { type: String, required: false },
    ingredient11: { type: String, required: false },
    measure11: { type: String, required: false },
    ingredient12: { type: String, required: false },
    measure12: { type: String, required: false },
    ingredient13: { type: String, required: false },
    measure13: { type: String, required: false },
    ingredient14: { type: String, required: false },
    measure14: { type: String, required: false },
    ingredient15: { type: String, required: false },
    measure15: { type: String, required: false },
    ingredient16: { type: String, required: false },
    measure16: { type: String, required: false },
    ingredient17: { type: String, required: false },
    measure17: { type: String, required: false },
    ingredient18: { type: String, required: false },
    measure18: { type: String, required: false },
    ingredient19: { type: String, required: false },
    measure19: { type: String, required: false },
    ingredient20: { type: String, required: false },
    measure20: { type: String, required: false },
    createdat: { type: Date, required: true },
    published: { type: Number, required: true }
});


const Recipes = mongoose.model('Recipes', recipesSchema, 'recip');

module.exports = Recipes;

