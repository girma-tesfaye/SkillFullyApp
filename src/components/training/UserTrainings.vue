<script setup lang="ts">
import { Material } from '@/types/material';
import { Training } from '@/types/training';
import { ref } from 'vue';

defineProps<{
    trainings?: Training[]
}>()

const selectedTraining = ref<Training>()

</script>


<template>
<v-row>
  <v-col class="mb-12">
    <v-card 
        v-for="training in trainings"
        outlined 
        elevation="0"
        @click = "selectedTraining = training"
        >
        <v-row no-gutters>
            <v-col cols="auto">
                <v-img
                    src="/ServiceNowDeveloper.jpeg"
                    width="100"
                    height="100"
                    class="mr-4"
                />
            </v-col>
        <v-col>
            <v-card-title>
                {{ training?.title  }}
            </v-card-title>
            <v-card-text >
                <v-chip v-if="training.progress" color="success" variant="outlined" size="small">
                    {{ training.progress + "% completed" }}
                </v-chip>
                <v-chip v-else color="info">
                    Not started
                </v-chip>
            </v-card-text>
        </v-col>
        </v-row>
        <v-progress-linear color="info" :model-value="training.progress" />
     </v-card>  
    </v-col> 
    <v-col>
        <v-card
         v-if="selectedTraining"
        outlined 
        elevation="0">
            <v-card-title>Modules for {{ selectedTraining?.title }}</v-card-title>
            <v-expansion-panels>
            <v-expansion-panel v-for="material in selectedTraining?.materials">
                <v-expansion-panel-title>
                    <v-icon class="mr-2" color="success">
                        {{ 'mdi-check-circle-outline' }}
                    </v-icon>
                    {{ material.title }}
                </v-expansion-panel-title>
            <v-expansion-panel-text v-for="content in material.contents" :key="content.id"> 
                <v-icon color="success">{{ content.isCompleted ? 'mdi-check-circle' : 'mdi-circle-outline'}}</v-icon>
                {{ content.title }} 
            </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        </v-card>
        
    </v-col>
</v-row>

</template>
