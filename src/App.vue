<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="M-Tech Logo"
          class="shrink mr-2"
          contain
          src="https://habrastorage.org/getpro/moikrug/uploads/company/100/008/518/3/logo/big_121a90b5639d4d2a18f2dc21ba1d5b9d.jpg"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-app-bar-title>Тестовое Задание</v-app-bar-title>
      <v-spacer></v-spacer>
      <router-link to="/products"
        ><v-btn icon>
          <v-icon>mdi-application-braces</v-icon>
        </v-btn></router-link
      >
      |
      <router-link to="/employees"
        ><v-btn icon>
          <v-icon>mdi-account-group-outline</v-icon>
        </v-btn></router-link
      >
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
