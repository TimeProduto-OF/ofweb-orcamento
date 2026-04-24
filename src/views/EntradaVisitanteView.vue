<template>
  <div class="page">
    <AppNavbar />
    <AppBreadcrumb :items="[
      { label: 'Controle de Presença', to: '/controle-de-presenca' },
      { label: culto ? culto.tipo : '...', to: culto ? `/controle-de-presenca/${culto.id}` : undefined },
      { label: 'Entrada de Visitante' },
    ]" />

    <div class="page-content">
      <div class="form-card">
        <!-- Step indicator -->
        <div class="steps">
          <div :class="['step', step >= 1 && 'step--done', step === 1 && 'step--active']">
            <div class="step__circle">{{ step > 1 ? '✓' : '1' }}</div>
            <span class="step__label">Identificação</span>
          </div>
          <div class="step__line" :class="step >= 2 && 'step__line--done'" />
          <div :class="['step', step >= 2 && 'step--active']">
            <div class="step__circle">2</div>
            <span class="step__label">Contato</span>
          </div>
        </div>

        <!-- Step 1 -->
        <template v-if="step === 1">
          <h1 class="form-title">Identificação</h1>

          <div class="form">
            <div class="field">
              <label class="field__label">Nome completo</label>
              <input
                v-model="form.nome"
                type="text"
                class="pill-input"
                placeholder="Nome do visitante"
                required
              />
            </div>

            <div class="field">
              <label class="field__label">Sexo</label>
              <div class="toggle">
                <button
                  type="button"
                  :class="['toggle__opt', form.sexo === 'M' && 'toggle__opt--active']"
                  @click="form.sexo = 'M'"
                >Masculino</button>
                <button
                  type="button"
                  :class="['toggle__opt', form.sexo === 'F' && 'toggle__opt--active']"
                  @click="form.sexo = 'F'"
                >Feminino</button>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <RouterLink :to="culto ? `/controle-de-presenca/${culto.id}` : '/controle-de-presenca'" class="btn-cancel">
              Cancelar
            </RouterLink>
            <button class="btn-submit" :disabled="!form.nome.trim()" @click="nextStep">
              Próximo
            </button>
          </div>
        </template>

        <!-- Step 2 -->
        <template v-else>
          <h1 class="form-title">Contato</h1>

          <div class="form">
            <div class="field-row">
              <div class="field">
                <label class="field__label">Telefone</label>
                <input v-model="form.telefone" type="tel" class="pill-input" placeholder="(11) 99999-9999" />
              </div>
              <div class="field">
                <label class="field__label">E-mail</label>
                <input v-model="form.email" type="email" class="pill-input" placeholder="email@exemplo.com" />
              </div>
            </div>

            <div class="field-row">
              <div class="field field--cep">
                <label class="field__label">CEP</label>
                <div class="input-with-btn">
                  <input
                    v-model="form.cep"
                    type="text"
                    class="pill-input"
                    placeholder="00000-000"
                    maxlength="9"
                    @blur="fetchCep"
                    @input="maskCep"
                  />
                  <button type="button" class="btn-cep" @click="fetchCep" :disabled="cepLoading">
                    <svg v-if="cepLoading" class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.3"/>
                      <path d="M9.5 9.5L13 13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="field__label">Endereço</label>
              <input
                v-model="form.endereco"
                type="text"
                class="pill-input"
                :class="form.endereco ? 'pill-input--filled' : ''"
                placeholder="Rua, Avenida..."
                :disabled="cepFilled"
              />
            </div>

            <div class="field-row">
              <div class="field field--short">
                <label class="field__label">Número</label>
                <input v-model="form.numero" type="text" class="pill-input" placeholder="Nº" />
              </div>
              <div class="field">
                <label class="field__label">Complemento</label>
                <input v-model="form.complemento" type="text" class="pill-input" placeholder="Apto, casa..." />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button class="btn-cancel" @click="step = 1">Voltar</button>
            <button class="btn-submit" @click="salvar">Salvar Visitante</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import AppBreadcrumb from '../components/AppBreadcrumb.vue'
import { cultos, visitantes } from '../data/mock.js'

const route  = useRoute()
const router = useRouter()

const culto = computed(() => cultos.find((c) => c.id === Number(route.params.id)))

const step = ref(1)
const cepLoading = ref(false)
const cepFilled = ref(false)

const form = ref({
  nome:        '',
  sexo:        'M',
  telefone:    '',
  email:       '',
  cep:         '',
  endereco:    '',
  numero:      '',
  complemento: '',
})

function nextStep() {
  if (form.value.nome.trim()) step.value = 2
}

function maskCep(e) {
  let v = e.target.value.replace(/\D/g, '')
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8)
  form.value.cep = v
}

async function fetchCep() {
  const raw = form.value.cep.replace(/\D/g, '')
  if (raw.length !== 8) return
  cepLoading.value = true
  try {
    const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
    const data = await res.json()
    if (!data.erro) {
      form.value.endereco = `${data.logradouro}${data.bairro ? ', ' + data.bairro : ''}`
      cepFilled.value = true
    }
  } catch {
    // ignore network errors
  } finally {
    cepLoading.value = false
  }
}

function salvar() {
  const newId = visitantes.length + 1
  const novo = {
    id:          newId,
    nome:        form.value.nome,
    sexo:        form.value.sexo,
    telefone:    form.value.telefone,
    email:       form.value.email,
    cep:         form.value.cep,
    endereco:    form.value.endereco,
    numero:      form.value.numero,
    complemento: form.value.complemento,
  }
  visitantes.push(novo)
  if (culto.value) {
    culto.value.visitantes.push(newId)
  }
  router.push(culto.value ? `/controle-de-presenca/${culto.value.id}` : '/controle-de-presenca')
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
  max-width: 560px;
}

/* Steps */
.steps {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-32);
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.step__circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--color-neutral-200);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-400);
  background: var(--color-neutral-0);
  transition: all 0.2s;
}

.step--active .step__circle,
.step--done .step__circle {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: var(--color-neutral-0);
}

.step__label {
  font-size: var(--font-size-12);
  color: var(--color-neutral-400);
  font-weight: var(--font-weight-medium);
}

.step--active .step__label,
.step--done .step__label {
  color: var(--color-brand);
}

.step__line {
  flex: 1;
  height: 2px;
  background: var(--color-neutral-200);
  margin: 0 var(--space-8);
  margin-bottom: 14px;
  transition: background 0.2s;
}

.step__line--done {
  background: var(--color-brand);
}

/* Form */
.form-title {
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  margin-bottom: var(--space-24);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  margin-bottom: var(--space-24);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  flex: 1;
}

.field--short { max-width: 100px; }
.field--cep   { max-width: 200px; }

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

.pill-input {
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

.pill-input:focus     { border-color: var(--color-neutral-500); }
.pill-input--filled   { border-color: var(--color-brand); }
.pill-input:disabled  {
  background: var(--color-neutral-100);
  color: var(--color-neutral-500);
  cursor: not-allowed;
}

/* CEP input with button */
.input-with-btn {
  display: flex;
  gap: var(--space-8);
}

.btn-cep {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: var(--color-neutral-100);
  color: var(--color-neutral-600);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-cep:hover:not(:disabled) { background: var(--color-neutral-200); }
.btn-cep:disabled { opacity: 0.5; cursor: not-allowed; }

@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }

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
  background: none;
  font-family: var(--font-family);
  cursor: pointer;
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

.btn-submit:hover:not(:disabled)  { background: var(--color-brand-hover); }
.btn-submit:active { background: var(--color-brand-pressed); }
.btn-submit:disabled {
  background: var(--color-neutral-200);
  color: var(--color-neutral-400);
  cursor: not-allowed;
}
</style>
