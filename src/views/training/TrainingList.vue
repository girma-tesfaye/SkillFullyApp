<script setup lang="ts" >
import { computed, onBeforeMount, onMounted, ref, Ref, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { Training } from '@/types/training';
import { GET_ORG_TRAININGS } from '@/graphql';
import TrainingCard from '@/components/training/TrainingCard.vue';

const trainings = ref<Training[]>()
const filters = [
    { title: 'ALL', value: 'ALL' },
    { title: 'ONBOARDING', value: 'ONBOARDING' },
    { title: 'COMPLIANCE', value: 'COMPLIANCE' },
    { title: 'SKILL DEVELOPMENT', value: 'SKILL_DEVELOPMENT' },
    { title: 'SAFETY', value: 'SAFETY' },
    { title: 'PRODUCT', value: 'PRODUCT' },
    { title: 'CUSTOM', value: 'CUSTOM' }
]



const selectedFilter = ref<String>('ALL')

const filteredTrainings = ref<Training[]>()

const { result, loading, error } = useQuery(GET_ORG_TRAININGS)


watchEffect(() => {
    if(result.value){
        trainings.value = result.value.getAllOrgTrainings
    }
    if(filters){
        filteredTrainings.value = trainings.value?.filter((training) => {
            if(selectedFilter.value === 'ALL'){
                return training
            }
            return training.type === selectedFilter.value
        })
    }
})


</script>

<template>
   <v-container>
    <v-navigation-drawer class="border-none">
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, index) in filters"
            :key="index"
            :title="item.title"
            :value="item.value"
            @click="selectedFilter = item.value"
            rounded="lg"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-row>
        
        <v-col
                v-for="training in filteredTrainings"
                :key="training.id"
                cols="12"
                sm="4"
                md="4"
                lg="3"
            >   
                <TrainingCard 
                :training="training"  
                detailPath="/trainings"  /> 

            </v-col>
    </v-row>
   </v-container>
</template>
