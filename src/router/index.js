import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RecipesView from '../views/RecipesView.vue';
import ContactView from '../views/ContactView.vue';
import LoginView from '../views/LoginView.vue';
import FindRecipe from '../views/FindRecipe.vue';
import RegisterView from '../views/RegisterView.vue';
import SubmitRecipe from '../views/SubmitRecipe.vue';
import RecipeView from '../views/RecipeView.vue';
import NotfoundView from '../views/404View.vue';

const routes = [
  { path: '/', component: HomeView, name: 'Home'},
  { path: '/Recipes', component: RecipesView, name: 'Recipes'},
  { path: '/Contact', component: ContactView, name: 'Contact' },
  { path: '/Sign_in', component: LoginView, name: 'Log in' },
  { path: '/Sign_up', component: RegisterView, name: 'Sign up' },
  { path: '/SubmitRecipe', component: SubmitRecipe, name: 'Add a new recipe' },
  { path: '/FindRecipe', component: FindRecipe, name: 'Search a recipe' },
  { path: '/Recipe', component: RecipeView, name: 'Recipe' },
  { path: '/404', component: NotfoundView, name: 'Page Not Found' },
  { path: '/:catchAll(.*)', redirect: '/404'}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
