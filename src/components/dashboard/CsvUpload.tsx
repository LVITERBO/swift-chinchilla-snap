import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface CsvUploadProps {
  onFileUpload: (csvContent: string) => void;
}

const CsvUpload: React.FC<CsvUploadProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileUpload(content);
        toast.success("Planilha CSV carregada com sucesso!");
      };
      reader.onerror = () => {
        toast.error("Erro ao ler o arquivo CSV.");
      };
      reader.readAsText(file, 'utf-8');
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="csv-upload">Upload de Planilha CSV</Label>
      <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} />
      <p className="text-muted-foreground">Envie um novo arquivo CSV para atualizar os dados.</p>
    </div>
  );
};

export default CsvUpload;