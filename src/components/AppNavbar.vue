<template>
  <header class="navbar">
    <div class="navbar__brand">
      <div class="navbar__logo">
        <span class="navbar__logo-letter">A</span>
      </div>
      <span class="navbar__system-name">ADNIPO</span>
    </div>

    <div class="navbar__actions">
      <button class="navbar__icon-btn" title="Notificações">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2a6 6 0 0 0-6 6v2.586l-1.707 1.707A1 1 0 0 0 3 14h14a1 1 0 0 0 .707-1.707L16 10.586V8a6 6 0 0 0-6-6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M8 14a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </button>
      <button class="navbar__icon-btn" title="Configurações">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
          <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="navbar__user">
        <div class="navbar__avatar">
          <span>AD</span>
        </div>
        <div class="navbar__user-info">
          <span class="navbar__user-name">Administrador</span>
          <span class="navbar__user-role">Admin</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 79px;
  background: rgba(249, 250, 251, 0.30);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-24);
  z-index: 100;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: var(--space-12);
}

.navbar__logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.navbar__logo-letter {
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-0);
  line-height: 1;
}

.navbar__system-name {
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  letter-spacing: 1px;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.navbar__icon-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-neutral-500);
  transition: background 0.15s, color 0.15s;
}

.navbar__icon-btn:hover {
  background: var(--color-neutral-100);
  color: var(--color-neutral-900);
}

.navbar__user {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  margin-left: var(--space-8);
  cursor: pointer;
}

.navbar__avatar {
  width: 40px;
  height: 40px;
  border-radius: 28px;
  background: #F8A4A7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.navbar__avatar span {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  color: var(--color-brand-darker);
}

.navbar__user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.navbar__user-name {
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
}

.navbar__user-role {
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-medium);
  color: var(--color-brand);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
