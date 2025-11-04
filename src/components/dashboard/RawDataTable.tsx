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
        <CardTitle className="text-base">Tabela Detalhada - Dados da Planilha</CardTitle>
        <CardDescription className="text-xs">Visão completa dos dados financeiros por período.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Período</TableHead>
                <TableHead className="text-xs">Clientes</TableHead>
                <TableHead className="text-xs">Rec. GOLD</TableHead>
                <TableHead className="text-xs">Rec. PREMIUM</TableHead>
                <TableHead className="text-xs">Rec. Total</TableHead>
                <TableHead className="text-xs">Rec. Acumulada</TableHead>
                <TableHead className="text-xs">Custo Mensal</TableHead>
                <TableHead className="text-xs">Custo Acumulado</TableHead>
                <TableHead className="text-xs">Descrição</TableHead>
                <TableHead className="text-right text-xs">Lucro Líquido</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.period} className={entry.isInitialCost ? 'bg-orange-50' : ''}>
                  <TableCell className="font-medium text-sm">{entry.period}</TableCell>
                  <TableCell className="text-sm">{entry.totalClients}</TableCell>
                  <TableCell className="text-green-600 text-sm">{formatCurrency(entry.revenuePlanGold)}</TableCell>
                  <TableCell className="text-green-600 text-sm">{formatCurrency(entry.revenuePlanPremium)}</TableCell>
                  <TableCell className="text-green-600 text-sm">{formatCurrency(entry.totalRevenue)}</TableCell>
                  <TableCell className="text-green-600 font-semibold text-sm">{formatCurrency(entry.accumulatedRevenue)}</TableCell>
                  <TableCell className={cn("font-semibold text-sm", entry.isInitialCost ? 'text-orange-600' : 'text-red-600')}>
                    {formatCurrency(entry.monthlyCost)}
                  </TableCell>
                  <TableCell className={cn("font-bold text-sm", entry.isInitialCost ? 'text-orange-600' : 'text-red-600')}>
                    {formatCurrency(entry.accumulatedCost)}
                  </TableCell>
                  <TableCell className="text-xs text-gray-600">
                    {entry.costDescription || '-'}
                  </TableCell>
                  <TableCell className={cn("text-right font-medium text-sm", entry.netProfit >= 0 ? 'text-green-600' : 'text-red-600')}>
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