import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RawDataTable from '@/components/dashboard/RawDataTable'; // Corrigido para import default
import { RawTableData } from '@/lib/data-processing';

interface DetailModalProps {
  children: React.ReactNode;
  title: string;
  description: string;
  data: RawTableData[];
}

const DetailModal: React.FC<DetailModalProps> = ({ children, title, description, data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <RawDataTable data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;