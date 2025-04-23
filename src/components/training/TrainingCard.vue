<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps({
  training: Object,
  detailPath: String,
});

const router = useRouter();
</script>

<template>
  <v-card 
    :to="`${detailPath}/${training?.id}`"
    class="training-card " elevation="1" rounded="lg" flat>
    <v-card-text class="card-content">
      <v-img
        :width="300"
        aspect-ratio="1/1"
        cover
        src="/Introduction-to-GraphQL.jpg"
        class="cover-image"
      >
      </v-img>
      <v-row class="header" align="center" justify="space-between">
        <v-typography variant="h2" class="training-title">{{ training?.title }}</v-typography>
        <v-chip class="category-tag" size="x-small">{{ training?.type }}</v-chip>
      </v-row>
      <v-typography class="description">{{ training?.description }}</v-typography>
      <v-row class="meta-info" justify="space-between">
        <v-col class="meta-item" cols="auto">
          <v-icon size="small" color="#6B7280">mdi-clock-outline</v-icon>
          <v-typography>{{ training?.estimatedDuration }} hrs</v-typography>
        </v-col>
        <v-col class="meta-item" cols="auto">
          <v-icon size="small" color="#6B7280">mdi-account-group-outline</v-icon>
          <v-typography>{{ training?.enrolled }} enrolled</v-typography>
        </v-col>
        <v-col class="meta-item" cols="auto">
          <v-icon size="small" color="#6B7280">mdi-star-outline</v-icon>
          <v-typography>{{ training?.rate || `4.5` }}</v-typography>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>


<style scoped>
.cover-image {
  border-radius: 8px 8px 0 0;
  top: 20px;
}

.training-card {
  background: white;
  height: 100%;
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  margin-bottom: 16px;
}

.training-title {
  margin: 0;
  flex: 1;
  margin: 8px 16px;
  font: bold 20px/24px 'Poppins', sans-serif;
  color: #111827;
  top: 28px;
  position: relative;
  font-family: "Trirong", serif;
}

.category-tag {
  white-space: nowrap;
  background-color: #17233fdd;
  color: white;
  position: absolute;
  top: 16px;
  right: 8px;
}

.description {
  margin: 0 0 24px 0;
  line-height: 1.5;
  flex-grow: 1;
  color: #6B7280;
  margin-top: 12px;
  font-family: "Trirong", serif;
}

.meta-info {
  margin-bottom: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  font-size: 14px;
}

.view-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #E76F51;
  text-decoration: none;
  font-weight: 500;
}

.view-link:hover {
  text-decoration: underline;
}
</style>