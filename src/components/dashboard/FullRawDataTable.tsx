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
          <CardTitle>Tabela Completa de Dados Brutos</CardTitle>
          <CardDescription>Nenhum dado disponível para exibição.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Por favor, faça o upload de um arquivo CSV.</p>
        </CardContent>
      </Card>
    );
  }

  // Assumimos que a primeira linha pode ser um cabeçalho ou parte dele.
  // Para dados brutos, exibimos todas as linhas como estão.
  const headers = data[0];
  const bodyRows = data.slice(0); // Inclui todas as linhas, incluindo os cabeçalhos originais

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabela Completa de Dados Brutos</CardTitle>
        <CardDescription>Todos os dados do arquivo CSV, linha por linha.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader>
              {/* Renderiza as primeiras 3 linhas como cabeçalhos para refletir a estrutura do CSV */}
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
              {/* Renderiza as linhas de dados a partir da 4ª linha */}
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