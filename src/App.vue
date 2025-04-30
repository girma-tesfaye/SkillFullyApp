<script setup lang="ts">
import Footer from './components/layout/Footer.vue';
import Navbar from './components/layout/Navbar.vue';
import { useRoute } from 'vue-router';
const route = useRoute();

</script>

<template>
  <v-app>
      <Navbar v-if="!route.path.startsWith('/auth')" />
    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition mode="out-in">
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
