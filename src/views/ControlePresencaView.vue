<template>
  <div class="page">
    <AppNavbar />
    <AppBreadcrumb :items="[{ label: 'Controle de Presença' }]" />

    <div class="page-content">
      <div class="page-top">
        <h1 class="page-title">Controle de Presença</h1>
        <RouterLink to="/controle-de-presenca/novo-culto" class="btn-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Novo Culto
        </RouterLink>
      </div>

      <div class="cards-grid">
        <!-- Cultos card -->
        <div class="card">
          <div class="card__header">
            <h2 class="card__title">Cultos</h2>
          </div>

          <div class="tabs">
            <button
              :class="['tab', activeTab === 'ultimos' && 'tab--active']"
              @click="activeTab = 'ultimos'"
            >Últimos cultos</button>
            <button
              :class="['tab', activeTab === 'proximos' && 'tab--active']"
              @click="activeTab = 'proximos'"
            >Próximos cultos</button>
          </div>

          <!-- Culto ativo -->
          <div v-if="cultoAtivo" class="culto-ativo">
            <div class="culto-ativo__header">
              <div class="culto-ativo__badge">
                <span class="pulse" />
                Em andamento
              </div>
              <ChurchBadge :church="cultoAtivo.igreja" />
            </div>
            <div class="culto-ativo__tipo">{{ cultoAtivo.tipo }}</div>
            <div class="culto-ativo__meta">
              <PeriodBadge :period="cultoAtivo.periodo" />
              <span class="culto-ativo__date">{{ formatDate(cultoAtivo.data) }}</span>
              <span class="culto-ativo__time">{{ cultoAtivo.inicio }} – {{ cultoAtivo.termino }}</span>
            </div>
            <div class="culto-ativo__stats">
              <div class="stat">
                <span class="stat__value stat__value--present">{{ cultoAtivo.presentes.length }}</span>
                <span class="stat__label">Presentes</span>
              </div>
              <div class="stat">
                <span class="stat__value stat__value--absent">{{ totalMembros - cultoAtivo.presentes.length }}</span>
                <span class="stat__label">Ausentes</span>
              </div>
              <div class="stat">
                <span class="stat__value">{{ cultoAtivo.visitantes.length }}</span>
                <span class="stat__label">Visitantes</span>
              </div>
            </div>
            <RouterLink :to="`/controle-de-presenca/${cultoAtivo.id}`" class="btn-primary btn-primary--full">
              Ir para o culto
            </RouterLink>
          </div>

          <!-- Cultos list -->
          <div class="cultos-list">
            <RouterLink
              v-for="culto in filteredCultos"
              :key="culto.id"
              :to="`/controle-de-presenca/${culto.id}`"
              class="culto-item"
            >
              <div class="culto-item__left">
                <PeriodBadge :period="culto.periodo" />
                <div class="culto-item__info">
                  <span class="culto-item__tipo">{{ culto.tipo }}</span>
                  <span class="culto-item__date">{{ formatDate(culto.data) }} &middot; {{ culto.inicio }}</span>
                </div>
              </div>
              <div class="culto-item__right">
                <ChurchBadge :church="culto.igreja" />
                <template v-if="culto.status === 'encerrado'">
                  <span class="culto-item__stat culto-item__stat--present">{{ culto.presentes.length }} pres.</span>
                  <span class="culto-item__stat culto-item__stat--absent">{{ culto.ausentes.length }} aus.</span>
                </template>
                <span v-else class="culto-item__agendado">Agendado</span>
                <svg class="culto-item__chevron" width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                </svg>
              </div>
            </RouterLink>
            <div v-if="filteredCultos.length === 0" class="empty-state">
              <span>Nenhum culto encontrado.</span>
            </div>
          </div>
        </div>

        <!-- Membros card -->
        <div class="card">
          <div class="card__header">
            <h2 class="card__title">Membros <span class="card__count">{{ membros.length }}</span></h2>
          </div>

          <div class="search-wrapper">
            <svg class="search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.3"/>
              <path d="M9.5 9.5L13 13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
            <input
              v-model="searchMembro"
              type="text"
              class="search-input"
              placeholder="Buscar membro..."
            />
          </div>

          <div class="membros-list">
            <RouterLink
              v-for="membro in filteredMembros"
              :key="membro.id"
              :to="`/membros/${membro.id}`"
              class="membro-item"
            >
              <div class="membro-avatar">{{ getInitials(membro.nome) }}</div>
              <div class="membro-info">
                <span class="membro-nome">{{ membro.nome }}</span>
                <div class="membro-meta">
                  <PeriodBadge :period="membro.periodo" />
                  <ChurchBadge :church="membro.igreja" />
                </div>
              </div>
              <CeiasIndicator :ceias="membro.ceias" />
            </RouterLink>
            <div v-if="filteredMembros.length === 0" class="empty-state">
              <span>Nenhum membro encontrado.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import AppBreadcrumb from '../components/AppBreadcrumb.vue'
import PeriodBadge from '../components/PeriodBadge.vue'
import ChurchBadge from '../components/ChurchBadge.vue'
import CeiasIndicator from '../components/CeiasIndicator.vue'
import { cultos, membros, getInitials, formatDate } from '../data/mock.js'

const activeTab = ref('ultimos')
const searchMembro = ref('')

const today = new Date().toISOString().slice(0, 10)

const cultoAtivo = computed(() => cultos.find((c) => c.status === 'ativo'))

const filteredCultos = computed(() => {
  return cultos.filter((c) => {
    if (c.status === 'ativo') return false
    if (activeTab.value === 'ultimos') return c.data <= today && c.status === 'encerrado'
    return c.data > today || c.status === 'agendado'
  })
})

const filteredMembros = computed(() => {
  const q = searchMembro.value.trim().toLowerCase()
  if (!q) return membros
  return membros.filter((m) => m.nome.toLowerCase().includes(q))
})

const totalMembros = computed(() => membros.length)
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #F3F4F6;
}

.page-content {
  margin-top: 80px;
  padding: var(--space-24);
}

.page-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-24);
}

.page-title {
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-8);
  padding: 10px var(--space-24);
  background: var(--color-brand);
  color: var(--color-neutral-0);
  border-radius: var(--radius-full);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  transition: background 0.15s;
  white-space: nowrap;
}

.btn-primary:hover { background: var(--color-brand-hover); }
.btn-primary:active { background: var(--color-brand-pressed); }

.btn-primary--full {
  width: 100%;
  justify-content: center;
  margin-top: var(--space-16);
}

/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-24);
}

@media (max-width: 900px) {
  .cards-grid { grid-template-columns: 1fr; }
}

.card {
  background: var(--color-neutral-50);
  border-radius: var(--radius-32);
  box-shadow: var(--shadow-card);
  outline: 1px solid var(--color-neutral-200);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-24) var(--space-24) 0;
}

.card__title {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.card__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  background: var(--color-neutral-100);
  border-radius: var(--radius-full);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-600);
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0;
  padding: var(--space-16) var(--space-24) 0;
  border-bottom: 1px solid var(--color-neutral-100);
}

.tab {
  padding: var(--space-8) var(--space-16);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-400);
  border-bottom: 4px solid transparent;
  transition: color 0.15s, border-color 0.15s;
  margin-bottom: -1px;
}

.tab--active {
  color: var(--color-brand);
  border-bottom-color: var(--color-brand);
  font-weight: var(--font-weight-bold);
}

/* Culto ativo */
.culto-ativo {
  margin: var(--space-16) var(--space-24);
  background: var(--color-brand-light);
  border: 1.5px solid var(--color-brand-lighter);
  border-radius: var(--radius-16);
  padding: var(--space-16);
}

.culto-ativo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.culto-ativo__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-bold);
  color: var(--color-brand);
}

.pulse {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--color-brand);
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.culto-ativo__tipo {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  margin-bottom: var(--space-8);
}

.culto-ativo__meta {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

.culto-ativo__date,
.culto-ativo__time {
  font-size: var(--font-size-12);
  color: var(--color-neutral-600);
}

.culto-ativo__stats {
  display: flex;
  gap: var(--space-16);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat__value {
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
}

.stat__value--present { color: var(--color-success-dark); }
.stat__value--absent  { color: var(--color-brand); }

.stat__label {
  font-size: var(--font-size-10);
  color: var(--color-neutral-500);
}

/* Cultos list */
.cultos-list {
  flex: 1;
  overflow-y: auto;
}

.culto-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-12) var(--space-24);
  border-bottom: 1px solid var(--color-neutral-100);
  text-decoration: none;
  transition: background 0.1s;
  cursor: pointer;
  gap: var(--space-12);
}

.culto-item:hover { background: var(--color-neutral-50); }

.culto-item__left {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  min-width: 0;
}

.culto-item__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.culto-item__tipo {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.culto-item__date {
  font-size: var(--font-size-12);
  color: var(--color-neutral-500);
}

.culto-item__right {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  flex-shrink: 0;
}

.culto-item__stat {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-medium);
}

.culto-item__stat--present { color: var(--color-success-dark); }
.culto-item__stat--absent  { color: var(--color-brand); }

.culto-item__agendado {
  font-size: var(--font-size-12);
  color: var(--color-neutral-500);
}

.culto-item__chevron { color: var(--color-neutral-400); }

/* Search */
.search-wrapper {
  position: relative;
  margin: var(--space-16) var(--space-24) var(--space-8);
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
  height: 40px;
  padding: 0 var(--space-16) 0 36px;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-full);
  background: var(--color-neutral-0);
  font-size: var(--font-size-14);
  color: var(--color-neutral-900);
  outline: none;
  transition: border-color 0.15s;
}

.search-input:focus { border-color: var(--color-neutral-500); }

/* Membros list */
.membros-list {
  flex: 1;
  overflow-y: auto;
}

.membro-item {
  display: flex;
  align-items: center;
  gap: var(--space-12);
  padding: var(--space-12) var(--space-24);
  border-bottom: 1px solid var(--color-neutral-100);
  text-decoration: none;
  transition: background 0.1s;
  cursor: pointer;
}

.membro-item:hover { background: var(--color-neutral-50); }

.membro-avatar {
  width: 40px;
  height: 40px;
  border-radius: 28px;
  background: #F8A4A7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  color: var(--color-brand-darker);
  flex-shrink: 0;
}

.membro-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.membro-nome {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.membro-meta {
  display: flex;
  gap: var(--space-4);
}

/* Empty state */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-48);
  color: var(--color-neutral-400);
  font-size: var(--font-size-14);
}
</style>
