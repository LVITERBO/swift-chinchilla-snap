import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartData } from '@/lib/data-processing'; // Usando o novo tipo ChartData

interface RevenueCostChartProps {
  data: ChartData[];
}

const RevenueCostChart: React.FC<RevenueCostChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita vs. Custo</CardTitle>
        <CardDescription>Visão geral mensal do seu desempenho financeiro.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                formatter={(value: number) => `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                labelFormatter={(label: string) => `Mês: ${label}`}
              />
              <Legend payload={[{ value: 'Receita', type: 'rect', id: 'receita', color: 'hsl(var(--primary))' }, { value: 'Custo', type: 'rect', id: 'custo', color: 'hsl(var(--destructive))' }]} />
              <Bar dataKey="receita" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Receita" />
              <Bar dataKey="custo" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Custo" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueCostChart;