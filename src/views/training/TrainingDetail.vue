<script setup lang="ts">
import { GET_TRAINING, ENROLL_FOR_TRAINING } from '@/graphql'
import { Training } from '@/types/training';
import { durationString } from '@/utils/helperFunctions';
import { useQuery, useMutation } from '@vue/apollo-composable'
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const trainingId = route.params.trainingId

const router = useRouter()

const training = ref<Training>()


const { result, loading, error, refetch } = useQuery(GET_TRAINING,{ getTrainingId: trainingId })

const { mutate } = useMutation(ENROLL_FOR_TRAINING)

watchEffect(() => {
  if (result.value){
    training.value = result.value.getTraining
  }
})

const handleEnroll = async() => {
  try{
    await mutate({ trainingId})
    refetch()
  }catch(err){
    console.error(err)
  }
}


onMounted(() => {
  refetch()
})

const handleStartModule = (id: string) => {
  router.push(`/trainings/module/${id}`)
}

</script>
<template>
  <v-card v-if="loading"  flat>
    <v-card-text>
      <v-progress-linear height="10" indeterminate color="primary"></v-progress-linear>
      <div class="text-center mt-4 text-h5">Loading training details...</div>
    </v-card-text>
  </v-card>

  <template v-else-if="training">
    <!-- Training Header Section -->
    <v-container fluid class="pa-4">
      <v-row class="d-flex flex-wrap">
        <!-- Text Section -->
        <v-col cols="12" md="6" class="d-flex flex-column justify-space-between">
          <div>
            <div class="d-flex align-center mb-4 flex-wrap">
              <h2 class="text-h5 font-weight-bold mr-2">
                {{ training.title }}
              </h2>
              <v-chip :color="training.isRequired ? 'error' : 'success'" class="ma-1">
                {{ training.isRequired ? 'Required' : 'Optional' }}
              </v-chip>
            </div>

            <v-chip class="mb-4" color="primary" variant="outlined">
              {{ training.type }}
            </v-chip>

            <p class="text-body-1 mb-4">{{ training.description }}</p>

            <div class="d-flex align-center">
              <v-icon class="mr-1">mdi-clock-outline</v-icon>
              <span class="text-body-2">Estimated Duration: {{ durationString(training.estimatedDuration) }}</span>
            </div>
          </div>
          <div >
            <v-btn v-if="!training.isEnrolled" color="success" @click="handleEnroll">Enroll</v-btn>
          </div>
        </v-col>

        <!-- Image Section -->
        <v-col cols="12" md="6">
          <v-img
            src="/Introduction-to-GraphQL.jpg"
            max-height="300"
            max-width="600"
            class="rounded-lg mx-auto"
            cover
          >
            <v-overlay absolute opacity="0.3" color="black" />
          </v-img>
        </v-col>
      </v-row>
    </v-container>

    <!-- Modules Section -->
    <v-container fluid class="py-4">

      <h3 class="text-h6 font-weight-bold ml-8 mb-4">Training Modules</h3>
      <v-row no-gutters class="justify-space-between" >

        <v-col cols="12" md="8">
          <v-expansion-panels flat>
            <v-expansion-panel color="success" v-for="(module, index) in training.materials" :key="module.id">
                  <v-expansion-panel-title>
                    {{ module.title }}
                  </v-expansion-panel-title>
              <v-expansion-panel-text>{{ module.description }}</v-expansion-panel-text>
              <v-expansion-panel-text>
                <v-list>
                    <v-list-item v-for="content in module.contents" :key="content.id" :to="`/trainings/content/${trainingId}?contentId=${content.id}`">
                    <div class="d-flex align-center justify-space-between">
                      <v-list-item-content>{{ content.title }}</v-list-item-content>
                      <v-chip v-if="content.isCompleted" color="success" class="ml-2">completed</v-chip>
                    </div>
                    </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>

        <v-col cols="12" md="3">
          <v-card flat>
            <v-card-title>Progress</v-card-title>
            <v-card-text>
              <v-progress-linear color="success" model-value="50" height="24">50% completed</v-progress-linear>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <v-alert v-else-if="error" type="error" class="mt-4">
    Failed to load training details. Please try again later.
  </v-alert>
  <v-alert v-else type="error" class="mt-4">
    An unknown error occurred !
  </v-alert>
</template>

<style scoped>
.v-card-title {
  word-break: normal;
}
</style>