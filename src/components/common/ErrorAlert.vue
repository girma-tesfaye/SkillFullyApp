<template>
  <v-alert
    v-if="error"
    type="error"
    closable
    class="mb-4"
  >
    {{ error.message }}
  </v-alert>
</template>

<script setup lang="ts">
defineProps<{
  error: Error | null;
}>();
</script> 