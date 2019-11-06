<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
    const token = localStorage.getItem('token')
    debugger
    if (!token) {
      this.$router.push('/login')
    }
  }
}
</script>
<style>
</style>
