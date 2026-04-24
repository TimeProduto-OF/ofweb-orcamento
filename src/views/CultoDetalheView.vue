<template>
  <div class="page">
    <AppNavbar />
    <AppBreadcrumb :items="[
      { label: 'Controle de Presença', to: '/controle-de-presenca' },
      { label: culto ? culto.tipo : '...' },
    ]" />

    <div v-if="culto" class="page-content">
      <!-- Header stats -->
      <div class="culto-header">
        <div class="culto-header__info">
          <div class="culto-header__badges">
            <PeriodBadge :period="culto.periodo" />
            <ChurchBadge :church="culto.igreja" />
            <span :class="['status-badge', `status-badge--${culto.status}`]">
              {{ statusLabel }}
            </span>
          </div>
          <h1 class="culto-header__title">{{ culto.tipo }}</h1>
          <p class="culto-header__date">
            {{ formatDate(culto.data) }} &middot; {{ culto.inicio }} – {{ culto.termino }}
          </p>
        </div>

        <div class="culto-header__stats">
          <div class="hstat">
            <span class="hstat__value hstat__value--present">{{ culto.presentes.length }}</span>
            <span class="hstat__label">Presentes</span>
          </div>
          <div class="hstat">
            <span class="hstat__value hstat__value--absent">{{ absentCount }}</span>
            <span class="hstat__label">Ausentes</span>
          </div>
          <div class="hstat">
            <span class="hstat__value">{{ culto.visitantes.length }}</span>
            <span class="hstat__label">Visitantes</span>
          </div>
          <div class="hstat">
            <span class="hstat__value">{{ presenceRate }}%</span>
            <span class="hstat__label">Presença</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="actions-bar">
        <template v-if="culto.status === 'agendado'">
          <button class="btn-action btn-action--primary" @click="iniciarCulto">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3l8 5-8 5V3Z" fill="currentColor"/></svg>
            Iniciar Culto
          </button>
        </template>
        <template v-else-if="culto.status === 'ativo'">
          <button class="btn-action btn-action--danger" @click="encerrarCulto">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="3" width="10" height="10" rx="1" fill="currentColor"/></svg>
            Encerrar Culto
          </button>
          <RouterLink :to="`/controle-de-presenca/${culto.id}/entrada-visitante`" class="btn-action btn-action--outline">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M12 2l2 2-2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            Entrada Visitante
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink :to="`/controle-de-presenca/${culto.id}/entrada-visitante`" class="btn-action btn-action--outline">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            Ver Visitantes
          </RouterLink>
        </template>
      </div>

      <!-- Content card -->
      <div class="content-card">
        <!-- Tabs -->
        <div class="tabs">
          <button
            v-for="t in tabs"
            :key="t.key"
            :class="['tab', activeTab === t.key && 'tab--active']"
            @click="activeTab = t.key"
          >
            {{ t.label }}
            <span class="tab__count">{{ t.count }}</span>
          </button>
        </div>

        <!-- Search -->
        <div class="search-wrapper">
          <svg class="search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M9.5 9.5L13 13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
          <input v-model="search" type="text" class="search-input" placeholder="Buscar membro..." />
        </div>

        <!-- Table: Presentes / Ausentes -->
        <div v-if="activeTab !== 'visitantes'">
          <div class="member-table">
            <div class="member-table__header">
              <span>Membro</span>
              <span>Período</span>
              <span>Ceias</span>
              <span>Igreja</span>
              <template v-if="culto.status === 'ativo' && activeTab === 'ausentes'">
                <span>Ação</span>
              </template>
            </div>
            <div
              v-for="membro in filteredList"
              :key="membro.id"
              class="member-row"
            >
              <div class="member-row__identity">
                <div class="member-avatar">{{ getInitials(membro.nome) }}</div>
                <RouterLink :to="`/membros/${membro.id}`" class="member-name">{{ membro.nome }}</RouterLink>
              </div>
              <PeriodBadge :period="membro.periodo" />
              <CeiasIndicator :ceias="membro.ceias" />
              <ChurchBadge :church="membro.igreja" />
              <template v-if="culto.status === 'ativo' && activeTab === 'ausentes'">
                <button class="btn-bipar" @click="bipar(membro.id)">Bipar</button>
              </template>
              <template v-if="culto.status === 'ativo' && activeTab === 'presentes'">
                <button class="btn-remove" @click="desbipar(membro.id)" title="Remover presença">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </button>
              </template>
            </div>
            <div v-if="filteredList.length === 0" class="empty-state">
              Nenhum membro encontrado.
            </div>
          </div>
        </div>

        <!-- Visitantes tab -->
        <div v-else>
          <div class="member-table">
            <div class="member-table__header">
              <span>Visitante</span>
              <span>Sexo</span>
              <span>Telefone</span>
              <span>E-mail</span>
            </div>
            <div v-for="v in filteredVisitantes" :key="v.id" class="member-row">
              <div class="member-row__identity">
                <div class="member-avatar">{{ getInitials(v.nome) }}</div>
                <span class="member-name">{{ v.nome }}</span>
              </div>
              <span class="meta-text">{{ v.sexo === 'M' ? 'Masculino' : 'Feminino' }}</span>
              <span class="meta-text">{{ v.telefone || '—' }}</span>
              <span class="meta-text">{{ v.email || '—' }}</span>
            </div>
            <div v-if="filteredVisitantes.length === 0" class="empty-state">
              Nenhum visitante registrado.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Culto não encontrado.</p>
      <RouterLink to="/controle-de-presenca" class="btn-back">Voltar</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import AppBreadcrumb from '../components/AppBreadcrumb.vue'
import PeriodBadge from '../components/PeriodBadge.vue'
import ChurchBadge from '../components/ChurchBadge.vue'
import CeiasIndicator from '../components/CeiasIndicator.vue'
import { cultos, membros, visitantes, getInitials, formatDate } from '../data/mock.js'

const route = useRoute()
const culto = computed(() => cultos.find((c) => c.id === Number(route.params.id)))

const activeTab = ref('presentes')
const search = ref('')

const statusLabel = computed(() => {
  const s = culto.value?.status
  if (s === 'ativo')     return 'Em andamento'
  if (s === 'encerrado') return 'Encerrado'
  return 'Agendado'
})

const absentCount = computed(() => {
  if (!culto.value) return 0
  if (culto.value.status === 'encerrado') return culto.value.ausentes.length
  return membros.length - culto.value.presentes.length
})

const presenceRate = computed(() => {
  if (!culto.value || membros.length === 0) return 0
  return Math.round((culto.value.presentes.length / membros.length) * 100)
})

const presentesMembros = computed(() =>
  culto.value ? membros.filter((m) => culto.value.presentes.includes(m.id)) : []
)

const ausentesMembros = computed(() => {
  if (!culto.value) return []
  if (culto.value.status === 'encerrado')
    return membros.filter((m) => culto.value.ausentes.includes(m.id))
  return membros.filter((m) => !culto.value.presentes.includes(m.id))
})

const cultoVisitantes = computed(() =>
  culto.value ? visitantes.filter((v) => culto.value.visitantes.includes(v.id)) : []
)

const tabs = computed(() => [
  { key: 'presentes',  label: 'Presentes',  count: presentesMembros.value.length },
  { key: 'ausentes',   label: 'Ausentes',   count: ausentesMembros.value.length },
  { key: 'visitantes', label: 'Visitantes', count: cultoVisitantes.value.length },
])

const activeList = computed(() =>
  activeTab.value === 'presentes' ? presentesMembros.value : ausentesMembros.value
)

const filteredList = computed(() => {
  const q = search.value.trim().toLowerCase()
  return q ? activeList.value.filter((m) => m.nome.toLowerCase().includes(q)) : activeList.value
})

const filteredVisitantes = computed(() => {
  const q = search.value.trim().toLowerCase()
  return q ? cultoVisitantes.value.filter((v) => v.nome.toLowerCase().includes(q)) : cultoVisitantes.value
})

function bipar(membroId) {
  const c = culto.value
  if (!c.presentes.includes(membroId)) {
    c.presentes.push(membroId)
    const idx = c.ausentes.indexOf(membroId)
    if (idx !== -1) c.ausentes.splice(idx, 1)
  }
}

function desbipar(membroId) {
  const c = culto.value
  const idx = c.presentes.indexOf(membroId)
  if (idx !== -1) c.presentes.splice(idx, 1)
}

function iniciarCulto() {
  culto.value.status = 'ativo'
  // Auto-populate ausentes
  culto.value.ausentes = membros.map((m) => m.id)
}

function encerrarCulto() {
  const c = culto.value
  c.status = 'encerrado'
  c.ausentes = membros.filter((m) => !c.presentes.includes(m.id)).map((m) => m.id)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #F3F4F6;
}

.page-content {
  margin-top: 80px;
}

/* Header */
.culto-header {
  background: var(--color-neutral-0);
  padding: var(--space-24);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-24);
  border-bottom: 1px solid var(--color-neutral-100);
}

.culto-header__badges {
  display: flex;
  gap: var(--space-8);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-bold);
}

.status-badge--ativo {
  background: #DCFCE7;
  color: #16a34a;
}

.status-badge--encerrado {
  background: var(--color-neutral-100);
  color: var(--color-neutral-600);
}

.status-badge--agendado {
  background: #EFF6FF;
  color: #2563EB;
}

.culto-header__title {
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  margin-bottom: var(--space-4);
}

.culto-header__date {
  font-size: var(--font-size-14);
  color: var(--color-neutral-500);
}

.culto-header__stats {
  display: flex;
  gap: var(--space-32);
}

.hstat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.hstat__value {
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  line-height: 1;
}

.hstat__value--present { color: var(--color-success-dark); }
.hstat__value--absent  { color: var(--color-brand); }

.hstat__label {
  font-size: var(--font-size-12);
  color: var(--color-neutral-500);
}

/* Actions bar */
.actions-bar {
  display: flex;
  gap: var(--space-12);
  padding: var(--space-16) var(--space-24);
  background: var(--color-neutral-0);
  border-bottom: 1px solid var(--color-neutral-100);
  flex-wrap: wrap;
}

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: var(--space-8);
  padding: 10px var(--space-24);
  border-radius: var(--radius-full);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.btn-action--primary {
  background: var(--color-brand);
  color: var(--color-neutral-0);
}
.btn-action--primary:hover { background: var(--color-brand-hover); }

.btn-action--danger {
  background: var(--color-brand);
  color: var(--color-neutral-0);
}
.btn-action--danger:hover { background: var(--color-brand-pressed); }

.btn-action--outline {
  background: var(--color-neutral-0);
  color: var(--color-neutral-900);
  border: 1.5px solid var(--color-neutral-200);
}
.btn-action--outline:hover { border-color: var(--color-neutral-400); }

/* Content card */
.content-card {
  background: var(--color-neutral-50);
  margin: var(--space-24);
  border-radius: var(--radius-32);
  box-shadow: var(--shadow-card);
  outline: 1px solid var(--color-neutral-200);
  overflow: hidden;
}

/* Tabs */
.tabs {
  display: flex;
  border-bottom: 1px solid var(--color-neutral-100);
  padding: 0 var(--space-24);
}

.tab {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-16) var(--space-16);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-400);
  border-bottom: 4px solid transparent;
  margin-bottom: -1px;
  transition: color 0.15s, border-color 0.15s;
}

.tab--active {
  color: var(--color-brand);
  border-bottom-color: var(--color-brand);
  font-weight: var(--font-weight-bold);
}

.tab__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: var(--radius-full);
  background: var(--color-neutral-100);
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-600);
}

/* Search */
.search-wrapper {
  position: relative;
  margin: var(--space-16) var(--space-24);
}

.search-icon {
  position: absolute;
  left: var(--space-16);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-neutral-400);
  pointer-events: none;
}

.search-input {
  width: 100%;
  max-width: 360px;
  height: 40px;
  padding: 0 var(--space-16) 0 36px;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-full);
  background: var(--color-neutral-0);
  font-size: var(--font-size-14);
  color: var(--color-neutral-900);
  outline: none;
  transition: border-color 0.15s;
  font-family: var(--font-family);
}

.search-input:focus { border-color: var(--color-neutral-500); }

/* Member table */
.member-table {
  width: 100%;
}

.member-table__header {
  display: grid;
  grid-template-columns: 2fr 90px 80px 90px 80px;
  padding: var(--space-8) var(--space-24);
  background: var(--color-neutral-100);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-600);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.member-row {
  display: grid;
  grid-template-columns: 2fr 90px 80px 90px 80px;
  align-items: center;
  padding: var(--space-12) var(--space-24);
  border-bottom: 1px solid var(--color-neutral-100);
  transition: background 0.1s;
}

.member-row:hover { background: rgba(0,0,0,0.02); }

.member-row__identity {
  display: flex;
  align-items: center;
  gap: var(--space-12);
  min-width: 0;
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 28px;
  background: #F8A4A7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-bold);
  color: var(--color-brand-darker);
  flex-shrink: 0;
}

.member-name {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

a.member-name:hover { color: var(--color-brand); }

.meta-text {
  font-size: var(--font-size-14);
  color: var(--color-neutral-600);
}

.btn-bipar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  background: var(--color-brand);
  color: var(--color-neutral-0);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family);
  cursor: pointer;
  transition: background 0.15s;
}
.btn-bipar:hover { background: var(--color-brand-hover); }

.btn-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-8);
  color: var(--color-neutral-400);
  transition: background 0.15s, color 0.15s;
}
.btn-remove:hover {
  background: var(--color-brand-light);
  color: var(--color-brand);
}

/* Empty / not found */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-48);
  color: var(--color-neutral-400);
  font-size: var(--font-size-14);
}

.not-found {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-16);
  min-height: 60vh;
  color: var(--color-neutral-500);
}

.btn-back {
  padding: 10px var(--space-24);
  background: var(--color-brand);
  color: var(--color-neutral-0);
  border-radius: var(--radius-full);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
}
</style>
