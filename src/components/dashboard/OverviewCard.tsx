import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface OverviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
  detailData?: { label: string; value: string | number }[];
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, description, icon, detailData, className, ...props }) => {
  const content = (
    <Card className={cn("flex flex-col", className)} {...props}>
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

  if (detailData && detailData.length > 0) {
    return (
      <Popover>
        <PopoverTrigger asChild>{content}</PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Table>
            <TableBody>
              {detailData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.label}</TableCell>
                  <TableCell className="text-right">{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PopoverContent>
      </Popover>
    );
  }

  return content;
};

export default OverviewCard;