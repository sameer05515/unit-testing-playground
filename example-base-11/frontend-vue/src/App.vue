<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <i class="bi bi-folder2-open"></i> Media Files Browser
        </router-link>
        <div class="d-flex gap-2">
          <router-link to="/scan" class="btn btn-outline-light btn-sm">
            <i class="bi bi-search"></i> Scan
          </router-link>
          <router-link to="/deleted" class="btn btn-outline-light btn-sm">
            <i class="bi bi-trash"></i> Deleted Files
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
body {
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>

