import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/controle-de-presenca' },
  {
    path: '/controle-de-presenca',
    component: () => import('../views/ControlePresencaView.vue'),
  },
  {
    path: '/controle-de-presenca/novo-culto',
    component: () => import('../views/NovoCultoView.vue'),
  },
  {
    path: '/controle-de-presenca/:id',
    component: () => import('../views/CultoDetalheView.vue'),
  },
  {
    path: '/controle-de-presenca/:id/entrada-visitante',
    component: () => import('../views/EntradaVisitanteView.vue'),
  },
  {
    path: '/membros/:id',
    component: () => import('../views/MembroDetalheView.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
