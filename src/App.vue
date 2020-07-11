<template>
  <div class="container">
    <div class="page">
      <router-view/>
    </div>
    <div class="footer">
      <router-link to="/">Home</router-link> |
      <router-link to="/calendar">Calendar</router-link>
    </div>
  </div>
</template>

<style scoped>
</style>
