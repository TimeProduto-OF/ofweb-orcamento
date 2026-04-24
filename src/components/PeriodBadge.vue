<template>
  <span :class="['badge', `badge--${period}`]">{{ label }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  period: {
    type: String,
    required: true,
  },
})

const label = computed(() => {
  if (props.period === 'manha') return 'Manhã'
  if (props.period === 'noite') return 'Noite'
  return 'Ambos'
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.badge--manha {
  background: var(--color-morning-bg);
  color: var(--color-morning-text);
}

.badge--noite {
  background: #054281;
  color: #E6F0F9;
}

.badge--ambos {
  background: var(--color-neutral-500);
  color: #E6F0F9;
}
</style>
