<template>
  <span :class="['badge', `badge--${church}`]">{{ label }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  church: {
    type: String,
    required: true,
  },
})

const label = computed(() => {
  if (props.church === 'mae')       return 'Mãe'
  if (props.church === 'filial')    return 'Filial'
  if (props.church === 'subfilial') return 'Subfilial'
  return props.church
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
  color: var(--color-neutral-50);
}

.badge--mae {
  background: var(--color-church-mae);
}

.badge--filial {
  background: var(--color-church-filial);
}

.badge--subfilial {
  background: var(--color-church-subfilial);
}
</style>
