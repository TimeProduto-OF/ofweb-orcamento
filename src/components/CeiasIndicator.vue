<template>
  <div class="ceias">
    <div
      v-for="(attended, i) in ceias"
      :key="i"
      :class="['ceia', i === 2 ? 'ceia--large' : 'ceia--small', attended ? 'ceia--present' : 'ceia--absent']"
      :title="`${i + 1}ª Ceia — ${attended ? 'Presente' : 'Ausente'}`"
    />
  </div>
</template>

<script setup>
defineProps({
  ceias: {
    type: Array,
    default: () => [false, false, false],
  },
})
</script>

<style scoped>
.ceias {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ceia {
  border-radius: 3px;
  flex-shrink: 0;
}

.ceia--small {
  width: 16px;
  height: 16px;
  border-width: 1.5px;
  border-style: solid;
}

.ceia--large {
  width: 24px;
  height: 24px;
  border-width: 2px;
  border-style: solid;
}

.ceia--present {
  border-color: var(--color-success);
  background: var(--color-success-light);
}

.ceia--absent {
  border-color: var(--color-brand);
  background: var(--color-brand-light);
}
</style>
