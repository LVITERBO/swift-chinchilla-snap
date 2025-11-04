import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface OverviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, description, icon, onClick, className, ...props }) => {
  return (
    <Card 
      className={cn("flex flex-col cursor-pointer hover:shadow-lg transition-shadow", className)} 
      onClick={onClick}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;