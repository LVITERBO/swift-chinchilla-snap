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
          <CardTitle className="text-lg">Tabela Completa de Dados Brutos</CardTitle>
          <CardDescription className="text-sm">Nenhum dado disponível para exibição.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Por favor, faça o upload de um arquivo CSV.</p>
        </CardContent>
      </Card>
    );
  }

  const headers = data[0];
  const bodyRows = data.slice(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tabela Completa de Dados Brutos</CardTitle>
        <CardDescription className="text-sm">Todos os dados do arquivo CSV, linha por linha.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader>
              {data.slice(0, 3).map((row, rowIndex) => (
                <TableRow key={`header-row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <TableHead key={`header-${rowIndex}-${cellIndex}`} className="whitespace-nowrap">
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
                    <TableCell key={`body-${rowIndex}-${cellIndex}`} className="whitespace-nowrap">
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