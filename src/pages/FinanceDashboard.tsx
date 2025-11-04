import React from 'react';
import OverviewCard from '@/components/dashboard/OverviewCard';
import RevenueCostChart from '@/components/dashboard/RevenueCostChart';
import FinanceTable from '@/components/dashboard/FinanceTable';
import RawDataTable from '@/components/dashboard/RawDataTable';
import DetailModal from '@/components/ui/detail-modal';
import { parseCsvData, getChartData, getUniqueMonths, getUniqueYears, FinanceRecord, getRawTableData, RawTableData } from '@/lib/data-processing';
import { DollarSign, TrendingUp, TrendingDown, Table } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FinanceDashboard: React.FC = () => {
  const allFinanceData = React.useMemo(() => parseCsvData(), []);
  const uniqueMonths = React.useMemo(() => getUniqueMonths(allFinanceData), [allFinanceData]);
  const uniqueYears = React.useMemo(() => getUniqueYears(allFinanceData), [allFinanceData]);

  const [selectedMonth, setSelectedMonth] = React.useState<string | undefined>(undefined);
  const [selectedYear, setSelectedYear] = React.useState<string | undefined>(undefined);

  const filteredData = React.useMemo(() => {
    return allFinanceData.filter(record => {
      const monthMatch = selectedMonth ? record.month === selectedMonth : true;
      const yearMatch = selectedYear ? record.year === parseInt(selectedYear, 10) : true;
      return monthMatch && yearMatch;
    });
  }, [allFinanceData, selectedMonth, selectedYear]);

  const currentPeriodData = filteredData.length > 0 ? filteredData[filteredData.length - 1] : undefined;

  const totalRevenue = currentPeriodData ? currentPeriodData.accumulatedRevenue : 0;
  const totalCost = currentPeriodData ? currentPeriodData.totalCost : 0;
  const netProfit = totalRevenue - totalCost;

  const chartData = React.useMemo(() => getChartData(filteredData), [filteredData]);
  const rawTableData = React.useMemo(() => getRawTableData(filteredData), [filteredData]);

  const formatCurrency = (value: number) => `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const revenueDetails = currentPeriodData ? [
    { label: 'Plano GOLD', value: formatCurrency(currentPeriodData.revenuePlanGold) },
    { label: 'Plano PREMIUM', value: formatCurrency(currentPeriodData.revenuePlanPremium) },
    { label: 'Receita Mensal', value: formatCurrency(currentPeriodData.totalRevenue) },
    { label: 'Receita Acumulada', value: formatCurrency(currentPeriodData.accumulatedRevenue) },
  ] : [];

  const costDetails = currentPeriodData ? [
    { label: 'Custo Total', value: formatCurrency(currentPeriodData.totalCost) },
    { label: 'Tipo', value: currentPeriodData.isInitialCost ? 'Custo Inicial' : 'Custo Operacional' },
  ] : [];

  const profitDetails = currentPeriodData ? [
    { label: 'Receita Acumulada', value: formatCurrency(totalRevenue) },
    { label: 'Custo Total', value: formatCurrency(totalCost) },
    { label: 'Lucro Líquido', value: formatCurrency(netProfit) },
  ] : [];

  const monthDisplayNames: { [key: string]: string } = {
    'jan': 'Janeiro',
    'fev': 'Fevereiro',
    'mar': 'Março',
    'abr': 'Abril',
    'mai': 'Maio',
    'jun': 'Junho',
    'jul': 'Julho',
    'ago': 'Agosto',
    'set': 'Setembro',
    'out': 'Outubro',
    'nov': 'Novembro',
    'dez': 'Dezembro'
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Painel Financeiro</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <Label htmlFor="select-month">Filtrar por Mês</Label>
          <Select onValueChange={setSelectedMonth} value={selectedMonth}>
            <SelectTrigger id="select-month" className="w-[180px]">
              <SelectValue placeholder="Todos os Meses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Meses</SelectItem>
              {uniqueMonths.map(month => (
                <SelectItem key={month} value={month}>
                  {monthDisplayNames[month] || month.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="select-year">Filtrar por Ano</Label>
          <Select onValueChange={setSelectedYear} value={selectedYear}>
            <SelectTrigger id="select-year" className="w-[180px]">
              <SelectValue placeholder="Todos os Anos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Anos</SelectItem>
              {uniqueYears.map(year => (
                <SelectItem key={year} value={String(year)}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <DetailModal
          title="Detalhes da Receita"
          description="Breakdown completo da receita por período"
          data={rawTableData}
        >
          <OverviewCard
            title="Receita Acumulada"
            value={formatCurrency(totalRevenue)}
            description="Receita acumulada no período."
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
        </DetailModal>

        <DetailModal
          title="Detalhes dos Custos"
          description="Breakdown completo dos custos por período"
          data={rawTableData}
        >
          <OverviewCard
            title="Custo Total"
            value={formatCurrency(totalCost)}
            description="Total de despesas incorridas."
            icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
          />
        </DetailModal>

        <DetailModal
          title="Detalhes do Lucro"
          description="Breakdown completo do lucro por período"
          data={rawTableData}
        >
          <OverviewCard
            title="Lucro Líquido"
            value={formatCurrency(netProfit)}
            description="Receita acumulada menos custo."
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </DetailModal>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <RevenueCostChart data={chartData} />
        <FinanceTable data={filteredData.slice(-10)} />
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Resumo</TabsTrigger>
          <TabsTrigger value="detailed">Tabela Detalhada</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="space-y-4">
          <FinanceTable data={filteredData} />
        </TabsContent>
        <TabsContent value="detailed" className="space-y-4">
          <RawDataTable data={rawTableData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceDashboard;