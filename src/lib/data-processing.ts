import { parse } from 'csv-parse/browser/esm/sync';

// Conteúdo do seu arquivo CSV
const CSV_CONTENT = `﻿;Receitas;;;;;;;;;;;;;;;;;Resltado_Custos;;;Contabilidade;Marca;Jurídico;Infraestrutura;Desenvolvimento;Desenvolvimento;Infraestrutura;Infraestrutura;Marketing;Marketing;Pessoal;Parcerias;Parcerias;Marketing;MKT 
;;;60,00%;10,00%;30,00%;;;;;Incremento Mensal de  Clientes;Planos / Preços;;Planos / Preços;Planos / Preços;Planos / Preços;Planos / Preços;;Período;;Conta;Kadmus ;Marca;Lima Jr;Registro BR;YouX;Digital Circle;Google;Microsoft Azure;Just Liv;Bendita Letra;Luciano;LINA;VINDI;Site / Redes Sociais;Tráfego PG | Impulso
;;CLIENTES;%  Clientes Plano  (START);% Clientes Plano (GOLD);% Clientes Plano (PREMIUM);Receita Plano GOLD ;Receita Plano PREMIUM;Receita Total (R$);Receita Acumulada;20,00%;;Receita ALVO > Custo;Preço Plano 0 - (START)  ;Preço Plano (PREMIUM);Preço Plano ( GOLD);Proporção (G / P );;Jan/24 | Set/25_Custos Iniciais (não recuperáveis)_Sunk Costs;202.747;202.747;;;;;;;;;;;;;;;
;out/25;0;;;;;;;R$ 0,00;R$ 0,00;out/25;R$ 36.378,80;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;out/25;36.379;239.126;220;;;40;;26.334;185;2.500;1.000;2.500;3.000;;;600;
;nov/25;0;;;;;;;R$ 0,00;R$ 0,00;nov/25;R$ 38.459,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;nov/25;38.459;277.585;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;1.999;;5.000
;dez/25;412;257;51;103;R$ 15.349,00;R$ 30.801,00;R$ 46.150,00;R$ 46.150,00;dez/25;R$ 36.959,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;dez/25;36.959;314.544;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;jan/26;494;309;62;124;R$ 36.961,21;R$ 9.178,60;R$ 46.139,80;R$ 92.289,80;jan/26;R$ 36.919,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;jan/26;36.919;351.463;220;;;;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;fev/26;593;370;74;148;R$ 44.353,45;R$ 11.014,32;R$ 55.367,76;R$ 147.657,56;fev/26;R$ 36.959,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;fev/26;36.959;388.422;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;mar/26;711;445;89;178;R$ 53.224,14;R$ 13.217,18;R$ 66.441,31;R$ 214.098,88,mar/26;R$ 36.919,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;mar/26;36.919;425.341;220;;;;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;abr/26;853;533;106;214;R$ 63.868,96;R$ 15.860,62;R$ 79.729,58;R$ 293.828,46,abr/26;R$ 36.959,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;abr/26;36.959;462.300;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;mai/26;1024;640;128;256;R$ 76.642,76;R$ 19.032,74;R$ 95.675,49;R$ 389.503,95,mai/26;R$ 36.959,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;mai/26;36.959;499.259;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;jun/26;1229;768;153;308;R$ 91.971,31;R$ 22.839,29;R$ 114.810,59;R$ 504.314,54,jun/26;R$ 36.959,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;jun/26;36.959;536.218;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;jul/26;1475;922;184;369;R$ 110.365,57;R$ 27.407,14;R$ 137.772,71;R$ 642.087,25,jul/26;R$ 36.959,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;jul/26;36.959;573.177;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;ago/26;1770;1106;221;443;R$ 132.438,68;R$ 32.888,57;R$ 165.327,25;R$ 807.414,51,ago/26;R$ 36.959,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;ago/26;36.959;610.136;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;set/26;2124;1327;265;532;R$ 158.926,42;R$ 39.466,29;R$ 198.392,70;R$ 1.005.807,21,set/26;R$ 36.959,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;set/26;36.959;647.095;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;out/26;2548;1593;318;638;R$ 190.711,70;R$ 47.359,54;R$ 238.071,24;R$ 1.243.878,45,out/26;R$ 36.959,00;R$ 0,00; R$ 149,00 ; R$ 299,00 ;2,01;;out/26;36.959;R$ 684.053,51;220;;;40;;20.000;200;2.500;1.000;2.500;3.000;2.000;499;;5.000
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;#DIV/0!;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;225;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`;

export interface FinanceRecord {
  period: string;
  month: string;
  year: number;
  totalClients: number;
  revenuePlanGold: number;
  revenuePlanPremium: number;
  totalRevenue: number;
  accumulatedRevenue: number;
  totalCost: number;
  isInitialCost: boolean;
  costDescription?: string;
  sortDate: Date;
}

export type ChartData = {
  month: string;
  receita: number;
  custo: number;
};

export type RawTableData = {
  period: string;
  totalClients: number;
  revenuePlanGold: number;
  revenuePlanPremium: number;
  totalRevenue: number;
  accumulatedRevenue: number;
  totalCost: number;
  isInitialCost: boolean;
  costDescription?: string;
  netProfit: number;
};

function parseNumber(value: string | undefined): number {
  if (!value) return 0;
  let cleanedValue = value.replace(/R\$/g, '').replace(/\s/g, '').replace(/%/g, '');
  cleanedValue = cleanedValue.replace(/\./g, '').replace(/,/g, '.');
  const parsed = parseFloat(cleanedValue);
  return isNaN(parsed) ? 0 : parsed;
}

function getMonthNumber(monthAbbr: string): number {
  const months: { [key: string]: number } = {
    'jan': 0, 'fev': 1, 'mar': 2, 'abr': 3, 'mai': 4, 'jun': 5,
    'jul': 6, 'ago': 7, 'set': 8, 'out': 9, 'nov': 10, 'dez': 11
  };
  return months[monthAbbr.toLowerCase()] || 0;
}

export const parseCsvData = (): FinanceRecord[] => {
  const records = parse(CSV_CONTENT, {
    delimiter: ';',
    from_line: 4,
    relax_column_count: true,
  });

  const financeData: FinanceRecord[] = [];

  // Adicionar custos iniciais como um registro separado
  financeData.push({
    period: 'Jan/24 | Set/25',
    month: 'Inicial',
    year: 2024,
    totalClients: 0,
    revenuePlanGold: 0,
    revenuePlanPremium: 0,
    totalRevenue: 0,
    accumulatedRevenue: 0,
    totalCost: 202747,
    isInitialCost: true,
    costDescription: 'Custos Iniciais (Sunk Costs)',
    sortDate: new Date(2024, 0, 1)
  });

  // Mapeamento manual dos custos totais conforme tabela fornecida
  const costMapping: { [key: string]: number } = {
    'out/25': 36379,
    'nov/25': 38459,
    'dez/25': 36959,
    'jan/26': 36919,
    'fev/26': 36959,
    'mar/26': 36919,
    'abr/26': 36959,
    'mai/26': 36959,
    'jun/26': 36959,
    'jul/26': 36959,
    'ago/26': 36959,
    'set/26': 36959,
    'out/26': 36959
  };

  records.forEach((row: string[]) => {
    const periodRaw = row[1]?.trim();
    if (!periodRaw || periodRaw.includes('#DIV/0!')) return;

    const [monthAbbr, yearAbbr] = periodRaw.split('/');
    const year = 2000 + parseInt(yearAbbr, 10);
    const monthNumber = getMonthNumber(monthAbbr);

    const revenuePlanGold = parseNumber(row[6]);
    const revenuePlanPremium = parseNumber(row[7]);
    const totalRevenue = parseNumber(row[8]);
    const accumulatedRevenue = parseNumber(row[9]);

    // Usar o mapeamento manual para garantir valores exatos
    const totalCost = costMapping[periodRaw] || 0;

    financeData.push({
      period: periodRaw,
      month: monthAbbr,
      year: year,
      totalClients: parseNumber(row[2]),
      revenuePlanGold: revenuePlanGold,
      revenuePlanPremium: revenuePlanPremium,
      totalRevenue: totalRevenue,
      accumulatedRevenue: accumulatedRevenue,
      totalCost: totalCost,
      isInitialCost: false,
      sortDate: new Date(year, monthNumber, 1)
    });
  });

  // Ordenar por data cronológica
  return financeData.sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime());
};

export const getRawTableData = (data: FinanceRecord[]): RawTableData[] => {
  return data.map(entry => ({
    period: entry.period,
    totalClients: entry.totalClients,
    revenuePlanGold: entry.revenuePlanGold,
    revenuePlanPremium: entry.revenuePlanPremium,
    totalRevenue: entry.totalRevenue,
    accumulatedRevenue: entry.accumulatedRevenue,
    totalCost: entry.totalCost,
    isInitialCost: entry.isInitialCost,
    costDescription: entry.costDescription,
    netProfit: entry.accumulatedRevenue - entry.totalCost,
  }));
};

export const getChartData = (data: FinanceRecord[]): ChartData[] => {
  return data.map(entry => ({
    month: entry.period,
    receita: entry.accumulatedRevenue,
    custo: entry.totalCost,
  }));
};

export const getUniqueMonths = (data: FinanceRecord[]): string[] => {
  const monthOrder = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const months = new Set<string>();
  data.forEach(record => months.add(record.month));
  
  // Filtrar apenas meses que existem nos dados e ordenar corretamente
  return monthOrder.filter(month => months.has(month));
};

export const getUniqueYears = (data: FinanceRecord[]): number[] => {
  const years = new Set<number>();
  data.forEach(record => years.add(record.year));
  return Array.from(years).sort();
};