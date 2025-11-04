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
import { FinanceRecord } from '@/lib/data-processing'; // Usando o novo tipo FinanceRecord
import { cn } from '@/lib/utils';

interface FinanceTableProps {
  data: FinanceRecord[];
}

const FinanceTable: React.FC<FinanceTableProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
        <CardDescription>Uma visão detalhada das suas últimas atividades financeiras.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Período</TableHead>
                <TableHead>Receita Total</TableHead>
                <TableHead>Custo Total</TableHead>
                <TableHead className="text-right">Lucro Líquido</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.period}>
                  <TableCell>{entry.period}</TableCell>
                  <TableCell className="text-green-600">
                    R${entry.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-red-600">
                    R${entry.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={cn("text-right font-medium", (entry.totalRevenue - entry.totalCost) >= 0 ? 'text-green-600' : 'text-red-600')}>
                    R${(entry.totalRevenue - entry.totalCost).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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