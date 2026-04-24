<template>
  <div class="page">
    <AppNavbar />
    <AppBreadcrumb :items="[
      { label: 'Controle de Presença', to: '/controle-de-presenca' },
      { label: membro ? membro.nome : '...' },
    ]" />

    <div v-if="membro" class="page-content">
      <!-- Profile header -->
      <div class="profile-header">
        <div class="profile-header__inner">
          <div class="profile-avatar">{{ getInitials(membro.nome) }}</div>
          <div class="profile-info">
            <h1 class="profile-name">{{ membro.nome }}</h1>
            <div class="profile-badges">
              <PeriodBadge :period="membro.periodo" />
              <ChurchBadge :church="membro.igreja" />
            </div>
            <div class="profile-contact">
              <span>{{ membro.telefone }}</span>
              <span class="dot">·</span>
              <span>{{ membro.email }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content-row">
        <!-- Stats card -->
        <div class="stats-card card">
          <h2 class="card-title">Estatísticas</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">{{ stats.total }}</span>
              <span class="stat-label">Cultos no período</span>
            </div>
            <div class="stat-item">
              <span class="stat-value stat-value--present">{{ stats.presentes }}</span>
              <span class="stat-label">Presenças</span>
            </div>
            <div class="stat-item">
              <span class="stat-value stat-value--absent">{{ stats.ausentes }}</span>
              <span class="stat-label">Ausências</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ stats.taxa }}%</span>
              <span class="stat-label">Taxa de presença</span>
            </div>
          </div>

          <div class="ceias-section">
            <h3 class="ceias-title">Santa Ceia</h3>
            <div class="ceias-row">
              <div v-for="(attended, i) in membro.ceias" :key="i" class="ceia-detail">
                <div :class="['ceia-box', i === 2 ? 'ceia-box--large' : '', attended ? 'ceia-box--present' : 'ceia-box--absent']">
                  <svg v-if="attended" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <span class="ceia-label">{{ i + 1 }}ª Ceia</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Attendance history -->
        <div class="history-card card">
          <h2 class="card-title">Histórico de Presença</h2>

          <div class="history-list">
            <div
              v-for="culto in historicoOrdenado"
              :key="culto.id"
              class="history-item"
            >
              <div class="history-item__left">
                <PeriodBadge :period="culto.periodo" />
                <div class="history-item__info">
                  <span class="history-item__tipo">{{ culto.tipo }}</span>
                  <span class="history-item__date">{{ formatDate(culto.data) }} &middot; {{ culto.inicio }}</span>
                </div>
              </div>
              <div class="history-item__right">
                <ChurchBadge :church="culto.igreja" />
                <span
                  v-if="culto.status !== 'agendado'"
                  :class="['presence-badge', getPresenceStatus(culto) === 'presente' ? 'presence-badge--present' : 'presence-badge--absent']"
                >
                  {{ getPresenceStatus(culto) === 'presente' ? 'Presente' : 'Ausente' }}
                </span>
                <span v-else class="presence-badge presence-badge--scheduled">Agendado</span>
              </div>
            </div>

            <div v-if="historicoOrdenado.length === 0" class="empty-state">
              Nenhum culto no histórico.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Membro não encontrado.</p>
      <RouterLink to="/controle-de-presenca" class="btn-back">Voltar</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import AppBreadcrumb from '../components/AppBreadcrumb.vue'
import PeriodBadge from '../components/PeriodBadge.vue'
import ChurchBadge from '../components/ChurchBadge.vue'
import { membros, cultos, getInitials, formatDate } from '../data/mock.js'

const route = useRoute()
const membro = computed(() => membros.find((m) => m.id === Number(route.params.id)))

const historicoOrdenado = computed(() =>
  [...cultos].sort((a, b) => b.data.localeCompare(a.data))
)

function getPresenceStatus(culto) {
  if (!membro.value) return null
  if (culto.presentes.includes(membro.value.id)) return 'presente'
  return 'ausente'
}

const stats = computed(() => {
  if (!membro.value) return { total: 0, presentes: 0, ausentes: 0, taxa: 0 }
  const encerrados = cultos.filter((c) => c.status === 'encerrado' || c.status === 'ativo')
  const presentes  = encerrados.filter((c) => c.presentes.includes(membro.value.id)).length
  const total      = encerrados.length
  return {
    total,
    presentes,
    ausentes: total - presentes,
    taxa: total > 0 ? Math.round((presentes / total) * 100) : 0,
  }
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #F3F4F6;
}

.page-content {
  margin-top: 80px;
}

/* Profile header */
.profile-header {
  background: var(--color-neutral-0);
  border-bottom: 1px solid var(--color-neutral-100);
  padding: var(--space-32) var(--space-24);
}

.profile-header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-24);
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: #F8A4A7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-bold);
  color: var(--color-brand-darker);
  flex-shrink: 0;
}

.profile-name {
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  margin-bottom: var(--space-8);
}

.profile-badges {
  display: flex;
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

.profile-contact {
  display: flex;
  gap: var(--space-8);
  font-size: var(--font-size-14);
  color: var(--color-neutral-500);
}

.dot { color: var(--color-neutral-300); }

/* Content row */
.content-row {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--space-24);
  padding: var(--space-24);
}

@media (max-width: 820px) {
  .content-row { grid-template-columns: 1fr; }
}

.card {
  background: var(--color-neutral-50);
  border-radius: var(--radius-32);
  box-shadow: var(--shadow-card);
  outline: 1px solid var(--color-neutral-200);
  overflow: hidden;
}

.card-title {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  padding: var(--space-24) var(--space-24) var(--space-16);
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--color-neutral-100);
  border-top: 1px solid var(--color-neutral-100);
  border-bottom: 1px solid var(--color-neutral-100);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-16);
  background: var(--color-neutral-50);
  gap: var(--space-4);
}

.stat-value {
  font-size: var(--font-size-32);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  line-height: 1;
}

.stat-value--present { color: var(--color-success-dark); }
.stat-value--absent  { color: var(--color-brand); }

.stat-label {
  font-size: var(--font-size-12);
  color: var(--color-neutral-500);
  text-align: center;
}

/* Ceias section */
.ceias-section {
  padding: var(--space-16) var(--space-24);
}

.ceias-title {
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-12);
}

.ceias-row {
  display: flex;
  gap: var(--space-16);
}

.ceia-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.ceia-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
}

.ceia-box:not(.ceia-box--large) {
  width: 32px;
  height: 32px;
}

.ceia-box--large {
  width: 48px;
  height: 48px;
}

.ceia-box--present {
  border-color: var(--color-success);
  background: var(--color-success-light);
  color: var(--color-success-dark);
}

.ceia-box--absent {
  border-color: var(--color-brand);
  background: var(--color-brand-light);
  color: var(--color-brand);
}

.ceia-label {
  font-size: var(--font-size-10);
  color: var(--color-neutral-500);
}

/* History */
.history-list {
  overflow-y: auto;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-12) var(--space-24);
  border-bottom: 1px solid var(--color-neutral-100);
  gap: var(--space-12);
  transition: background 0.1s;
}

.history-item:hover { background: rgba(0,0,0,0.02); }

.history-item__left {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  min-width: 0;
}

.history-item__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.history-item__tipo {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-item__date {
  font-size: var(--font-size-12);
  color: var(--color-neutral-500);
}

.history-item__right {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  flex-shrink: 0;
}

.presence-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-bold);
}

.presence-badge--present {
  background: var(--color-success-light);
  color: var(--color-success-dark);
}

.presence-badge--absent {
  background: var(--color-brand-light);
  color: var(--color-brand);
}

.presence-badge--scheduled {
  background: #EFF6FF;
  color: #2563EB;
}

/* Not found */
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
