<template>
  <main class="main" role="main">
    <!--wrap-->
    <div class="wrap clearfix">
      <!--breadcrumbs-->
      <nav class="breadcrumbs">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li>My account</li>
        </ul>
      </nav>
      <!--//breadcrumbs-->

      <!--content-->
      <section class="content">
        <!--row-->
        <div class="row">
          <!--profile left part-->
          <div class="my_account one-fourth">
            <figure>
              <img src="../frontend/images/avatar1.jpg" alt="" />
            </figure>
            <div class="container" v-if="currentUser">
              <h2>{{ currentUser.name }}</h2>
              <div class="quicklinks">
                <div v-if="currentUser.isAdmin === 1">
                <router-link to="/Dashboard" class="button">Admin</router-link>
                <br><br>
                </div>
                <button @click="logout" class="button">Logout</button>
              </div>
            </div>
          </div>
          <!--//profile left part-->

          <div class="three-fourth">
            <nav class="tabs">
              <ul>
                <li :class="{ active: activeTab === 'about' }">
                  <a @click="activeTab = 'about'" href="#about" title="About me">About me</a>
                </li>
                <li :class="{ active: activeTab === 'editprofil' }">
                  <a @click="activeTab = 'editprofil'" href="#editprofil" title="Edit Profil">Edit Profil</a>
                </li>
                <li :class="{ active: activeTab === 'recipes' }">
                  <a @click="activeTab = 'recipes'" href="#recipes" title="My recipes">My recipes</a>
                </li>
                <li :class="{ active: activeTab === 'favorites' }">
                  <a @click="activeTab = 'favorites'" href="#favorites" title="My favorites">My favorites</a>
                </li>
              </ul>
            </nav>

            <!--about-->
            <div class="tab-content" id="about" v-if="activeTab === 'about'">
              <div class="row">
                <dl class="basic two-third" v-if="currentUser">
                  <dt>Name</dt>
                  <dd>{{ currentUser.name }}</dd>
                  <dt>Email</dt>
                  <dd>{{ currentUser.email }}</dd>
                  <dt>Recipes submitted</dt>
                  <dd>{{ totalSubmittedRecipes }}</dd>
                  <dt>Recipes Favourites</dt>
                  <dd>{{ currentUser.favouriteRecipesCount }}</dd>
                </dl>
              </div>
            </div>
            <!--//about-->

            <!--edit profil-->
   <div class="tab-content" id="editprofil" v-if="activeTab === 'editprofil'">
  <div class="entries row">
    <dl class="basic two-third" v-if="currentUser">
      <div class="edit-header">
      <h2>Edit Informations</h2>
    </div>
      <div class="form-group">
        <label for="name">Name :</label>
        <input type="text" id="name" v-model="name" :placeholder="currentUser && currentUser.name ? currentUser.name : ''" />
      </div>
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" :placeholder="currentUser && currentUser.email ? currentUser.email : ''" />
      </div>
    </dl>
    <dl class="basic two-third" v-if="currentUser">
          <div class="edit-header">
      <h2>Edit Password</h2>
    </div>
      <div class="form-group">
        <label for="oldPassword">Old Password :</label>
        <input type="password" id="oldPassword" v-model="oldPassword" />
      </div>
      <div class="form-group">
        <label for="newPassword">New Password :</label>
        <input type="password" id="newPassword" v-model="newPassword" />
      </div>
    </dl>
    <div class="quicklinks">
      <div v-if="updateStatus" :class="updateStatus === 'success' ? 'success-message' : 'error-message'">
                <h3> {{ updateMessage }} </h3>
            </div>
      <button class="button" @click="updateProfile">
        Edit Profile
      </button>
    </div>
  </div>
</div>


            <!--//edit profil-->

            <!--my recipes-->
            <div class="tab-content" id="recipes" v-if="activeTab === 'recipes'">
              <div class="entries row">
                <div v-for="recipe in displayedAuthorRecipes" :key="recipe.id" class="entry one-third">
                  <figure class="entryimg2" v-if="recipe.published === 1">
                    <img :src="recipe.image" alt="" />
                    <figcaption><router-link :to="`/recipe/${recipe.id}`"><i class="icon icon-recetamatch_eye2"></i> <span>View recipe</span></router-link></figcaption>
                  </figure>
                  <figure class="entryimg2" v-if="recipe.published === 0">
                    <img :src="recipe.image" alt="" />
                    <figcaption><i class="icon icon-recetamatch_eye2"></i> <span>Not Published, Waiting for approval</span></figcaption>
                  </figure>
                  <div class="container">
                    <h2 v-if="recipe.published === 1"><router-link :to="`/recipe/${recipe.id}`">{{ recipe.title }}</router-link></h2> 
                    <h2 v-if="recipe.published === 0">{{ recipe.title }}</h2> 
                    <div class="actions">
                      <div>
                        <div class="difficulty"><i class="ico i-medium"></i><a href="#">{{ recipe.difficulty }}</a></div>
                        <div class="likes"><i class="fa fa-heart"></i><a href="#">0</a></div>
                        <div class="comments"><i class="fa fa-comment"></i><a href="#">0</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="quicklinks">
                <button @click="loadMoreAuthorRecipes" class="button">
                  More recipes
                </button>
                <a href="#" class="button scroll-to-top">
                  Back to top
                </a>
              </div>
            </div>
            <!--//my recipes-->

            <!--my favorites-->
            <div class="tab-content" id="favorites" v-if="activeTab === 'favorites' && currentUser">
              <div class="entries row">
                <div v-for="recipe in displayedRecipesFav" :key="recipe.id" class="entry one-third">
                  <figure class="entryimg2">
                    <img :src="recipe.image" alt="" />
                    <figcaption><router-link :to="`/recipe/${recipe.id}`"><i class="icon icon-recetamatch_eye2"></i> <span>View recipe</span></router-link></figcaption>
                  </figure>
                  <div class="container">
                    <h2><router-link :to="`/recipe/${recipe.id}`">{{ recipe.title }}</router-link></h2> 
                    <div class="actions">
                      <div>
                        <div class="difficulty"><i class="ico i-medium"></i><a href="#">{{ recipe.difficulty }}</a></div>
                        <div class="likes"><i class="fa fa-heart"></i><a href="#">0</a></div>
                        <div class="comments"><i class="fa fa-comment"></i><a href="#">0</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="quicklinks">
            <button @click="loadMoreRecipeFav" class="button">
              More recipes
            </button>
            <a href="#" class="button scroll-to-top"
              >Back to top</a
            >
          </div>
            </div>
            <!--//my favorites-->

          </div>
        </div>
        <!--//row-->
      </section>
      <!--//content-->
    </div>
    <!--//wrap-->
  </main>
</template>

<script>
import { CurrentUser } from '../mixins/currentuser.js';
import { Favouriteid } from '../mixins/favouriteid.js';
import { AuthorRecipes } from '../mixins/recipeauthor.js';
import { UserProfile } from '../mixins/updateuser.js';

export default {
  mixins: [CurrentUser, Favouriteid, AuthorRecipes, UserProfile],
  data() {
    return {
      recipes: [],
      activeTab: 'about',
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    async updateProfile() {
    try {
      await this.updateUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }
  },
  watch: {
    currentUser: {
      handler(newVal) {
        if (newVal) {
          this.loadRecipefav();
          this.loadAuthorRecipes();
        }
      },
      immediate: true 
    }
  }
};
</script>

<style scoped>
.edit-header {
  margin-bottom: 5px;
}

.edit-header h2 {
  font-size: 18px;
  font-weight: bold;
}


.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
  background: #FF8E88;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  padding: 0 10px;
  height: 35px;
  line-height: 37px;
  font-size: 13px;
  width: 250px; 
  color: white;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #FF8E88;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.success-message {
  color: green;
  margin-bottom: 10px;
}
</style>