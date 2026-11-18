import faultTree from '../data/fault-tree.json';

export function getCodeEmoji(code = '') {
  if (code.includes('Operando')) return '🟢';
  if (code.includes('MPNS')) return '🟠';
  if (code.includes('MPS')) return '🟡';
  if (code.includes('HMC') || code.includes('HAC')) return '🔴';
  return '⚙️';
}

export function getLocalDatetimeString() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const local = new Date(now.getTime() - offset);
  return local.toISOString().slice(0, 16);
}

export function formatDateTimeWhatsApp(val = '') {
  if (!val) return '';
  if (val.includes('T')) {
    const [datePart, timePart] = val.split('T');
    const parts = datePart.split('-');
    if (parts.length === 3) {
      const [, month, day] = parts;
      return `${day}/${month} às ${timePart.slice(0, 5)}`;
    }
  }
  return val;
}

export function formatAsset(val = '') {
  if (!val) return '';
  const clean = val.trim().toUpperCase().replace(/\s+/g, '');
  if (!clean) return '';

  const match = clean.match(/^(CM|CT|RB|CA)?(\d+.*)$/i);
  if (match) {
    const explicitPrefix = match[1]?.toUpperCase();
    const digits = match[2];

    if (!explicitPrefix || explicitPrefix === 'CA') {
      if (digits.startsWith('55')) return `CM${digits}`;
      if (digits.startsWith('40')) return `CM${digits}`;
      if (digits.startsWith('56')) return `CT${digits}`;
      if (digits.startsWith('79')) return `RB${digits}`;
      return `CM${digits}`;
    }
    return `${explicitPrefix}${digits}`;
  }

  return clean;
}

export const formatCA = formatAsset;
export const formatCM = formatAsset;

export function getTag(asset = '') {
  return String(asset || '')
    .replace(/^(CM|CT|RB|CA)+/i, '')
    .trim();
}

export function getDelayTimes(delays = [], dIdx = 0, itemStartTime = '') {
  const delay = delays[dIdx] || {};

  // O primeiro atraso sempre começa no Horário Início MineStar;
  // O segundo atraso em diante SEMPRE começa no término (endTime) do atraso anterior!
  const prevDelay = dIdx > 0 ? delays[dIdx - 1] : null;
  const effectiveStart =
    dIdx === 0
      ? itemStartTime || delay.startTime || ''
      : prevDelay?.endTime || delay.startTime || '';

  const effectiveEnd = delay.endTime || '';

  return { effectiveStart, effectiveEnd };
}

export function normalizeAssetInput(raw, prev = '') {
  let val = raw.toUpperCase().replace(/\s+/g, '');
  if (/^(CM|CT|RB|CA)$/i.test(val) && prev.length > 2) {
    return '';
  }
  return formatAsset(val);
}

export function getTruckModel(asset = '') {
  const clean = formatAsset(asset).toUpperCase();
  const digits = clean.replace(/^[A-Z]+/i, '');
  if (digits.startsWith('55')) return '797F';
  if (digits.startsWith('40')) return '793D';
  if (digits.startsWith('56')) return 'Pipa';
  if (digits.startsWith('79')) return 'Rebocador';
  return 'Outros';
}

export function getFleetSummary(stopped = [], operating = [], appointments = []) {
  const maintFromAppointments = appointments
    .filter((a) => {
      const eff =
        a.endTime && a.endTime.trim() && a.status === 'Aguardando recurso'
          ? 'Liberado'
          : a.status || 'Em manutenção';
      return eff !== 'Liberado';
    })
    .map((a) => formatAsset(a.asset))
    .filter((tag) => tag.length > 2);

  const maintList = [
    ...stopped
      .map((item) => formatAsset(item.asset))
      .filter((tag) => tag.length > 2),
    ...maintFromAppointments,
  ];
  const uniqueMaint = Array.from(new Set(maintList));

  const autoList = operating
    .map((item) => formatAsset(item.asset))
    .filter((tag) => tag.length > 2);
  const uniqueAuto = Array.from(new Set(autoList));

  const allTrucks = Array.from(new Set([...uniqueMaint, ...uniqueAuto]));
  const totalTrucks = allTrucks.length;
  const totalMaint = uniqueMaint.length;
  const totalAuto = uniqueAuto.length;

  const count797F_Maint = uniqueMaint.filter(
    (t) => getTruckModel(t) === '797F',
  ).length;
  const count797F_Auto = uniqueAuto.filter(
    (t) => getTruckModel(t) === '797F',
  ).length;
  const total797F = count797F_Maint + count797F_Auto;

  const count793D_Maint = uniqueMaint.filter(
    (t) => getTruckModel(t) === '793D',
  ).length;
  const count793D_Auto = uniqueAuto.filter(
    (t) => getTruckModel(t) === '793D',
  ).length;
  const total793D = count793D_Maint + count793D_Auto;

  const countPipa_Maint = uniqueMaint.filter(
    (t) => getTruckModel(t) === 'Pipa',
  ).length;
  const countPipa_Auto = uniqueAuto.filter(
    (t) => getTruckModel(t) === 'Pipa',
  ).length;
  const totalPipa = countPipa_Maint + countPipa_Auto;

  const countRebocador_Maint = uniqueMaint.filter(
    (t) => getTruckModel(t) === 'Rebocador',
  ).length;
  const countRebocador_Auto = uniqueAuto.filter(
    (t) => getTruckModel(t) === 'Rebocador',
  ).length;
  const totalRebocador = countRebocador_Maint + countRebocador_Auto;

  const calc = (count, tot) => {
    if (!tot || tot === 0) return { num: 0, text: '0%' };
    const num = (count / tot) * 100;
    const text = `${num % 1 === 0 ? num.toFixed(0) : num.toFixed(1)}%`;
    return { num, text };
  };

  const totalAutoCalc = calc(totalAuto, totalTrucks);
  const totalMaintCalc = calc(totalMaint, totalTrucks);

  const f797AutoCalc = calc(count797F_Auto, total797F);
  const f797MaintCalc = calc(count797F_Maint, total797F);

  const f793AutoCalc = calc(count793D_Auto, total793D);
  const f793MaintCalc = calc(count793D_Maint, total793D);

  const fPipaAutoCalc = calc(countPipa_Auto, totalPipa);
  const fPipaMaintCalc = calc(countPipa_Maint, totalPipa);

  const fRebAutoCalc = calc(countRebocador_Auto, totalRebocador);
  const fRebMaintCalc = calc(countRebocador_Maint, totalRebocador);

  return {
    totalTrucks,
    totalMaint,
    totalAuto,
    percTotalAuto: totalAutoCalc.text,
    percTotalMaint: totalMaintCalc.text,
    numPercTotalAuto: totalAutoCalc.num,
    numPercTotalMaint: totalMaintCalc.num,

    total797F,
    count797F_Maint,
    count797F_Auto,
    perc797F_Auto: f797AutoCalc.text,
    perc797F_Maint: f797MaintCalc.text,
    numPerc797F_Auto: f797AutoCalc.num,
    numPerc797F_Maint: f797MaintCalc.num,

    total793D,
    count793D_Maint,
    count793D_Auto,
    perc793D_Auto: f793AutoCalc.text,
    perc793D_Maint: f793MaintCalc.text,
    numPerc793D_Auto: f793AutoCalc.num,
    numPerc793D_Maint: f793MaintCalc.num,

    totalPipa,
    countPipa_Maint,
    countPipa_Auto,
    percPipa_Auto: fPipaAutoCalc.text,
    percPipa_Maint: fPipaMaintCalc.text,
    numPercPipa_Auto: fPipaAutoCalc.num,
    numPercPipa_Maint: fPipaMaintCalc.num,

    totalRebocador,
    countRebocador_Maint,
    countRebocador_Auto,
    percRebocador_Auto: fRebAutoCalc.text,
    percRebocador_Maint: fRebMaintCalc.text,
    numPercRebocador_Auto: fRebAutoCalc.num,
    numPercRebocador_Maint: fRebMaintCalc.num,

    // Compatibilidade com referências antigas:
    total794AC: 0,
    count794AC_Maint: 0,
    count794AC_Auto: 0,
    perc794AC_Auto: '0%',
    perc794AC_Maint: '0%',
    numPerc794AC_Auto: 0,
    numPerc794AC_Maint: 0,
  };
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Bom dia!';
  if (hour >= 12 && hour < 18) return 'Boa tarde!';
  return 'Boa noite!';
}

export function branches(item) {
  const system = faultTree[item.system] || {};
  const component = system[item.component] || {};
  const subcomponent = component[item.subcomponent] || {};
  return {
    components: Object.keys(system),
    subcomponents: Object.keys(component),
    causes: Object.keys(subcomponent),
    solutions: subcomponent[item.cause] || [],
  };
}

export function path(item) {
  return (
    [
      item.system,
      item.component,
      item.subcomponent,
      item.cause,
      item.faultSolution,
    ]
      .filter(Boolean)
      .join(' > ') || 'Não informada'
  );
}
