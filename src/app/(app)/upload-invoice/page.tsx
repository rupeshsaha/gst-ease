"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileUploader } from "@/components/FileUploader";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { parseInvoice } from '@/services/invoice-service';
import { Input } from '@/components/ui/input';
import { InvoiceInput, ParsedInvoice } from '@/lib/types';

export default function UploadInvoicePage() {
  const [parsedData, setParsedData] = useState<ParsedInvoice | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file) {
      setParsedData(null);
      setFile(null);
      return;
    }

    setFile(file);
    setIsParsing(true);
    setParsedData(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const result = await parseInvoice({
          fileName: file.name,
          fileDataUri: base64data,
        });

        if (result) {
          setParsedData(result);
          toast({
            title: 'File Processed',
            description: 'Invoice data has been parsed successfully.',
          });
        } else {
          throw new Error('Parsing failed');
        }
      };
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Parsing Failed',
        description: 'Could not extract data from the invoice. Please try another file.',
      });
      setParsedData(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleFieldChange = (field: keyof ParsedInvoice, value: string) => {
    if (parsedData) {
      const updatedValue = ['taxableAmount', 'gstAmount', 'totalAmount'].includes(field)
        ? parseFloat(value) || 0
        : value;
      setParsedData({ ...parsedData, [field]: updatedValue });
    }
  };

  const handleSave = () => {
    if (parsedData) {
      const existingInvoices: (InvoiceInput & { status: string })[] = JSON.parse(localStorage.getItem('invoices') || '[]');
      const newInvoice: InvoiceInput & { status: string } = {
        ...parsedData,
        fileName: file?.name || 'unknown',
        fileDataUri: '',
        status: "Pending", // Default status
      };
      localStorage.setItem('invoices', JSON.stringify([...existingInvoices, newInvoice]));

      toast({
        title: 'Invoice Saved',
        description: `Invoice ${parsedData.invoiceNo} has been saved to your records.`,
      });
      setParsedData(null);
      setFile(null); 
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Invoice</h1>
        <p className="text-muted-foreground">
          Upload an invoice in PDF, JPG, or PNG format to parse its data.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Uploader</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader onFileUpload={handleFileUpload} file={file} isUploading={isParsing}/>
        </CardContent>
      </Card>

      {isParsing && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Parsing your invoice, please wait...</p>
        </div>
      )}

      {parsedData && (
        <Card>
          <CardHeader>
            <CardTitle>Parsed Invoice Data</CardTitle>
            <CardDescription>Review and edit the parsed data below before saving.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(parsedData).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</TableCell>
                      <TableCell>
                        <Input
                          value={String(value)}
                          onChange={(e) => handleFieldChange(key as keyof ParsedInvoice, e.target.value)}
                          className="h-8"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
