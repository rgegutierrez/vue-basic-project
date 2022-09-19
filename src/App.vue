<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  setup() {

  },
  components: {
    
  }
}
</script>

<style>
html {
    max-width: 1980px;
    margin: 0 auto;
    height: 100%;
}
body {
    font-family: Arial sans-serif;
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 1980px;
    min-height: 100%;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
}
#app {
  height: inherit;
  width: inherit;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-image: radial-gradient(
    1250px circle at 0% 0%, 
    hsl(110, 41%, 35%) 15%, 
    hsl(110, 41%, 30%) 35%, 
    hsl(110, 41%, 20%) 75%, 
    transparent 100%
    ), 
    radial-gradient(
      1250px circle at 100% 100%, 
      hsl(110, 41%, 45%) 15%, 
      hsl(110, 41%, 30%) 35%, 
      hsl(110, 41%, 20%) 75%, 
      transparent 100%); */
}
</style>
