import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartData } from '@/lib/mock-data';

interface RevenueCostChartProps {
  data: ChartData[];
}

const RevenueCostChart: React.FC<RevenueCostChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue vs. Cost</CardTitle>
        <CardDescription>Monthly overview of your financial performance.</CardDescription>
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
                labelFormatter={(label: string) => `Month: ${label}`}
              />
              <Legend />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="cost" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueCostChart;