import React from 'react';
import OverviewCard from '@/components/dashboard/OverviewCard';
import RevenueCostChart from '@/components/dashboard/RevenueCostChart';
import FinanceTable from '@/components/dashboard/FinanceTable';
import { generateMockChartData, generateMockFinanceData, FinanceEntry } from '@/lib/mock-data';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const FinanceDashboard: React.FC = () => {
  const financeData = React.useMemo(() => generateMockFinanceData(50), []);
  const chartData = React.useMemo(() => generateMockChartData(), []);

  const totalRevenue = financeData
    .filter(entry => entry.type === 'revenue')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalCost = financeData
    .filter(entry => entry.type === 'cost')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const netProfit = totalRevenue - totalCost;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Finance Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <OverviewCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          description="Revenue generated across all operations."
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <OverviewCard
          title="Total Cost"
          value={`$${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          description="Total expenses incurred."
          icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
        />
        <OverviewCard
          title="Net Profit"
          value={`$${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          description="Revenue minus cost."
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        <RevenueCostChart data={chartData} />
        <FinanceTable data={financeData.slice(0, 10)} /> {/* Displaying only recent 10 for brevity */}
      </div>

      <div className="mt-6">
        <FinanceTable data={financeData} />
      </div>
    </div>
  );
};

export default FinanceDashboard;