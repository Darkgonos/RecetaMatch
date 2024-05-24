<template>
  <main class="main" role="main" v-if="isAllowed">
    <!--wrap-->
    <div class="wrap clearfix">
      <!--breadcrumbs-->
      <nav class="breadcrumbs">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li>Dashboard</li>
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
                <router-link to="/Profil" class="button">Profil</router-link>
                <br><br>
                <button @click="logout" class="button">Logout</button>
              </div>
            </div>
          </div>
          <!--//profile left part-->

          <div class="three-fourth">
            <nav class="tabs">
              <ul>
                <li :class="{ active: activeTab === 'newrecipe' }">
                  <a @click="activeTab = 'newrecipe'" href="#newrecipe" title="Unpublished Recipe">Unpublished Recipe</a>
                </li>
                <li :class="{ active: activeTab === 'allrecipes' }">
                  <a @click="activeTab = 'allrecipes'" href="#allrecipes" title="All Recipes">All Recipes</a>
                </li>
                <li :class="{ active: activeTab === 'posts' }">
                  <a @click="activeTab = 'posts'" href="#posts" title="Posts">Posts</a>
                </li>
                <li :class="{ active: activeTab === 'messages' }">
                  <a @click="activeTab = 'messages'" href="#messages" title="Messages">
                   Messages <span v-if="unreadMessagesCount">({{ unreadMessagesCount }})</span>
                  </a>
                </li>
              </ul>
            </nav>

            <!--New Recipe-->
            <div class="tab-content" id="newrecipe" v-if="activeTab === 'newrecipe'">
             <div class="entries row">
      <div v-for="recipe in displayedRecipesUnp" :key="recipe.id" class="entry one-third">
        <figure class="entryimg2">
          <img :src="recipe.image" alt="" />
          <figcaption>
            <router-link :to="`/recipe/${recipe.id}`">
              <i class="icon icon-recetamatch_eye2"></i>
              <span>View recipe</span>
            </router-link>
          </figcaption>
        </figure>
        <div class="container">
          <h2><router-link :to="`/recipe/${recipe.id}`">{{ recipe.title }}</router-link></h2>
          <center>
          <div class="actions">
            <div>
              <button @click="confirmPublish(recipe)" class="button">Publish</button>
<br><br>
<router-link :to="`/editrecipe/${recipe.id}`" class="button">Edit</router-link>
<br><br>
<button @click="confirmDelete(recipe)" class="button">Delete</button>
            </div>
          </div>
          </center>
        </div>
      </div>
    </div>
    <div class="quicklinks">
      <button @click="loadMoreUnpRecipe" class="button">
        More recipes
      </button>
      <a href="#" class="button scroll-to-top">Back to top</a>
    </div>
    <div v-if="confirmationDialog" class="confirmation-dialog">
  <div class="confirmation-dialog-content">
    <p>{{ confirmationMessage }}</p>
    <div class="confirmation-dialog-buttons">
      <button @click="confirmAction">Confirm</button>
      <button @click="cancelAction">Cancel</button>
    </div>
  </div>
</div>

            </div>
            <!--//New Recipe-->

           <!--All Recipes-->
            <div class="tab-content" id="allrecipes" v-if="activeTab === 'allrecipes'">
              <h3>Search recipe</h3>
    <div class="row">
      <div class="search one-half">
        <input
          type="search"
          placeholder="Find recipe"
          v-model="searchQuery"
          @input="filterRecipes"
        />
      </div>
    </div>
              <div class="entries row">
      <div v-for="recipe in displayedRecipes" :key="recipe.id" class="entry one-third">
        <figure class="entryimg2">
          <img :src="recipe.image" alt="" />
          <figcaption>
            <router-link :to="`/recipe/${recipe.id}`">
              <i class="icon icon-recetamatch_eye2"></i>
              <span>View recipe</span>
            </router-link>
          </figcaption>
        </figure>
        <div class="container">
          <h2><router-link :to="`/recipe/${recipe.id}`">{{ recipe.title }}</router-link></h2>
          <center>
          <div class="actions">
            <div>
<router-link :to="`/editrecipe/${recipe.id}`" class="button">Edit</router-link>
<br><br>
<button @click="confirmDelete(recipe)" class="button">Delete</button>
            </div>
          </div>
          </center>
        </div>
      </div>
    </div>
    <div class="quicklinks">
      <button @click="loadMoreRecipes" class="button">
        More recipes
      </button>
      <a href="#" class="button scroll-to-top">Back to top</a>
    </div>
    <div v-if="confirmationDialog" class="confirmation-dialog">
  <div class="confirmation-dialog-content">
    <p>{{ confirmationMessage }}</p>
    <div class="confirmation-dialog-buttons">
      <button @click="confirmAction">Confirm</button>
      <button @click="cancelAction">Cancel</button>
    </div>
  </div>
</div>

            </div>
            <!--//All Recipes-->

            <!--Posts-->
            <div class="tab-content" id="posts" v-if="activeTab === 'posts'">
              <div class="row">
                
              </div>
            </div>
            <!--//Posts-->

             <!--Messages-->
  <div class="tab-content" id="messages" v-if="activeTab === 'messages'">
    <div class="row">
      <div class="container box">
        <h2>Table</h2>
        <table>
          <tr>
            <th>From</th>
            <th>Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr v-for="message in displayedMessages" :key="message.id" :class="{'noread': message.readit === 0}">
            <td>{{ message.name }} <br><br> {{ message.email }} </td>
            <td>{{ message.message }}</td>
            <td>{{ new Date(message.createdat).toLocaleString() }}</td>
            <td>
              <center>
                <button class="button" @click="markMessageAsRead(message)" v-if="message.readit === 0">
                  Mark as Read
                </button>
                <br><br>
                <button class="button" @click="deleteMessage(message.id)">
                  Delete
                </button>
              </center>
            </td>
          </tr>
        </table>
        <br><br>
        <center>
          <button class="button" @click="loadMore">
            Read More
          </button>
        </center>
        <br><br>
      </div>
    </div>
  </div>
  <!--//Messages-->

            <!--//Messages-->

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
import { UnpublishedRecipes } from '../mixins/unprecipes.js';
import { loads } from "../mixins/loads.js";
import { messagesMixin } from "../mixins/message.js";

export default {
  mixins: [CurrentUser, UnpublishedRecipes, loads, messagesMixin],
  data() {
    return {
      activeTab: 'newrecipe',
      isAllowed: true,
      searchQuery: "",
    };
  },
  mounted() {
    this.checkAdminAccess();
  },
  updated() {
    this.checkAdminAccess();
  },
  methods: {
    checkAdminAccess() {
      if (this.currentUser && this.currentUser.isAdmin !== 1) {
        this.isAllowed = false;
        this.$router.push('/');
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    filterRecipes() {
      if (this.searchQuery.trim() === "") {
        this.displayedRecipes = this.recipes.slice(0, this.batchSize);
        this.currentBatchIndex = 0;
      } else {
        const query = this.searchQuery.toLowerCase();
        this.displayedRecipes = this.recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(query)
        );
      }
    },
  },
};
</script>

<style scoped>
.confirmation-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.confirmation-dialog-content {
  text-align: center;
}

.confirmation-dialog-buttons {
  margin-top: 20px;
}

.confirmation-dialog-buttons button {
  margin: 0 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.confirmation-dialog-buttons button:first-child {
  background-color: #007bff;
  color: #fff;
}

.confirmation-dialog-buttons button:last-child {
  background-color: #dc3545;
  color: #fff;
}

</style>