import React from 'react';
import OverviewCard from '@/components/dashboard/OverviewCard';
import RevenueCostChart from '@/components/dashboard/RevenueCostChart';
import FinanceTable from '@/components/dashboard/FinanceTable';
import { parseCsvData, getChartData, getUniqueMonths, getUniqueYears, FinanceRecord } from '@/lib/data-processing';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

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

  const totalRevenue = currentPeriodData ? currentPeriodData.totalRevenue : 0;
  const totalCost = currentPeriodData ? currentPeriodData.totalCost : 0;
  const netProfit = totalRevenue - totalCost;

  const chartData = React.useMemo(() => getChartData(filteredData), [filteredData]);

  const formatCurrency = (value: number) => `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const revenueDetails = currentPeriodData ? [
    { label: 'Plano GOLD', value: formatCurrency(currentPeriodData.revenuePlanGold) },
    { label: 'Plano PREMIUM', value: formatCurrency(currentPeriodData.revenuePlanPremium) },
  ] : [];

  const costDetails = currentPeriodData ? [
    { label: 'Contabilidade', value: formatCurrency(currentPeriodData.costs.contabilidade) },
    { label: 'Marca', value: formatCurrency(currentPeriodData.costs.marca) },
    { label: 'Jurídico', value: formatCurrency(currentPeriodData.costs.juridico) },
    { label: 'Infraestrutura', value: formatCurrency(currentPeriodData.costs.infraestrutura) },
    { label: 'Desenvolvimento', value: formatCurrency(currentPeriodData.costs.desenvolvimento) },
    { label: 'Marketing', value: formatCurrency(currentPeriodData.costs.marketing) },
    { label: 'Pessoal', value: formatCurrency(currentPeriodData.costs.pessoal) },
    { label: 'Parcerias', value: formatCurrency(currentPeriodData.costs.parcerias) },
  ] : [];

  const profitDetails = currentPeriodData ? [
    { label: 'Receita Total', value: formatCurrency(totalRevenue) },
    { label: 'Custo Total', value: formatCurrency(totalCost) },
  ] : [];

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
                <SelectItem key={month} value={month}>{month.toUpperCase()}</SelectItem>
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
        <OverviewCard
          title="Receita Total"
          value={formatCurrency(totalRevenue)}
          description="Receita gerada em todas as operações."
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          detailData={revenueDetails}
        />
        <OverviewCard
          title="Custo Total"
          value={formatCurrency(totalCost)}
          description="Total de despesas incorridas."
          icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
          detailData={costDetails}
        />
        <OverviewCard
          title="Lucro Líquido"
          value={formatCurrency(netProfit)}
          description="Receita menos custo."
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          detailData={profitDetails}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <RevenueCostChart data={chartData} />
        <FinanceTable data={filteredData.slice(-10).reverse()} /> {/* Exibe os 10 períodos mais recentes */}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Todos os Períodos</h2>
        <FinanceTable data={filteredData.reverse()} />
      </div>
    </div>
  );
};

export default FinanceDashboard;