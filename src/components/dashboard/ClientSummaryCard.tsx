import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FinanceRecord } from '@/lib/data-processing';

interface ClientSummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: FinanceRecord | undefined;
  onClick?: () => void;
}

const ClientSummaryCard: React.FC<ClientSummaryCardProps> = ({ data, onClick, className, ...props }) => {
  const totalClients = data?.totalClients || 0;
  const clientsPlanStart = data?.clientsPlanStart || 0;
  const clientsPlanGold = data?.clientsPlanGold || 0;
  const clientsPlanPremium = data?.clientsPlanPremium || 0;

  return (
    <Card 
      className={cn("flex flex-col cursor-pointer hover:shadow-lg transition-shadow", className)} 
      onClick={onClick}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Visão Geral de Clientes</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between text-sm">
        <div className="flex justify-between items-center mb-1">
          <span className="text-muted-foreground">Total Clientes:</span>
          <span className="font-bold">{totalClients}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-muted-foreground">Plano START:</span>
          <span className="font-medium">{clientsPlanStart}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-muted-foreground">Plano GOLD:</span>
          <span className="font-medium">{clientsPlanGold}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Plano PREMIUM:</span>
          <span className="font-medium">{clientsPlanPremium}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Detalhes da distribuição de clientes por plano.
        </p>
      </CardContent>
    </Card>
  );
};

export default ClientSummaryCard;