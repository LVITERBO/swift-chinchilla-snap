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

interface FullRawDataTableProps {
  data: string[][];
}

const FullRawDataTable: React.FC<FullRawDataTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tabela Completa de Dados Brutos</CardTitle>
          <CardDescription className="text-xs">Nenhum dado disponível para exibição.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Por favor, faça o upload de um arquivo CSV.</p>
        </CardContent>
      </Card>
    );
  }

  const headers = data[0];
  const bodyRows = data.slice(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tabela Completa de Dados Brutos</CardTitle>
        <CardDescription className="text-xs">Todos os dados do arquivo CSV, linha por linha.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader>
              {data.slice(0, 3).map((row, rowIndex) => (
                <TableRow key={`header-row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <TableHead key={`header-${rowIndex}-${cellIndex}`} className="whitespace-nowrap text-xs">
                      {cell}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {data.slice(3).map((row, rowIndex) => (
                <TableRow key={`body-row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={`body-${rowIndex}-${cellIndex}`} className="whitespace-nowrap text-sm">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FullRawDataTable;