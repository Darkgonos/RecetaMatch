<template>
  <!--main-->
  <main class="main" role="main">
    <!--wrap-->
    <div class="wrap clearfix">
      <!--breadcrumbs-->
      <nav class="breadcrumbs">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/Recipes">Recipes</router-link></li>
          <li>
            <router-link :to="`/Recipes/${category}`">{{ category }}</router-link>
          </li>
          <li>{{ recipeTitle }}</li>
        </ul>
      </nav>
      <!--//breadcrumbs-->

      <!--row-->
      <div class="row">
        <header class="s-title">
          <h1>{{ recipeTitle }}</h1>
        </header>
        <!--content-->
        <section class="content three-fourth">
          <!--recipe-->
          <div class="recipe">
            <div class="row">
              <!--two-third-->
              <article class="two-third">
                <div class="image">
                  <img :src="recipeImage" alt="Recipe Image" />
                </div>
                <div class="intro">
                  <p><strong>Recipe Description :</strong></p>
                  <p>{{ recipeDescription }}</p>
                </div>
                <div class="instructions">
                  <ol>
                    <li v-for="(step, index) in recipeSteps" :key="index">
                      {{ step }}
                    </li>
                  </ol>
                </div>
              </article>
              <!--//two-third-->

              <!--one-third-->
              <article class="one-third">
                <dl class="basic">
                  <dt>Preparation time</dt>
                  <dd>{{ preparationTime }}</dd>
                  <dt>Cooking time</dt>
                  <dd>{{ cookingTime }}</dd>
                  <dt>Difficulty</dt>
                  <dd>{{ difficulty }}</dd>
                </dl>

                <dl class="user">
                  <dt>Category</dt>
                  <dd>{{ category }}</dd>
                  <dt>Posted by</dt>
                  <dd>{{ postedBy }}</dd>
                </dl>

                <dl class="ingredients">
                  <div v-for="(item, index) in ingredients" :key="index">
                  <dt>{{ item.name }}</dt>
                  <dd>{{ item.measure }}</dd>
                  </div>
                </dl>

              </article>
              <!--//one-third-->
            </div>
          </div>
          <!--//recipe-->

          <!-- comments -->
  <div class="comments" id="comments">
    <h2>{{ comments.length }} comments</h2>
    <ol class="comment-list">
      <li class="comment depth-1" v-for="(comment, index) in comments" :key="index">
        <div class="avatar">
          <a href="#"><img src="../frontend/images/avatar1.jpg" alt="" /></a>
        </div>
        <div class="comment-box">
          <div class="comment-author meta">
            <strong>{{ comment.authorName }}</strong> Said on {{ formatDate(comment.createdat) }}
            <div v-if="currentUser">
            <a href="#" class="comment-reply-link" v-if="currentUser.id === comment.author" @click.prevent="deleteComment(comment.id)"> Delete</a>
            </div>
          </div>
          <div class="comment-text">
            <p>{{ comment.comment }}</p>
          </div>
        </div>
      </li>
    </ol>
  </div>
  <!-- //comments -->
             

          <!--respond-->
          <div class="comment-respond" id="respond" v-if="isAuthenticated">
  <h2>Leave a reply</h2>
  <div class="container">
    <p>
      <strong>Add your comment</strong> 
    </p>
    <form @submit.prevent="addComment">
      <div class="f-row">
        <textarea v-model="newComment"></textarea>
        <span class="req">*</span>
      </div>

      <div class="f-row">
        <div class="third bwrap">
          <input type="submit" value="Submit comment" />
        </div>
      </div>
    </form>
     <h3 v-if="commentError" style="color: red; text-align: center;">{{ commentError }}</h3>
  </div>
</div>

          <!--//respond-->
        </section>
        <!--//content-->

        <!--right sidebar-->
        <aside class="sidebar one-fourth">
          <div class="widget share">
            <ul class="boxed">
              <li class="light">
                <a href="#" title="Facebook"
                  ><i class="fa fa-facebook"></i>
                  <span>Share on Facebook</span></a
                >
              </li>
              <li class="medium">
                <a href="#" title="Twitter"
                  ><i class="fa fa-twitter"></i>
                  <span>Share on Twitter</span></a
                >
              </li>
              <li class="dark" v-if="isAuthenticated">
                <a
                  href="#"
                  title="Favourites"
                  v-if="!isFavourite"
                  @click.prevent="addToFavourites(recipeId)"
                >
                  <i class="fa fa-heart"></i> <span>Add to Favourites</span>
                </a>
                <a
                  href="#"
                  title="Favourites"
                  v-else
                  @click.prevent="removeFromFavourites(recipeId)"
                >
                  <i class="fa fa-heart"></i>
                  <span>Remove Favourites</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <!--//right sidebar-->
      </div>
      <!--//row-->
    </div>
    <!--//wrap-->
  </main>
  <!--//main-->
</template>

<script>
import { CurrentUser } from '../mixins/currentuser.js';
import { Recipeid } from "../mixins/recipeid.js";
import { Authentication } from "../mixins/authentication.js";
import favourite from "../mixins/favourite.js";
import { commentsMixin } from "../mixins/comment.js";

export default {
  mixins: [CurrentUser, Recipeid, Authentication, favourite, commentsMixin],
  data() {
    return {
      recipeId: this.$route.params.id,
    };
  },
  methods: {
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      };
      const date = new Date(dateString);
      return `${date.toLocaleDateString('fr-FR', options).split(', ')[0]}`;
    }
  },
    mounted() {
        this.checkIfFavourite(this.recipeId);
    },
    created() {
    this.fetchComments(this.recipeId); 
  }
};
</script>