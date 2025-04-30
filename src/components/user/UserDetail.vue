<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { User } from '@/types/user';
import UserTrainings from '../training/UserTrainings.vue';
import { Training } from '@/types/training';
import { useQuery } from '@vue/apollo-composable';
import { GET_USER_TRAININGS } from '@/graphql';

const props = defineProps<{
    user: User;
    tab?: string;
}>();

const tabItems = [
  { title: 'About', value: 'about' },
  { title: 'Trainings', value: 'trainings' },
  { title: 'Activity', value: 'activity' },
  { title: 'Settings', value: 'settings' }
];

const formatRole = (role:string) => {
  return role.toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const activeTab = ref<string>(props.tab || 'trainings');
const userTrainings = ref<Training[]>();

const { result } = useQuery(GET_USER_TRAININGS);

watchEffect(() => {
  if(result.value){
    userTrainings.value = result.value.getUserTrainings
  }
})

const formatDate = (dateString:string) => {
  return new Date(dateString).toLocaleDateString()
};
const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString()
}

</script>

<template>
  <v-row>
    <v-col cols="12" md="8" class="d-flex">
      <v-avatar size="120" color="grey-lighten-2" class="me-6">
        <v-icon size="48" color="grey-darken-2">mdi-account</v-icon>
      </v-avatar>
      <div>
        <div class="d-flex align-center mb-2">
          <h2 class="text-h6 font-weight-medium me-4">
            {{ user.firstName }} {{ user.lastName }}
          </h2>
          <v-chip
            v-for="role in user.roles?.slice(0, 1)"
            :key="role"
            color="success"
            size="small"
            class="ms-2"
          >
            {{ formatRole(role) }}
          </v-chip>
        </div>
        <div class="text-body-1 text-secondary mb-4">
          {{ user.email }}
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="4">
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="grey-darken-1">mdi-clock-outline</v-icon>
          </template>
          <v-list-item-title>Last Login</v-list-item-title>
          <v-list-item-subtitle>
            {{ formatDate(user.lastLogin) }} {{ formatTime(user.lastLogin) }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="grey-darken-1">mdi-shield-account</v-icon>
          </template>
          <v-list-item-title>Roles</v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              v-for="role in user.roles"
              :key="role"
              size="x-small"
              class="ms-2"
            >
              {{ formatRole(role) }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="grey-darken-1">mdi-identifier</v-icon>
          </template>
          <v-list-item-title>User ID</v-list-item-title>
          <v-list-item-subtitle class="text-truncate">
            {{ user.id }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
  <v-tabs v-model="activeTab" class="mt-6">
    <v-tab v-for="item in tabItems" :value="item.value">{{ item.title }}</v-tab>
  </v-tabs>
  <v-window v-model="activeTab" class="mt-4">
    <v-window-item value="about">
      <v-card-text>
        <h3 class="text-h6 mb-4">Roles and Permissions</h3>
        <v-chip-group>
          <v-chip
            v-for="role in user.roles"
            :key="role"
            color="primary"
            variant="outlined"
          >
            {{ formatRole(role) }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-window-item>
    <v-window-item value="activity">
      <v-card-text>
        <div class="text-body-1">
          Last login activity: {{ formatDate(user.lastLogin) }}
        </div>
      </v-card-text>
    </v-window-item>

    <v-window-item value="trainings">
        <UserTrainings :trainings="userTrainings"/>
    </v-window-item>


    <v-window-item value="settings">
      <v-card-text>
        <div class="text-body-1">User settings panel</div>
      </v-card-text>
    </v-window-item>
  </v-window>
</template>
