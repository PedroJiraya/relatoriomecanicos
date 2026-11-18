import faultTree from '../data/fault-tree.json';
import { FLEET_DATABASE } from './fleetData';

export const STORAGE_KEY = 'relatorio_turno_mec_draft_v1';

export const codes = ['HMC – 9200', 'MPS – 9600', 'MPNS – 9100', 'HAC – 9700'];

export const statuses = ['Liberado', 'Em manutenção'];

export const mpsPreventiveTypes = [
  '250 H',
  '500 H',
  '1000 H',
  '2000 H',
  '4000 H',
  '6000 H',
  '8000 H',
  'PREV PNEUS',
  'INSP SENSIT',
  'INSP PRED',
  'INSP PNEUS',
];

export const teams = ['A', 'B', 'C', 'D', 'ADM'];

export const stoppedPreInfo = [
  'MECANICA',
  'ELETRICA',
  'BORRACHARIA',
  'LUBRIFICACAO',
  'PREVENTIVA OFICINA',
  'SOLDA / CALDEIRARIA',
  'LAVADOR',
  'ABASTECIMENTO',
];

export const delayJustifications = [
  'EXEC MECANICA',
  'EXEC ELETRICA',
  'EXEC ELETRONICA/AUTOMACAO',
  'EXEC DIAGNOSTICO TECNICO',
  'EXEC BORRACHARIA',
  'EXEC LAVADOR',
  'EXEC TERCEIROS TRABALHANDO',
  'EXEC LUBRIFICACAO',
  'EXEC MANUT SISTEMA DE COMBUSTIVEL',
  'EXEC REDES E LINHAS',
  'EXEC GARANTIA / ASSIST TECNICA',
  'EXEC CALDERARIA/SOLDA',
  'EXEC ON BRD AUTOMACAO',
  'EXEC CALIBRACAO',
  'EXEC SIST EMBARCADOS/AUTOMACAO',
  'EXEC TELECOM/REDES COM',
  'AG SISTEMAS SEGURANCA',
  'EXEC ON BRD TELECOM',
  'AG MECANICA',
  'AG ELETRICA',
  'AG ELETRONICA/AUTOMACAO',
  'AG APROVACAO',
  'AG AVALIACAO',
  'AG BORRACHARIA',
  'AG LAVADOR',
  'AG BOX',
  'AG COMBOIO',
  'AG CONDICAO SEGURA',
  'AG LOCOMOCAO',
  'AG LUBRIFICACAO',
  'AG PECAS',
  'AG MAO DE OBRA',
  'AG OPERACAO',
  'AG RECURSO/FERRAMENTAL',
  'AG REDES E LINHAS',
  'AG GARANTIA / ASSIST TECNICA',
  'AG CALDERARIA/SOLDA',
  'AG DETONACAO',
  'AG MAU TEMPO',
  'AG ENERGIA',
  'AG LIBERACAO DE ACESSO',
  'AG OFICINA DE COMPONENTES',
  'AG ATENDIMENTO',
  'AG SIST EMBARCADOS/AUTOMACAO',
  'AG FILA CALLPAD',
  'AG O.M SAP',
  'AG PTS',
];

export const systems = Object.keys(faultTree);

// Frota completa com todos os 70 ativos catalogados (CM55xx, CM40xx, CT56xx, RB79xx)
export const fleetEquipments = FLEET_DATABASE.map((item) => item.fullTag);

export const emoji = {
  clipboard: '📋',
  calendar: '📅',
  clock: '⏰',
  worker: '👷',
  compass: '🧭',
  mechanic: '👨‍🔧',
  cross: '❌',
  tools: '🛠️',
  check: '✅',
  pin: '📌',
  noEntry: '🚫',
};
