<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('update:modelValue', false)">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">

        <!-- Header -->
        <div class="modal__header">
          <h2 id="modal-title" class="modal__title">substituir item</h2>
          <button class="modal__close" @click="$emit('update:modelValue', false)" aria-label="Fechar modal">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L11 11M1 11L11 1" stroke="#222222" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div class="modal__divider"></div>

        <!-- Body -->
        <div class="modal__body">

          <!-- Current item card -->
          <div class="modal__section modal__section--padded">
            <div class="item-card">
              <div class="item-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="#E9ECEF"/>
                  <path d="M6 8h12M6 12h12M6 16h8" stroke="#6C757D" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="item-card__code">
                <span>{{ item.code }}</span>
                <span>{{ item.date }}</span>
              </div>
              <div class="item-card__base">{{ item.base }}</div>
              <div class="item-card__description">{{ item.description }}</div>
              <div class="item-card__unit">{{ item.unit }}</div>
              <div class="item-card__value">{{ item.value }}</div>
            </div>
          </div>

          <div class="modal__divider"></div>

          <!-- Search section -->
          <div class="modal__section modal__section--padded modal__section--search">

            <!-- Section header -->
            <div class="search-header">
              <h3 class="search-header__title">Pesquisar substituto</h3>
              <div class="sofia-toggle" :class="{ 'sofia-toggle--active': sofiaEnabled }">
                <button class="sofia-toggle__btn" @click="sofiaEnabled = !sofiaEnabled">
                  <div class="sofia-toggle__logo">
                    <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="21" cy="16" rx="20" ry="14" fill="#0866C6" opacity="0.15"/>
                      <text x="21" y="20" text-anchor="middle" font-family="Roboto" font-size="10" font-weight="700" fill="#0866C6">SOFIA</text>
                    </svg>
                  </div>
                  <div class="sofia-toggle__text">
                    <span class="sofia-toggle__label">Sugestões da SOFIA</span>
                    <span class="sofia-toggle__sublabel">Legenda</span>
                  </div>
                  <div class="sofia-toggle__switch" :class="{ 'sofia-toggle__switch--on': sofiaEnabled }">
                    <div class="sofia-toggle__knob"></div>
                  </div>
                </button>
              </div>
            </div>

            <!-- Search input box -->
            <div class="search-box">
              <div class="search-box__inner">
                <p class="search-box__query">{{ searchQuery || item.description }}</p>

                <div class="search-box__controls">
                  <div class="search-box__left-controls">
                    <!-- Item type toggle -->
                    <div class="search-box__field">
                      <span class="search-box__field-label">Tipo do item</span>
                      <div class="item-type-toggle">
                        <button
                          class="item-type-toggle__btn"
                          :class="{ 'item-type-toggle__btn--active': itemType === 'composicao' }"
                          @click="itemType = 'composicao'"
                        >
                          <svg v-if="itemType === 'composicao'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 8L6.5 11.5L13 4.5" stroke="#0866C6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          Composição
                        </button>
                        <button
                          class="item-type-toggle__btn"
                          :class="{ 'item-type-toggle__btn--active': itemType === 'insumo' }"
                          @click="itemType = 'insumo'"
                        >
                          Insumo
                        </button>
                      </div>
                    </div>

                    <!-- Bases dropdown -->
                    <div class="bases-dropdown" @click="basesOpen = !basesOpen" ref="basesRef">
                      <span class="bases-dropdown__label">Bases</span>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>

                    <!-- Checkbox discontinued -->
                    <label class="checkbox-label">
                      <span class="checkbox" :class="{ 'checkbox--checked': searchDiscontinued }">
                        <input type="checkbox" v-model="searchDiscontinued" class="checkbox__input" />
                        <svg v-if="searchDiscontinued" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="checkbox-label__text" :class="{ 'checkbox-label__text--checked': searchDiscontinued }">
                        Buscar itens descontinuados
                      </span>
                    </label>
                  </div>

                  <!-- Search button -->
                  <button class="btn-search" @click="handleSearch" aria-label="Pesquisar">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7" cy="7" r="5.5" stroke="white" stroke-width="1.5"/>
                      <path d="M11 11L14 14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Balance and buy -->
            <div class="balance-area">
              <div class="balance-area__info">
                <span class="balance-area__label">Seu saldo</span>
                <div class="balance-area__value">
                  <span class="balance-area__currency">R${{ balanceWhole }}</span><span class="balance-area__cents">,{{ balanceCents }}</span>
                </div>
              </div>
              <button class="btn-buy">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1h1.5l1.5 6h5l1-4H3.5" stroke="#10B981" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="5.5" cy="10" r="0.8" fill="#10B981"/>
                  <circle cx="8.5" cy="10" r="0.8" fill="#10B981"/>
                </svg>
                Comprar
              </button>
            </div>

          </div>
        </div>

        <div class="modal__divider"></div>

        <!-- Footer -->
        <div class="modal__footer">
          <button class="btn btn--naked" @click="$emit('update:modelValue', false)">Cancelar</button>
          <button class="btn btn--primary" :disabled="!canSubmit" @click="handleSubmit">Substituir</button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => ({
      code: '98525',
      date: '09/2025',
      base: 'SINAPI',
      description: 'LIMPEZA MECANIZADA DE CAMADA VEGETAL, VEGETAÇÃO E PEQUENAS ÁRVORES (DIÂMETRO DE TRONCO MENOR QUE 0,20 M), COM TRATOR DE ESTEIRAS. AF_03/2024',
      unit: 'm²',
      value: '123456,12',
    }),
  },
  balance: {
    type: Number,
    default: 164.7475236,
  },
})

const emit = defineEmits(['update:modelValue', 'substituir'])

const sofiaEnabled = ref(true)
const itemType = ref('composicao')
const searchDiscontinued = ref(false)
const basesOpen = ref(false)
const searchQuery = ref('')

const balanceWhole = computed(() => {
  return Math.floor(props.balance).toString()
})

const balanceCents = computed(() => {
  const dec = props.balance.toString().split('.')[1] || '00'
  return dec.padEnd(7, '0').slice(0, 7)
})

const canSubmit = computed(() => false)

function handleSearch() {
  // emit search event
}

function handleSubmit() {
  emit('substituir')
  emit('update:modelValue', false)
}
</script>

<style scoped>
/* ── Overlay ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* ── Modal container ── */
.modal {
  background: #fff;
  border-radius: var(--radius-4);
  width: 936px;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.modal__header {
  display: flex;
  align-items: center;
  padding: 0 var(--space-24);
  height: 64px;
  flex-shrink: 0;
}

.modal__title {
  flex: 1;
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-900);
  text-transform: uppercase;
  letter-spacing: 0;
}

.modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-4);
  transition: background 0.15s;
}

.modal__close:hover {
  background: var(--color-neutral-50);
}

/* ── Divider ── */
.modal__divider {
  height: 1px;
  background: var(--color-neutral-100);
  flex-shrink: 0;
}

/* ── Body ── */
.modal__body {
  display: flex;
  flex-direction: column;
  padding: var(--space-24) 0;
  gap: var(--space-24);
}

.modal__section {
  display: flex;
  flex-direction: column;
}

.modal__section--padded {
  padding: 0 var(--space-24);
}

.modal__section--search {
  gap: var(--space-32);
}

/* ── Current item card ── */
.item-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-16);
  padding: var(--space-16);
  background: var(--color-neutral-50);
  border: 1px solid var(--color-border-neutral);
  border-radius: var(--radius-4);
}

.item-card__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.item-card__code {
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-regular);
  color: var(--color-neutral-900);
  text-align: right;
  width: 112px;
  flex-shrink: 0;
  line-height: normal;
}

.item-card__base {
  font-size: var(--font-size-12);
  color: var(--color-neutral-900);
  width: 56px;
  flex-shrink: 0;
  line-height: normal;
}

.item-card__description {
  flex: 1;
  font-size: var(--font-size-12);
  color: var(--color-neutral-900);
  line-height: normal;
  max-height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-card__unit {
  font-size: var(--font-size-12);
  color: var(--color-neutral-900);
  width: 56px;
  text-align: center;
  flex-shrink: 0;
}

.item-card__value {
  font-size: var(--font-size-12);
  color: var(--color-neutral-900);
  width: 88px;
  flex-shrink: 0;
  text-align: right;
}

/* ── Search header ── */
.search-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-header__title {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
}

/* ── SOFIA toggle ── */
.sofia-toggle {
  border: 1px solid var(--color-border-neutral);
  border-radius: var(--radius-8);
  background: transparent;
  overflow: hidden;
  width: 268px;
}

.sofia-toggle--active {
  border-color: var(--color-primary);
  background: var(--color-primary-lightest);
}

.sofia-toggle__btn {
  display: flex;
  align-items: center;
  gap: var(--space-16);
  padding: var(--space-8);
  width: 100%;
  border-radius: var(--radius-8);
  cursor: pointer;
}

.sofia-toggle__logo {
  width: 42px;
  height: 32px;
  flex-shrink: 0;
}

.sofia-toggle__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  flex: 1;
  text-align: left;
}

.sofia-toggle__label {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
  line-height: normal;
}

.sofia-toggle__sublabel {
  font-size: 10px;
  font-weight: var(--font-weight-regular);
  color: var(--color-neutral-900);
  line-height: normal;
}

/* Toggle switch */
.sofia-toggle__switch {
  position: relative;
  width: 32px;
  height: 16px;
  background: var(--color-border-neutral);
  border-radius: 8px;
  flex-shrink: 0;
  transition: background 0.2s;
}

.sofia-toggle__switch--on {
  background: var(--color-primary);
}

.sofia-toggle__knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.sofia-toggle__switch--on .sofia-toggle__knob {
  transform: translateX(16px);
}

/* ── Search box ── */
.search-box {
  display: flex;
  flex-direction: column;
}

.search-box__inner {
  background: white;
  border: 1.5px solid var(--color-primary-dark);
  border-radius: var(--radius-4);
  padding: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

.search-box__query {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-regular);
  color: var(--color-primary);
  line-height: normal;
  word-break: break-word;
}

.search-box__controls {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.search-box__left-controls {
  display: flex;
  align-items: flex-end;
  gap: var(--space-16);
}

/* ── Item type toggle (Composição/Insumo) ── */
.search-box__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  width: 181px;
}

.search-box__field-label {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-300);
  line-height: normal;
}

.item-type-toggle {
  display: flex;
  align-items: center;
  height: 32px;
}

.item-type-toggle__btn {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding: 0 var(--space-8);
  height: 32px;
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-300);
  background: rgba(217, 217, 217, 0.3);
  cursor: pointer;
}

.item-type-toggle__btn:first-child {
  border-radius: var(--radius-4) 0 0 var(--radius-4);
}

.item-type-toggle__btn:last-child {
  border-radius: 0 var(--radius-4) var(--radius-4) 0;
  flex: 1;
  justify-content: center;
}

.item-type-toggle__btn--active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

/* ── Bases dropdown ── */
.bases-dropdown {
  display: flex;
  align-items: center;
  gap: var(--space-16);
  padding: var(--space-8);
  border: 1px solid var(--color-border-neutral);
  border-radius: var(--radius-4);
  width: 128px;
  height: 32px;
  cursor: pointer;
  flex-shrink: 0;
}

.bases-dropdown__label {
  flex: 1;
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-300);
  line-height: normal;
}

/* ── Checkbox ── */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  cursor: pointer;
  height: 32px;
  flex-shrink: 0;
}

.checkbox {
  position: relative;
  width: 16px;
  height: 16px;
  border: 1px solid var(--color-border-neutral);
  border-radius: 2px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;
}

.checkbox--checked {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-label__text {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-regular);
  color: var(--color-neutral-300);
  white-space: nowrap;
}

.checkbox-label__text--checked {
  color: var(--color-neutral-900);
}

/* ── Search button ── */
.btn-search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--color-primary);
  border-radius: var(--radius-4);
  flex-shrink: 0;
  transition: background 0.15s;
}

.btn-search:hover {
  background: var(--color-primary-dark);
}

/* ── Balance area ── */
.balance-area {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-8);
  align-self: flex-end;
}

.balance-area__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: flex-end;
}

.balance-area__label {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-300);
  line-height: normal;
}

.balance-area__value {
  display: flex;
  align-items: baseline;
  gap: 2px;
  color: var(--color-neutral-900);
  font-weight: var(--font-weight-medium);
  line-height: normal;
  white-space: nowrap;
}

.balance-area__currency {
  font-size: var(--font-size-16);
}

.balance-area__cents {
  font-size: var(--font-size-12);
}

.btn-buy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: 0 var(--space-8);
  height: 24px;
  width: 100%;
  border: 1px solid var(--color-success);
  border-radius: var(--radius-4);
  font-size: 10px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-success);
  background: transparent;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-buy:hover {
  background: rgba(16, 185, 129, 0.08);
}

/* ── Footer ── */
.modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-24);
  padding: 0 var(--space-24);
  height: 64px;
  flex-shrink: 0;
}

/* ── Buttons ── */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-16);
  height: 32px;
  border-radius: var(--radius-4);
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, opacity 0.15s;
}

.btn--naked {
  background: transparent;
  color: var(--color-primary);
  border: none;
}

.btn--naked:hover {
  background: var(--color-primary-lightest);
}

.btn--primary {
  background: var(--color-primary);
  color: white;
  border: none;
}

.btn--primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.btn--primary:disabled {
  background: var(--color-neutral-100);
  cursor: not-allowed;
}
</style>
