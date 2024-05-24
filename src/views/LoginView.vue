<template>

<!--main-->
	<main class="main" role="main">
		<!--wrap-->
		<div class="wrap clearfix">
			<!--row-->
			<div class="row">
			<!--content-->
				<section class="content center full-width">
					<div class="modal container">
						<h3>Login</h3>
						<div class="f-row">
							<input type="text" placeholder="Your username" v-model="username" />
						</div>
                        
						<div class="f-row">
							<input type="password" placeholder="Your password" v-model="password"  @keyup.enter="handleLogin"/>
						</div>
						<div v-if="error" class="error">{{ error }}</div>
						<br>
						<div class="f-row bwrap">
							<input type="submit" value="login" @click="handleLogin" />
						</div>
						<p>Dont have an account yet? <router-link to="/Sign_up">Sign up.</router-link></p>
					</div>
				</section>
				<!--//content-->
			</div>
			<!--//row-->
		</div>
		<!--//wrap-->
	</main>
	<!--//main-->
	

</template>

<script>
import { Login } from "../mixins/login.js";

export default {
  mixins: [Login],
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.password) {
        this.error = "All fields are required.";
        return;
      }

      this.error = "";

      this.loginUser({
        username: this.username,
        password: this.password,
      })
      .then((response) => {
        if (response.ok) {
          this.error = "";
          localStorage.setItem("token", response.token);
          window.location.reload();
        } else {
          this.error = response.error;
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
            this.error = "Wrong password or username.";
          } else {
            this.error = "An error occurred while logging in.";
          }
        console.error(error);
      });
    },
  },
};
</script>

<style>
.error {
  color: red;
  font-size: 18px;
  text-align: center;
}
</style>