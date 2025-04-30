<script setup lang="ts">
import DOMPurify from 'dompurify'
import { computed } from 'vue';

const props = defineProps<{
  content: string;
}>();

const content = props.content;

const sanitizedContent = computed(() => {
  return DOMPurify.sanitize(content);
});

</script>

<template>
  <div class="container">
    <div v-html="sanitizedContent" class="prose"></div>
  </div>
</template>

<style>
.container {
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
}

.prose {
  font-size: 1rem;
  line-height: 1.75;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.prose th,
.prose td {
  border: 1px solid #2c2c2c;
  padding: 0.75rem;
  text-align: left;
}

.prose th {
  background-color: #f3f4f6;
  font-weight: 600;
}

.prose tr:nth-child(even) {
  background-color: #f9fafb;
}

.prose hr {
  border: 0;
  border-top: 1px solid #d1d5db;
  margin: 1.5rem 0;
}

.prose h1, 
.prose h2, 
.prose h3 {
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.25;
}

.prose h1 {
  font-size: 2.25rem;
}

.prose h2 {
  font-size: 1.875rem;
}

.prose h3 {
  font-size: 1.5rem;
}

.prose p {
  margin-bottom: 1rem;
}

.prose ul, 
.prose ol {
  list-style-position: outside;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose ul {
  list-style-type: disc;
}

.prose ol {
  list-style-type: decimal;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose blockquote {
  border-left: 4px solid #d1d5db;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563;
  margin: 1.5rem 0;
}

.prose a {
  color: #3b82f6;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.prose a:hover {
  color: #1d4ed8;
}

.prose img {
  max-width: 100%;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.prose pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  font-family: monospace;
}
</style>
