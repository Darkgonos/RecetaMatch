import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RecipesView from '../views/RecipesView.vue';
import ContactView from '../views/ContactView.vue';
import LoginView from '../views/LoginView.vue';
import ProfilView from '../views/ProfilView.vue';
import DashboardView from '../views/DashboardView.vue';
import FindRecipe from '../views/FindRecipe.vue';
import FindRecipeIng from '../views/FindRecipeIng.vue';
import FindRecipeName from '../views/FindRecipeName.vue';
import RegisterView from '../views/RegisterView.vue';
import SubmitRecipe from '../views/SubmitRecipe.vue';
import EditRecipe from '../views/EditRecipe.vue';
import RecipeView from '../views/RecipeView.vue';
import RecipescatView from '../views/RecipescatView.vue';
import NotfoundView from '../views/404View.vue';


const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};


const routes = [
  { path: '/', component: HomeView, name: 'Home'},
  { path: '/Recipes', component: RecipesView, name: 'Recipes'},
  { path: '/Contact', component: ContactView, name: 'Contact' },
  { path: '/Sign_in', component: LoginView, name: 'Log in' },
  { path: '/Sign_up', component: RegisterView, name: 'Sign up' },
  { path: '/SubmitRecipe', component: SubmitRecipe, name: 'Add a new recipe', meta: { requiresAuth: true } },
  { path: '/Profil', component: ProfilView, name: 'Profil Page', meta: { requiresAuth: true } },
  { path: '/Editrecipe/:id', component: EditRecipe, name: 'Edit Recipe', meta: { requiresAuth: true } },
  { path: '/Dashboard', component: DashboardView, name: 'Dashboard', meta: { requiresAuth: true } },
  { path: '/FindRecipe', component: FindRecipe, name: 'Search a recipe' },
  { path: '/Recipe/:id', component: RecipeView, name: 'Recipe' },
  { path: '/Recipes/:recipeCat', component: RecipescatView, name: 'Recipes Category'},
  { path: '/FindRecipe/:recipeIng', component: FindRecipeIng, name: 'Search recipes by ingredients' },
  { path: '/FindRecipes/:recipeName', component: FindRecipeName, name: 'Search recipes by Name' },
  { path: '/404', component: NotfoundView, name: 'Page Not Found' },
  { path: '/recipe', redirect: '/recipes'},
  { path: '/:catchAll(.*)', redirect: '/404'},
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthRoute = to.path === '/Sign_in' || to.path === '/Sign_up';
  
  if (requiresAuth && !isAuthenticated()) {
    next({ path: '/Sign_in' });
  } else if (isAuthenticated() && isAuthRoute) {
    next({ path: '/' });
  } else {
    next();
  }
});



export default router;
