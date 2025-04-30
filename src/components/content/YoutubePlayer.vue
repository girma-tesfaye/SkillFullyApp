<script setup lang="ts">

defineProps<{
    ytUrl?: string
}>()


</script>

<template>
   <v-container align="center">
    <iframe 
        width="800" 
        height="500" 
        :src="ytUrl" 
        allowfullscreen>
    </iframe>
   </v-container>
</template>