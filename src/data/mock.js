export const membros = [
  { id: 1,  nome: 'Ana Beatriz Silva',       periodo: 'manha', igreja: 'mae',      ceias: [true,  true,  true],  telefone: '(11) 99123-4567', email: 'ana.beatriz@email.com' },
  { id: 2,  nome: 'Carlos Eduardo Santos',   periodo: 'noite', igreja: 'mae',      ceias: [true,  false, true],  telefone: '(11) 98234-5678', email: 'carlos.e@email.com' },
  { id: 3,  nome: 'Fernanda Lima',           periodo: 'manha', igreja: 'filial',   ceias: [false, true,  true],  telefone: '(11) 97345-6789', email: 'fernanda.l@email.com' },
  { id: 4,  nome: 'Rodrigo Alves',           periodo: 'noite', igreja: 'mae',      ceias: [true,  true,  false], telefone: '(11) 96456-7890', email: 'rodrigo.a@email.com' },
  { id: 5,  nome: 'Juliana Costa',           periodo: 'manha', igreja: 'mae',      ceias: [true,  true,  true],  telefone: '(11) 95567-8901', email: 'juliana.c@email.com' },
  { id: 6,  nome: 'Marcos Vieira',           periodo: 'noite', igreja: 'filial',   ceias: [false, false, true],  telefone: '(11) 94678-9012', email: 'marcos.v@email.com' },
  { id: 7,  nome: 'Patrícia Rocha',          periodo: 'manha', igreja: 'mae',      ceias: [true,  false, false], telefone: '(11) 93789-0123', email: 'patricia.r@email.com' },
  { id: 8,  nome: 'Gabriel Ferreira',        periodo: 'noite', igreja: 'subfilial',ceias: [true,  true,  true],  telefone: '(11) 92890-1234', email: 'gabriel.f@email.com' },
  { id: 9,  nome: 'Isabela Nascimento',      periodo: 'manha', igreja: 'filial',   ceias: [false, true,  false], telefone: '(11) 91901-2345', email: 'isabela.n@email.com' },
  { id: 10, nome: 'Lucas Mendes',            periodo: 'noite', igreja: 'mae',      ceias: [true,  true,  false], telefone: '(11) 99012-3456', email: 'lucas.m@email.com' },
  { id: 11, nome: 'Camila Pereira',          periodo: 'manha', igreja: 'mae',      ceias: [true,  true,  true],  telefone: '(11) 98901-2345', email: 'camila.p@email.com' },
  { id: 12, nome: 'Rafael Oliveira',         periodo: 'noite', igreja: 'filial',   ceias: [false, false, false], telefone: '(11) 97890-1234', email: 'rafael.o@email.com' },
  { id: 13, nome: 'Tatiane Souza',           periodo: 'manha', igreja: 'mae',      ceias: [true,  false, true],  telefone: '(11) 96789-0123', email: 'tatiane.s@email.com' },
  { id: 14, nome: 'Diego Carvalho',          periodo: 'noite', igreja: 'subfilial',ceias: [true,  true,  true],  telefone: '(11) 95678-9012', email: 'diego.c@email.com' },
  { id: 15, nome: 'Vanessa Ribeiro',         periodo: 'manha', igreja: 'mae',      ceias: [false, true,  true],  telefone: '(11) 94567-8901', email: 'vanessa.r@email.com' },
  { id: 16, nome: 'Bruno Teixeira',          periodo: 'noite', igreja: 'filial',   ceias: [true,  false, false],  telefone: '(11) 93456-7890', email: 'bruno.t@email.com' },
]

export const visitantes = [
  { id: 1,  nome: 'Mariana Fonseca',   sexo: 'F', telefone: '(11) 91234-0001', email: 'mariana.f@email.com',  cep: '01310-100', endereco: 'Av. Paulista', numero: '1000', complemento: 'Apto 12' },
  { id: 2,  nome: 'Thiago Barros',     sexo: 'M', telefone: '(11) 91234-0002', email: 'thiago.b@email.com',   cep: '04001-001', endereco: 'R. das Flores',  numero: '45',   complemento: '' },
  { id: 3,  nome: 'Letícia Campos',    sexo: 'F', telefone: '(11) 91234-0003', email: 'leticia.c@email.com',  cep: '03001-000', endereco: 'R. do Comércio', numero: '88',   complemento: 'Casa' },
]

const hoje = new Date()
const fmtDate = (offset) => {
  const d = new Date(hoje)
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

export const cultos = [
  {
    id: 1,
    tipo: 'Culto de Celebração',
    data: fmtDate(-21),
    periodo: 'manha',
    inicio: '09:00',
    termino: '11:00',
    igreja: 'mae',
    status: 'encerrado',
    presentes:  [1, 2, 3, 5, 7, 9, 11, 13, 15],
    ausentes:   [4, 6, 8, 10, 12, 14, 16],
    visitantes: [1],
  },
  {
    id: 2,
    tipo: 'Culto de Santa Ceia',
    data: fmtDate(-14),
    periodo: 'noite',
    inicio: '19:30',
    termino: '21:30',
    igreja: 'mae',
    status: 'encerrado',
    presentes:  [1, 2, 4, 6, 8, 10, 12, 14, 16],
    ausentes:   [3, 5, 7, 9, 11, 13, 15],
    visitantes: [2],
  },
  {
    id: 3,
    tipo: 'Culto de Oração',
    data: fmtDate(-7),
    periodo: 'manha',
    inicio: '09:00',
    termino: '11:00',
    igreja: 'filial',
    status: 'encerrado',
    presentes:  [3, 6, 9, 12, 15],
    ausentes:   [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16],
    visitantes: [3],
  },
  {
    id: 4,
    tipo: 'Culto de Celebração',
    data: fmtDate(0),
    periodo: 'manha',
    inicio: '09:00',
    termino: '11:00',
    igreja: 'mae',
    status: 'ativo',
    presentes:  [1, 3, 5, 7, 11, 13],
    ausentes:   [],
    visitantes: [],
  },
  {
    id: 5,
    tipo: 'Culto de Jovens',
    data: fmtDate(7),
    periodo: 'noite',
    inicio: '19:30',
    termino: '21:30',
    igreja: 'mae',
    status: 'agendado',
    presentes:  [],
    ausentes:   [],
    visitantes: [],
  },
  {
    id: 6,
    tipo: 'Culto de Missões',
    data: fmtDate(14),
    periodo: 'manha',
    inicio: '09:00',
    termino: '11:00',
    igreja: 'filial',
    status: 'agendado',
    presentes:  [],
    ausentes:   [],
    visitantes: [],
  },
  {
    id: 7,
    tipo: 'Culto de Santa Ceia',
    data: fmtDate(21),
    periodo: 'noite',
    inicio: '19:30',
    termino: '21:30',
    igreja: 'mae',
    status: 'agendado',
    presentes:  [],
    ausentes:   [],
    visitantes: [],
  },
]

export const tiposCulto = [
  'Culto de Celebração',
  'Culto de Santa Ceia',
  'Culto de Oração',
  'Culto de Jovens',
  'Culto de Missões',
  'Culto de Família',
  'Culto de Encerramento',
]

export const igrejas = [
  { value: 'mae',       label: 'Igreja Mãe' },
  { value: 'filial',    label: 'Igreja Filial' },
  { value: 'subfilial', label: 'Igreja Subfilial' },
]

export function getInitials(nome) {
  const parts = nome.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-')
  return `${d}/${m}/${y}`
}

export function getMembro(id) {
  return membros.find((m) => m.id === Number(id))
}

export function getCulto(id) {
  return cultos.find((c) => c.id === Number(id))
}
