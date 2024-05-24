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
            <h3>Register</h3>
            <div class="f-row">
              <input
                type="text"
                placeholder="Your username"
                v-model="username"
              />
            </div>
            <div class="f-row">
              <input type="email" placeholder="Your email" v-model="email" />
            </div>
            <div class="f-row">
              <input
                type="password"
                placeholder="Your password"
                v-model="password"
              />
            </div>
            <div class="f-row">
              <input
                type="password"
                placeholder="Retype password"
                v-model="confirmPassword"
              />
            </div>
            <div v-if="error" class="error">{{ error }}</div>
            <div v-if="successMessage" class="successMessage">
              {{ successMessage }}
            </div>
            <div v-if="successMessage">
              You Will be redirect to login page in 5 secondes
            </div>
            <br />
            <div class="f-row bwrap">
              <input type="submit" value="Register" @click="handleRegister" />
            </div>
            <p>
              Already have an account yet?
              <router-link to="/Sign_in">Log in.</router-link>
            </p>
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
import { Register } from "../mixins/register.js";

export default {
  mixins: [Register],
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      successMessage: "",
    };
  },
  methods: {
    handleRegister() {
      if (this.password.length < 8) {
        this.error = "The password must have at least 8 characters.";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.error = "Please enter a valid email address.";
        return;
      }

      if (
        !this.username ||
        !this.email ||
        !this.password ||
        !this.confirmPassword
      ) {
        this.error = "All fields are required.";
        return;
      }

      this.error = "";

      this.registerUser({
        username: this.username,
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.successMessage = "User registered successfully.";
          setTimeout(() => {
            this.$router.push("/Sign_in");
          }, 5000);
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            this.error = "User already registered.";
          } else {
            this.error = "An error occurred while registering the user.";
          }
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
.successMessage {
  color: green;
  font-size: 18px;
  text-align: center;
}
</style>