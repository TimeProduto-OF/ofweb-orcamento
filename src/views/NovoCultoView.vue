<template>
  <div class="page">
    <AppNavbar />
    <AppBreadcrumb :items="[
      { label: 'Controle de Presença', to: '/controle-de-presenca' },
      { label: 'Novo Culto' },
    ]" />

    <div class="page-content">
      <div class="form-card">
        <h1 class="form-title">Novo Culto</h1>

        <form @submit.prevent="submit" class="form">
          <!-- Tipo de culto -->
          <div class="field">
            <label class="field__label">Tipo de culto</label>
            <div class="select-wrapper">
              <select v-model="form.tipo" class="pill-select" required>
                <option value="" disabled>Selecione o tipo...</option>
                <option v-for="tipo in tiposCulto" :key="tipo" :value="tipo">{{ tipo }}</option>
              </select>
              <svg class="select-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M9 1L5 5L1 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              </svg>
            </div>
          </div>

          <!-- Data -->
          <div class="field">
            <label class="field__label">Data</label>
            <input v-model="form.data" type="date" class="pill-input" required />
          </div>

          <!-- Período -->
          <div class="field">
            <label class="field__label">Período</label>
            <div class="toggle">
              <button
                type="button"
                :class="['toggle__opt', form.periodo === 'manha' && 'toggle__opt--active']"
                @click="setPeriodo('manha')"
              >Manhã</button>
              <button
                type="button"
                :class="['toggle__opt', form.periodo === 'noite' && 'toggle__opt--active']"
                @click="setPeriodo('noite')"
              >Noite</button>
            </div>
          </div>

          <!-- Horários -->
          <div class="field-row">
            <div class="field">
              <label class="field__label">Início</label>
              <input v-model="form.inicio" type="time" class="pill-input" required />
            </div>
            <div class="field">
              <label class="field__label">Término</label>
              <input v-model="form.termino" type="time" class="pill-input" required />
            </div>
          </div>

          <!-- Igreja -->
          <div class="field">
            <label class="field__label">Igreja</label>
            <div class="select-wrapper">
              <select v-model="form.igreja" class="pill-select" required>
                <option value="" disabled>Selecione a igreja...</option>
                <option v-for="ig in igrejas" :key="ig.value" :value="ig.value">{{ ig.label }}</option>
              </select>
              <svg class="select-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M9 1L5 5L1 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              </svg>
            </div>
          </div>

          <div class="form-actions">
            <RouterLink to="/controle-de-presenca" class="btn-cancel">Cancelar</RouterLink>
            <button type="submit" class="btn-submit">Criar Culto</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import AppBreadcrumb from '../components/AppBreadcrumb.vue'
import { tiposCulto, igrejas, cultos } from '../data/mock.js'

const router = useRouter()

const today = new Date().toISOString().slice(0, 10)

const form = ref({
  tipo:    '',
  data:    today,
  periodo: 'manha',
  inicio:  '09:00',
  termino: '11:00',
  igreja:  '',
})

function setPeriodo(p) {
  form.value.periodo = p
  form.value.inicio  = p === 'manha' ? '09:00' : '19:30'
  form.value.termino = p === 'manha' ? '11:00' : '21:30'
}

function submit() {
  const newId = cultos.length + 1
  cultos.push({
    id:         newId,
    tipo:       form.value.tipo,
    data:       form.value.data,
    periodo:    form.value.periodo,
    inicio:     form.value.inicio,
    termino:    form.value.termino,
    igreja:     form.value.igreja,
    status:     'agendado',
    presentes:  [],
    ausentes:   [],
    visitantes: [],
  })
  router.push(`/controle-de-presenca/${newId}`)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #F3F4F6;
}

.page-content {
  margin-top: 80px;
  padding: var(--space-48) var(--space-24);
  display: flex;
  justify-content: center;
}

.form-card {
  background: var(--color-neutral-50);
  border-radius: var(--radius-32);
  box-shadow: var(--shadow-card);
  outline: 1px solid var(--color-neutral-200);
  padding: var(--space-32);
  width: 100%;
  max-width: 520px;
}

.form-title {
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  margin-bottom: var(--space-32);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  flex: 1;
}

.field__label {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field-row {
  display: flex;
  gap: var(--space-12);
}

/* Pill inputs & selects */
.pill-input,
.pill-select {
  height: 44px;
  padding: 0 var(--space-16);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-full);
  background: var(--color-neutral-0);
  font-size: var(--font-size-14);
  color: var(--color-neutral-900);
  font-family: var(--font-family);
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}

.pill-input:focus   { border-color: var(--color-neutral-500); }
.pill-select:focus  { border-color: var(--color-neutral-500); }

.pill-input:not(:placeholder-shown),
.pill-select:not(:invalid) {
  border-color: var(--color-brand);
}

.select-wrapper {
  position: relative;
}

.pill-select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 36px;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: var(--space-16);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-neutral-500);
  pointer-events: none;
}

/* Toggle */
.toggle {
  display: flex;
  height: 44px;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.toggle__opt {
  flex: 1;
  border: 1px solid var(--color-neutral-200);
  background: var(--color-neutral-0);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-500);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.toggle__opt:first-child {
  border-radius: var(--radius-full) 0 0 var(--radius-full);
  border-right-width: 0.5px;
}

.toggle__opt:last-child {
  border-radius: 0 var(--radius-full) var(--radius-full) 0;
  border-left-width: 0.5px;
}

.toggle__opt--active {
  background: var(--color-brand-lighter);
  border-color: var(--color-brand);
  color: var(--color-brand);
  font-weight: var(--font-weight-bold);
}

/* Actions */
.form-actions {
  display: flex;
  gap: var(--space-12);
  margin-top: var(--space-8);
}

.btn-cancel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border: 1.5px solid var(--color-neutral-200);
  border-radius: var(--radius-full);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-600);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}

.btn-cancel:hover {
  border-color: var(--color-neutral-400);
  color: var(--color-neutral-900);
}

.btn-submit {
  flex: 2;
  height: 44px;
  border-radius: var(--radius-full);
  background: var(--color-brand);
  color: var(--color-neutral-0);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family);
  cursor: pointer;
  transition: background 0.15s;
}

.btn-submit:hover   { background: var(--color-brand-hover); }
.btn-submit:active  { background: var(--color-brand-pressed); }
</style>
