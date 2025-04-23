<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import RichTextViewer from '@/components/text/RichTextViewer.vue';
import { GET_TRAINING } from '@/graphql';
import { GET_CONTENT } from '@/graphql/content';
import type { Training } from '@/types/training';

const route = useRoute();
const trainingId = route.params.trainingId;
const dropdownMenu = ref(false);
const training = ref<Training>();
const content = ref();
const allContents = ref();
const contentId = ref<string>();

const { result: trainingResult } = useQuery(GET_TRAINING, {
    getTrainingId: trainingId,
});

const {
    result: contentResult,
    loading: contentLoading,
    refetch: refetchContent,
} = useQuery(GET_CONTENT, () => ({ contentId: contentId.value }), {
    enabled: computed(() => !!contentId.value),
});

watchEffect(() => {
    if (trainingResult.value) {
        training.value = trainingResult.value.getTraining;
        allContents.value = training.value?.materials?.flatMap(material => material.contents) || [];
        const firstId = training.value?.materials?.[0]?.contents?.[0]?.id;
        if (route.query.contentId) contentId.value = route.query.contentId as string;
        else if (firstId) contentId.value = firstId;
    }
});

watchEffect(() => {
    if (contentResult.value) content.value = contentResult.value.getContent;
});

watch(contentId, (id) => {
    if (id) {
        contentId.value = id;
        refetchContent();
    }
});

const setContentId = (id: string) => {
    contentId.value = id;
};

const navigateContent = (direction: 'next' | 'prev') => {
    let currentIndex = -1;
    if (contentId.value && allContents.value) {
        currentIndex = allContents.value.findIndex(
            (content: { id: string }) => content.id === contentId.value
        );
    }
    if (currentIndex !== undefined && currentIndex >= 0) {
        const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < allContents.value.length) {
            contentId.value = allContents.value[newIndex].id;
        }
    }
};
</script>

<template>
<v-container class="overflow-y-auto max-h-80vh d-flex flex-column">
    <v-card flat class="d-flex justify-space-between align-center sticky top-0 z-1" color="success">
        <v-btn-group color="success">
            <v-btn icon="mdi-chevron-left" @click="navigateContent('prev')"/>
            <v-btn icon="mdi-chevron-right" @click="navigateContent('next')"/>
            <p class="ma-0 d-flex align-center">1 of 6</p>
        </v-btn-group>
        <v-btn-group color="success">
            <v-menu v-model="dropdownMenu" offset-y transition="scale-transition" min-width="200">
                <template #activator="{ props }">
                <v-btn v-bind="props" class="ml-2">
                    Contetns : {{ content?.title || 'Select content' }}
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                </template>
                <v-card>
                    <v-list>
                        <template v-for="material in training?.materials" :key="material.id">
                        <v-list-item-title class="font-weight-bold px-4 pt-2" style="color: inherit; background: lightblue;">
                                {{ material.title }}
                        </v-list-item-title>
                            <v-list-item v-for="item in material.contents" :key="item.id" @click="setContentId(item.id)">
                            <v-list-item-title>
                                <v-icon color="success">mdi-circle-outline</v-icon>
                                {{ item.title }}
                            </v-list-item-title>
                            </v-list-item>
                        </template>
                        <v-divider />
                    </v-list>
                </v-card>
            </v-menu>
        </v-btn-group>
    </v-card>
    <div v-if="content" style="flex: 1; overflow-y: auto; max-height: 80vh;">
        <v-card flat rounded="none" class="d-flex justify-center align-center" style="background: inherit;">
            <v-card-title class="text-center text-h3">{{ content.title }}</v-card-title>
        </v-card>
        <RichTextViewer :content="content.content" style="background: inherit;"/>
    </div>
    <v-container v-else-if="contentLoading" class="d-flex justify-center align-center min-h-100vh">
        <v-progress-circular size="large" color="info" indeterminate />
    </v-container>
</v-container>
</template>
