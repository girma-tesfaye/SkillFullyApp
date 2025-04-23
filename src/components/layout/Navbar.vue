<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { isAuthenticated } = useAuthStore();

const { logout } = useAuthStore()

// Navigation items
const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Trainings', path: '/trainings' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

const dropdownItems = [
  { title: 'Profile',  link: '/user' },
  { title: 'My Trainings', link: '/user/tab?=trainings' },
  { title: 'Settings',  link: '/user/tab?=settings' },
]

const dropdownMenu = ref(false)
const handleLogout = () => {
  logout()
}

const currentPath = ref('/');
</script>

<template>
  <div>
    <v-app-bar
      prominent
      elevation="2"
    >
      <template v-slot:prepend>
        <v-app-bar-title class="font-weight-bold ml-2">
          SkillFully
        </v-app-bar-title>
      </template>

      <div class="d-none d-md-flex ml-4">
        <v-btn
          v-for="item in navItems"
          :key="item.title"
          :to="item.path"
          variant="text"
          class="mx-1"
          :class="currentPath === item.path ? 'font-weight-bold' : ''"
          @click="currentPath = item.path"
        >
          {{ item.title }}
        </v-btn>

      </div>


      <template v-slot:append>
        <v-btn-group  v-if="!isAuthenticated">
            <v-btn variant="text"  class="mr-2 d-none d-md-flex">
          Login
        </v-btn>
        <v-btn color="secondary" class="d-none d-md-flex">
          Sign Up
        </v-btn>
        </v-btn-group>


        <v-menu
        v-model="dropdownMenu"
        :close-on-content-click="false"
        offset-y
        transition="scale-transition"
        min-width="200"
      >
      
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            class="ml-2"
          >
            <v-avatar size="36">
              <v-img src="/Profile_avatar_placeholder.png" alt="User"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        
        <v-card>
          <v-list>
            <v-list-item
              v-for="(item, index) in dropdownItems"
              :key="index"
              :to="item.link"
              link
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            
            <v-divider></v-divider>
            
            <v-list-item link @click="handleLogout">
              <template v-slot:prepend>
                <v-icon icon="mdi-logout"></v-icon>
              </template>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      </template>
    </v-app-bar>

  </div>
</template>

<style scoped>
.v-btn {
  text-transform: none;
  font-weight: 500;
}

.v-app-bar-title {
  letter-spacing: 0.5px;
}
</style>