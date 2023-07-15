<template lang="">
  <form @submit.prevent="login">
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        v-model="usernameLogin"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="passwordLogin"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
    <div class="form-text">Atau <router-link class="link-underline-primary" to="/laporan/register">register</router-link> terlebih dahulu</div>
  </form>
</template>
<script>
import axios from 'axios';

export default {
    data: function () {
        return {
            usernameLogin: "",
            passwordLogin: "",
            userID: "",
            userName: "",
        }
    },
    methods: {
      login: function() {
        const params = new URLSearchParams();

        params.append('username', this.usernameLogin);
        params.append('password', this.passwordLogin);
        axios.post('http://localhost:8080/api/auth/login',params)
        .then((r) => {
          console.log(r.data);
          const msg = r.data.message;
          const status = r.data.status;
          this.userID = r.data.userID;
          this.userName = r.data.user_name;
          this.role = r.data.role;

          if (status == 200) {
            this.$session.set('username', this.userName)
            this.$session.set('user_id', this.userID)
            console.log(this.$session.exists("username"))
            this.$emit('enableForm', (status, msg, this.userID))
            this.$router.push('/laporan/loginSuccess')
            this.usernameLogin = "";
            this.passwordLogin = "";
          }
        })
        .catch((e) => {
          this.$emit('changeMsg', e.response.data.message)
          console.log(e);
        });
      }
    }
};
</script>
<style scoped></style>
