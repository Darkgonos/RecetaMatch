<template>
  <footer class="foot" role="contentinfo">
    <div class="wrap clearfix">
      <div class="row">
        <article class="one-half">
          <h5>About RecetaMatch</h5>
          <p>
            RecetaMatch is the ultimate culinary community platform, where recipes come to life. Wondering what you'll gain by joining us? Let us give you a taste.
            By joining us, you will have the chance to make new friendships and share delicious recipes. Get ready to discover a world of flavors and conviviality!
          </p>
        </article>
        <article class="one-fourth">
          <h5>Need help?</h5>
          <p>Contact us via phone or email</p>
          <p>
            <em>T:</em> +34 6 66 66 66 66<br />
            <em>E:</em> <a href="#">Contact@recetamatch.com</a>
          </p>
        </article>
        <article class="one-fourth">
          <h5>Follow us</h5>
          <ul class="social">
            <li>
              <a href="#" title="facebook"><i class="fa fa-fw fa-facebook"></i></a>
            </li>
            <li>
              <a href="#" title="youtube"><i class="fa fa-fw fa-youtube"></i></a>
            </li>
            <li>
              <a href="#" title="twitter"><i class="fa fa-fw fa-twitter"></i></a>
            </li>
          </ul>
        </article>
        <div class="bottom">
          <p class="copy">Copyright 2024 RecetaMatch. All rights reserved</p>
          <nav class="foot-nav">
            <ul>
              <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/Recipes">Recipes</router-link></li>                  
                 <li><router-link to="/Contact">Contact</router-link></li>                 
              
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import '../frontend/js/jquery-3.7.1.min.js';
import '../frontend/js/jquery.uniform.min.js';
import '../frontend/js/jquery.slicknav.min.js';
import '../frontend/js/scripts.js';
import '../frontend/js/home.js';
import '../frontend/js/e808bf9397.js';

export default {
  name: 'AppFooter',
}
</script>