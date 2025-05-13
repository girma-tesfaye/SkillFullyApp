<script setup lang="ts">
import { computed, defineExpose, ref } from 'vue';
import { Question, Choice, QuestionModalTypes, Answer } from '@/types/question';
import { useMutation } from '@vue/apollo-composable';
import { SUBMIT_ANSWER } from '@/graphql';

const props = defineProps<{
  questions: Question[]
  assessmentId: string | null
  navigateContentAfterSubmission: () => void
}>();

const answers = ref<Answer[]>();
const localAssessmentId = ref(props.assessmentId);


const { mutate: submitAnswerMutation } = useMutation(SUBMIT_ANSWER);


const answerMap = computed(() => {
  const map = new Map<string, string>();
    (answers.value ?? []).forEach(answer => {
    map.set(answer.questionId, answer.answer);
  });
  return map;
});

const getAnswer = (questionId: string): string => {
  return answerMap.value.get(questionId) || '';
};

const sortedChoices = (choices: Partial<Choice>[]): Choice[] => {
  return choices
    .filter((choice): choice is Choice => choice._id !== undefined && choice.order !== undefined)
    .slice()
    .sort((a, b) => a.order - b.order);
};


const handleAnswerChange = (questionId: string, answer: string | null) => {
  answer = answer ?? '';
  const existingAnswerIndex = (answers.value ?? []).findIndex(a => a.questionId === questionId);
  if (existingAnswerIndex !== -1) {
    if (answers.value) {
      answers.value[existingAnswerIndex].answer = answer;
    }
  } else {
    if (!answers.value) {
      answers.value = [];
    }
    answers.value.push({ questionId, answer: answer });
  }
};

const handleSubmitAnswer = async () => {
  try {
    const response = await submitAnswerMutation({
      answerInput: {
        assessmentId: localAssessmentId.value,
        answers: answers.value,
      },
    });

    if (response?.data.submitAnswer) {
      props.navigateContentAfterSubmission()
    }
  } catch (error) {
    console.error('Error submitting answers');
  }
};


</script>

<template>
<v-container>
  <v-card  
    v-for="(question, index) in questions" 
    :key="question._id"
    max-width="800"
    flat
  >
  <v-card-title class="d-flex">
    <p class="text-body-2 text-sm-body-1 text-wrap">
      <span>{{ index + 1 }}. {{ question.text }}</span>
    </p>
    <v-chip class="text-caption ml-4" color="info">Weight: {{ question.weight }}</v-chip>
  </v-card-title>

    
    <v-card-text>
      <v-radio-group 
        v-if="question.type === 'CHOICE'" 
        :model-value="getAnswer(question._id)"
        @update:model-value="handleAnswerChange(question._id, $event)"
      >
        <v-radio
          v-for="choice in sortedChoices(question.choices)"
          :key="choice._id"
          :label="choice.text"
          :value="choice._id"
        >
        </v-radio>
      </v-radio-group>
      
      <v-text-field
        v-if="question.type === 'TEXT'"
        :model-value="getAnswer(question._id)"
        label="Enter your answer"
        variant="outlined"
        max-width="600"
        @update:model-value="handleAnswerChange(question._id, $event)"
      ></v-text-field>
    </v-card-text>
  </v-card>

  <v-btn 
    color="success" 
    @click="handleSubmitAnswer"
    class="ml-8" 
    :disabled="!answers || answers.length === 0"
  >Submit</v-btn>
</v-container>
  
</template>

<style>
</style>