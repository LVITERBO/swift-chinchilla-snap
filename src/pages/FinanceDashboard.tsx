import React from 'react';
import OverviewCard from '@/components/dashboard/OverviewCard';
import RevenueCostChart from '@/components/dashboard/RevenueCostChart';
import FinanceTable from '@/components/dashboard/FinanceTable';
import RawDataTable from '@/components/dashboard/RawDataTable';
import DetailModal from '@/components/ui/detail-modal';
import { parseCsvData, getChartData, getUniqueMonths, getUniqueYears, FinanceRecord, getRawTableData, RawTableData } from '@/lib/data-processing';
import { DollarSign, TrendingUp, TrendingDown, Target } from 'lucide-react'; // Adicionado Target icon
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FinanceDashboard: React.FC = () => {
  const allFinanceData = React.useMemo(() => parseCsvData(), []);
  const uniqueMonths = React.useMemo(() => getUniqueMonths(allFinanceData), [allFinanceData]);
  const uniqueYears = React.useMemo(() => getUniqueYears(allFinanceData), [allFinanceData]);

  const [selectedMonth, setSelectedMonth] = React.useState<string | undefined>(undefined);
  const [selectedYear, setSelectedYear] = React.useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = React.useState<string>("summary"); // Novo estado para a aba ativa

  const filteredData = React.useMemo(() => {
    return allFinanceData.filter(record => {
      const monthMatch = selectedMonth && selectedMonth !== "all" ? record.month === selectedMonth : true;
      const yearMatch = selectedYear && selectedYear !== "all" ? record.year === parseInt(selectedYear, 10) : true;
      return monthMatch && yearMatch;
    });
  }, [allFinanceData, selectedMonth, selectedYear]);

  const currentPeriodData = filteredData.length > 0 ? filteredData[filteredData.length - 1] : undefined;

  const totalRevenue = currentPeriodData ? currentPeriodData.accumulatedRevenue : 0;
  const totalCost = currentPeriodData ? currentPeriodData.accumulatedCost : 0;
  const netProfit = totalRevenue - totalCost;

  const chartData = React.useMemo(() => getChartData(filteredData), [filteredData]);
  const rawTableData = React.useMemo(() => getRawTableData(filteredData), [filteredData]);

  const formatCurrency = (value: number) => `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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

  // Calcular o mês de Break Even
  const breakEvenRecord = allFinanceData.find(
    (record) => record.accumulatedRevenue >= record.accumulatedCost
  );
  const breakEvenMonth = breakEvenRecord
    ? `${monthDisplayNames[breakEvenRecord.month] || breakEvenRecord.month.toUpperCase()}/${breakEvenRecord.year}`
    : 'N/A';

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6"> {/* Adicionado xl:grid-cols-4 */}
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
            title="Custo Acumulado"
            value={formatCurrency(totalCost)}
            description="Custo total acumulado até o período."
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
            description="Receita acumulada menos custo acumulado."
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </DetailModal>

        {/* Novo Card de Break Even */}
        <OverviewCard
          title="Break Even"
          value={breakEvenMonth}
          description="Mês em que a receita acumulada supera o custo acumulado."
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
          valueClassName="text-blue-600 dark:text-blue-400" // Cor azul para o valor
          onClick={() => {
            setActiveTab("detailed"); // Ativa a aba de tabela detalhada
            setSelectedMonth("jul"); // Filtra para Julho
            setSelectedYear("2026"); // Filtra para 2026
          }}
        />
      </div>

      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
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