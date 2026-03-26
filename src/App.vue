<template>
  <div class="app">

    <!-- Top navbar -->
    <header class="navbar">
      <div class="navbar__logo-area">
        <div class="navbar__hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="navbar__logo">
          <span class="navbar__logo-text">ORCAFASCIO</span>
        </div>
      </div>

      <!-- Top action tabs -->
      <nav class="navbar__tabs">
        <button class="navbar__tab">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4h12v12H4z" stroke="#80a8cc" stroke-width="1.5"/></svg>
          <span>Exibir</span>
        </button>
        <button class="navbar__tab">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 16l2-2 8-8-2-2-8 8-2 2z" stroke="#80a8cc" stroke-width="1.5"/></svg>
          <span>Editar</span>
        </button>
        <button class="navbar__tab">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6" stroke="#80a8cc" stroke-width="1.5"/></svg>
          <span>Ferramentas</span>
        </button>
        <button class="navbar__tab">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 14l3-4 3 2 3-4 3 3" stroke="#80a8cc" stroke-width="1.5"/></svg>
          <span>Relatórios</span>
        </button>
      </nav>

      <div class="navbar__profile">
        <div class="navbar__avatar">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#3473ad"/><circle cx="20" cy="16" r="7" fill="#80a8d5"/><ellipse cx="20" cy="34" rx="12" ry="8" fill="#80a8d5"/></svg>
        </div>
      </div>
    </header>

    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <nav class="sidebar__nav">
          <a href="#" class="sidebar__item">
            <svg class="sidebar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8L8 2L14 8V14H10V10H6V14H2V8Z" stroke="#868e96" stroke-width="1.2" stroke-linejoin="round"/></svg>
            <span>Home</span>
          </a>
          <a href="#" class="sidebar__item sidebar__item--has-arrow">
            <svg class="sidebar__icon" width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5H12M8 1L12 5L8 9" stroke="#868e96" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Orçamentos</span>
            <svg class="sidebar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M9 1L5 5L1 1" stroke="#868e96" stroke-width="1.2" stroke-linecap="round"/></svg>
          </a>
          <a href="#" class="sidebar__item sidebar__item--has-arrow">
            <svg class="sidebar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2h12v12H2z" stroke="#868e96" stroke-width="1.2"/></svg>
            <span>Bases Adicionais</span>
            <svg class="sidebar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M9 1L5 5L1 1" stroke="#868e96" stroke-width="1.2" stroke-linecap="round"/></svg>
          </a>
          <a href="#" class="sidebar__item">
            <svg class="sidebar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#868e96" stroke-width="1.2"/></svg>
            <span>Medições</span>
          </a>
          <a href="#" class="sidebar__item sidebar__item--has-arrow">
            <svg class="sidebar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12l1-4 3 2 3-4 1 3" stroke="#868e96" stroke-width="1.2" stroke-linecap="round"/></svg>
            <span>Diário de obras</span>
            <svg class="sidebar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M9 1L5 5L1 1" stroke="#868e96" stroke-width="1.2" stroke-linecap="round"/></svg>
          </a>
          <a href="#" class="sidebar__item sidebar__item--has-arrow">
            <svg class="sidebar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 6h10M3 10h7" stroke="#868e96" stroke-width="1.2" stroke-linecap="round"/></svg>
            <span>Compras</span>
            <svg class="sidebar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M9 1L5 5L1 1" stroke="#868e96" stroke-width="1.2" stroke-linecap="round"/></svg>
          </a>
          <a href="#" class="sidebar__item sidebar__item--has-arrow">
            <svg class="sidebar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1" stroke="#868e96" stroke-width="1.2"/></svg>
            <span>Planejamentos</span>
            <svg class="sidebar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M9 1L5 5L1 1" stroke="#868e96" stroke-width="1.2" stroke-linecap="round"/></svg>
          </a>
          <a href="#" class="sidebar__item sidebar__item--has-arrow">
            <svg class="sidebar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M4 5h8M4 11h5" stroke="#868e96" stroke-width="1.2" stroke-linecap="round"/></svg>
            <span>Cadastros</span>
            <svg class="sidebar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M9 1L5 5L1 1" stroke="#868e96" stroke-width="1.2" stroke-linecap="round"/></svg>
          </a>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="main">
        <!-- Sub-header with page title -->
        <div class="page-header">
          <div class="page-header__info">
            <div class="page-header__icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none"><rect width="60" height="60" rx="4" fill="#E9ECEF"/><path d="M16 20h28M16 30h28M16 40h20" stroke="#6C757D" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <div>
              <h1 class="page-header__title">Orçamento</h1>
              <p class="page-header__subtitle">Nome do orçamento criado</p>
            </div>
          </div>
        </div>

        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <a href="#" class="breadcrumb__item breadcrumb__item--link">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M1 6L7 1L13 6V11H9V7H5V11H1V6Z" stroke="#0866C6" stroke-width="1.2" stroke-linejoin="round"/></svg>
            Home
          </a>
          <span class="breadcrumb__sep">/</span>
          <a href="#" class="breadcrumb__item breadcrumb__item--link">
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 5H9M6 1L10 5L6 9" stroke="#0866C6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Orçamentos
          </a>
          <span class="breadcrumb__sep">/</span>
          <a href="#" class="breadcrumb__item breadcrumb__item--link">Orçamento</a>
        </div>

        <!-- Content area -->
        <div class="content-area">
          <div class="content-placeholder">
            <p class="content-placeholder__text">Tabela de itens do orçamento</p>
            <button class="btn-demo" @click="showModal = true">
              Abrir modal "Substituir Item"
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal -->
    <SubstituirItemModal v-model="showModal" :item="currentItem" :balance="164.7475236" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SubstituirItemModal from './components/SubstituirItemModal.vue'

const showModal = ref(true)

const currentItem = ref({
  code: '98525',
  date: '09/2025',
  base: 'SINAPI',
  description: 'LIMPEZA MECANIZADA DE CAMADA VEGETAL, VEGETAÇÃO E PEQUENAS ÁRVORES (DIÂMETRO DE TRONCO MENOR QUE 0,20 M), COM TRATOR DE ESTEIRAS. AF_03/2024',
  unit: 'm²',
  value: '123456,12',
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #d9d9d9;
}

/* ── Navbar ── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: #0866c6;
  display: flex;
  align-items: center;
  z-index: 100;
}

.navbar__logo-area {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 240px;
  padding: 0 24px;
  background: #0759ad;
  height: 100%;
  flex-shrink: 0;
}

.navbar__hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.navbar__hamburger span {
  display: block;
  width: 16px;
  height: 2px;
  background: #80a8d5;
  border-radius: 1px;
}

.navbar__logo {
  flex: 1;
}

.navbar__logo-text {
  font-size: 11px;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
}

.navbar__tabs {
  display: flex;
  align-items: stretch;
  height: 100%;
}

.navbar__tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100px;
  height: 100%;
  color: #80a8cc;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  border-right: 1px solid #3473ad;
  transition: background 0.15s;
}

.navbar__tab:first-child {
  border-left: 1px solid #3473ad;
}

.navbar__tab:hover {
  background: rgba(255,255,255,0.08);
}

.navbar__profile {
  margin-left: auto;
  padding-right: 16px;
}

.navbar__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #80a8d5;
}

/* ── Layout ── */
.layout {
  display: flex;
  margin-top: 72px;
  min-height: calc(100vh - 72px);
}

/* ── Sidebar ── */
.sidebar {
  width: 240px;
  background: #212529;
  flex-shrink: 0;
  min-height: 100%;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 43px;
  color: #868e96;
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  border-bottom: 1px solid #282d31;
  transition: background 0.15s;
}

.sidebar__item:hover {
  background: #282d31;
}

.sidebar__icon {
  flex-shrink: 0;
  width: 16px;
}

.sidebar__arrow {
  margin-left: auto;
  flex-shrink: 0;
}

/* ── Main content ── */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

/* ── Page header ── */
.page-header {
  background: #0866c6;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.page-header__info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-header__title {
  font-size: 32px;
  font-weight: 300;
  color: #0866c6;
  background: white;
  padding: 2px 8px;
  border-radius: 2px;
  line-height: normal;
}

.page-header__subtitle {
  font-size: 14px;
  color: #868e96;
  margin-top: 4px;
}

/* ── Breadcrumb ── */
.breadcrumb {
  background: #e9ecef;
  height: 42px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
}

.breadcrumb__item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #868e96;
}

.breadcrumb__item--link {
  color: #0866c6;
  text-decoration: none;
}

.breadcrumb__sep {
  font-size: 12px;
  color: #868e96;
}

/* ── Content area ── */
.content-area {
  flex: 1;
  padding: 24px 16px;
  background: white;
}

.content-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 200px;
  border: 2px dashed #dee2e6;
  border-radius: 4px;
  padding: 32px;
}

.content-placeholder__text {
  font-size: 14px;
  color: #868e96;
}

.btn-demo {
  padding: 8px 24px;
  background: #0866c6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-family);
  transition: background 0.15s;
}

.btn-demo:hover {
  background: #053d77;
}
</style>
