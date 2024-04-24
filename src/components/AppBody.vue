<template>
  <body :class="{ 'home': isHomePage, 'errorPage': isErrorPage }">
    <!--header-->
    <header class="head" role="banner">
      <div class="wrap clearfix">
        <router-link to="/" class="logo">
          <img src="../frontend/images/logo.png" alt="RecetaMatch logo" />
        </router-link>
        <nav class="main-nav" role="navigation" id="menu">
          <ul>
            <li :class="{ 'current-menu-item': isHomePage }">
              <router-link to="/">
                <span>Home</span>
              </router-link>
            </li>
            <li :class="{ 'current-menu-item': $route.path === '/Recipes' }">
              <router-link to="/Recipes">
                <span>Recipes</span>
              </router-link>
            </li>
            <li :class="{ 'current-menu-item': $route.path === '/Contact' }">
              <router-link to="/Contact">
                <span>Contact</span>
              </router-link>
            </li>
          </ul>
        </nav>
        <nav class="user-nav" role="navigation">
          <ul>
            <li class="light">
              <router-link to="/FindRecipe">
                <i class="icon icon-recetamatch_search"></i>
                <span>Search a recipe</span>
              </router-link>
            </li>
            <li class="medium">
              <router-link to="/Sign_in">
                <i class="icon icon-recetamatch_chef-hat"></i>
                <span>Sign up / Sign in</span>
              </router-link>
            </li>
            <li class="dark">
              <router-link to="/SubmitRecipe">
                <i class="icon icon-recetamatch_fork-spoon"></i>
                <span>Submit a recipe</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <!--//wrap-->
    </header>
    <!--//header-->
    <router-view />
  </body>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'AppBody',
    data() {
      return {
        isHomePage: false,
        isErrorPage: false,
      };
    },
    watch: {
      '$route'(to, from) {
        this.isHomePage = to.path === '/';
        this.isErrorPage = to.path === '/404';
      },
    },
    created() {
      this.isHomePage = this.$route.path === '/';
      this.isErrorPage = this.$route.path === '/404';
    },
  };

</script>