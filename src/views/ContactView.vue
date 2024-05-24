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
            <form @submit.prevent="handleSubmit" name="contactform" id="contactform">
              <h3>Contact us</h3>
              <div v-if="currentUser">
                <h4>Hello <strong>{{ currentUser.name }}</strong>, <br>Feel free to contact us</h4>
              </div>
              <div v-else>
                <div class="f-row">
                  <input type="text" placeholder="Your name" v-model="form.name" />
                </div>
                <div class="f-row">
                  <input type="email" placeholder="Your email" v-model="form.email" />
                </div>
              </div>
              <div class="f-row">
                <textarea placeholder="Your message" v-model="form.message"></textarea>
              </div>
              <div class="f-row bwrap">
                <input type="submit" value="Send message" />
              </div>
            </form>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
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
import { CurrentUser } from '../mixins/currentuser.js';
import { messagesMixin } from '../mixins/message.js';

export default {
  mixins: [CurrentUser, messagesMixin],
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      const messageData = this.currentUser ? {
        name: this.currentUser.name,
        email: this.currentUser.email,
        message: this.form.message
      } : this.form;

      if (!messageData.name || !messageData.email || !messageData.message) {
        this.errorMessage = 'All fields are required';
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(messageData.email)) {
        this.errorMessage = 'Invalid email format';
        return;
      }

      try {
        await this.sendMessage(messageData);
        alert('Message sent successfully');
        this.form.message = ''; 
        this.errorMessage = '';
		this.$router.push('/');
      } catch (error) {
        this.errorMessage = 'Error sending message';
        if (error.response && error.response.data.error) {
          this.errorMessage = error.response.data.error;
        }
      }
    }
  }
};
</script>
