<template>
  <nav class="breadcrumb">
    <RouterLink to="/" class="breadcrumb__home">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 7L7 1.5L13 7V13H9.5V9H4.5V13H1V7Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      </svg>
    </RouterLink>
    <template v-for="(item, i) in items" :key="i">
      <svg class="breadcrumb__sep" width="6" height="10" viewBox="0 0 6 10" fill="none">
        <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
      </svg>
      <RouterLink v-if="item.to" :to="item.to" class="breadcrumb__item breadcrumb__item--link">
        {{ item.label }}
      </RouterLink>
      <span v-else class="breadcrumb__item breadcrumb__item--current">{{ item.label }}</span>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding: 0 var(--space-24);
  height: 44px;
  background: var(--color-neutral-0);
  border-bottom: 1px solid var(--color-neutral-100);
}

.breadcrumb__home {
  display: flex;
  align-items: center;
  color: var(--color-brand);
  flex-shrink: 0;
}

.breadcrumb__home:hover {
  color: var(--color-brand-hover);
}

.breadcrumb__sep {
  color: var(--color-neutral-400);
  flex-shrink: 0;
}

.breadcrumb__item {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.breadcrumb__item--link {
  color: var(--color-brand);
}

.breadcrumb__item--link:hover {
  color: var(--color-brand-hover);
}

.breadcrumb__item--current {
  color: var(--color-neutral-500);
}
</style>
