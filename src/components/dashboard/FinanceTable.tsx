import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FinanceRecord } from '@/lib/data-processing';
import { cn } from '@/lib/utils';

interface FinanceTableProps {
  data: FinanceRecord[];
}

const FinanceTable: React.FC<FinanceTableProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Transações Recentes</CardTitle>
        <CardDescription className="text-xs">Uma visão detalhada das suas últimas atividades financeiras.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Período</TableHead>
                <TableHead className="text-xs">Receita Total</TableHead>
                <TableHead className="text-xs">Custo Mensal</TableHead>
                <TableHead className="text-xs">Custo Acumulado</TableHead>
                <TableHead className="text-right text-xs">Lucro Líquido</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.period} className={entry.isInitialCost ? 'bg-orange-50' : ''}>
                  <TableCell className="font-medium text-sm">
                    {entry.period}
                    {entry.isInitialCost && <span className="ml-2 text-xs text-orange-600">(Inicial)</span>}
                  </TableCell>
                  <TableCell className="text-green-600 text-sm">
                    R${entry.accumulatedRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={cn("text-sm", entry.isInitialCost ? 'text-orange-600' : 'text-red-600')}>
                    R${entry.monthlyCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={cn("font-semibold text-sm", entry.isInitialCost ? 'text-orange-600' : 'text-red-600')}>
                    R${entry.accumulatedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={cn("text-right font-medium text-sm", (entry.accumulatedRevenue - entry.accumulatedCost) >= 0 ? 'text-green-600' : 'text-red-600')}>
                    R${(entry.accumulatedRevenue - entry.accumulatedCost).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinanceTable;