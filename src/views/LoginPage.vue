<template>
  <b-container fluid>
    <b-row class="my-1" key="username">
      <b-col sm="3">
        <label for="username">Login :</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="username" id="username" type="text" placeholder="Entrez votre login"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1" key="password">
      <b-col sm="3">
        <label for="password">Mot de passe :</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="password" id="password" type="password" placeholder="Entrez votre mot de passe"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="success" @click="processLogin">S'identifier</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import router from "../router";

export default {
  name: 'LoginPage',
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods:{
    processLogin : async function( ) {
      await this.$store.dispatch("login", { username : this.username, password:  this.password })
      if ( this.$store.getters.isLoggedIn ){
        router.push('/')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
