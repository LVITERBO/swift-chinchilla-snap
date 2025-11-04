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
import { RawTableData } from '@/lib/data-processing';
import { cn } from '@/lib/utils';

interface RawDataTableProps {
  data: RawTableData[];
}

const RawDataTable: React.FC<RawDataTableProps> = ({ data }) => {
  const formatCurrency = (value: number) => `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tabela Detalhada - Dados da Planilha</CardTitle>
        <CardDescription className="text-sm">Visão completa dos dados financeiros por período.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Período</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead>Rec. GOLD</TableHead>
                <TableHead>Rec. PREMIUM</TableHead>
                <TableHead>Rec. Total</TableHead>
                <TableHead>Rec. Acumulada</TableHead>
                <TableHead>Custo Mensal</TableHead>
                <TableHead>Custo Acumulado</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Lucro Líquido</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.period} className={entry.isInitialCost ? 'bg-orange-50' : ''}>
                  <TableCell className="font-medium">{entry.period}</TableCell>
                  <TableCell>{entry.totalClients}</TableCell>
                  <TableCell className="text-green-600">{formatCurrency(entry.revenuePlanGold)}</TableCell>
                  <TableCell className="text-green-600">{formatCurrency(entry.revenuePlanPremium)}</TableCell>
                  <TableCell className="text-green-600">{formatCurrency(entry.totalRevenue)}</TableCell>
                  <TableCell className="text-green-600 font-semibold">{formatCurrency(entry.accumulatedRevenue)}</TableCell>
                  <TableCell className={cn("font-semibold", entry.isInitialCost ? 'text-orange-600' : 'text-red-600')}>
                    {formatCurrency(entry.monthlyCost)}
                  </TableCell>
                  <TableCell className={cn("font-bold", entry.isInitialCost ? 'text-orange-600' : 'text-red-600')}>
                    {formatCurrency(entry.accumulatedCost)}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {entry.costDescription || '-'}
                  </TableCell>
                  <TableCell className={cn("text-right font-medium", entry.netProfit >= 0 ? 'text-green-600' : 'text-red-600')}>
                    {formatCurrency(entry.netProfit)}
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

export default RawDataTable;