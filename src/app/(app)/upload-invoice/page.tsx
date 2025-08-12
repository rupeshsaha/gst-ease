"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileUploader } from "@/components/FileUploader";
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

type ParsedInvoice = {
  invoiceNo: string;
  supplierGstin: string;
  customerGstin: string;
  invoiceDate: string;
  taxableAmount: number;
  gstAmount: number;
  totalAmount: number;
};

const dummyParsedData: ParsedInvoice = {
  invoiceNo: "INV-2024-008",
  supplierGstin: "33ABCDE1234F1Z5",
  customerGstin: "29AABCU9567R1Z5",
  invoiceDate: "2024-07-25",
  taxableAmount: 15000.00,
  gstAmount: 2700.00,
  totalAmount: 17700.00,
};

export default function UploadInvoicePage() {
  const [parsedData, setParsedData] = useState<ParsedInvoice | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    if (file) {
      // Simulate file processing and parsing
      setTimeout(() => {
        setParsedData(dummyParsedData);
        toast({
            title: "File Processed",
            description: "Invoice data has been parsed successfully.",
        });
      }, 1000);
    } else {
        setParsedData(null);
    }
  };

  const handleSave = () => {
    if (parsedData) {
        toast({
            title: "Invoice Saved",
            description: `Invoice ${parsedData.invoiceNo} has been saved to your records.`,
        });
        setParsedData(null);
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
            <FileUploader onFileUpload={handleFileUpload} />
        </CardContent>
      </Card>
      

      {parsedData && (
        <Card>
            <CardHeader>
                <CardTitle>Parsed Invoice Data</CardTitle>
                <CardDescription>Review the parsed data below before saving.</CardDescription>
            </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice No</TableHead>
                    <TableHead>Supplier GSTIN</TableHead>
                    <TableHead>Customer GSTIN</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead className="text-right">Taxable Amount</TableHead>
                    <TableHead className="text-right">GST Amount</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{parsedData.invoiceNo}</TableCell>
                    <TableCell>{parsedData.supplierGstin}</TableCell>
                    <TableCell>{parsedData.customerGstin}</TableCell>
                    <TableCell>{parsedData.invoiceDate}</TableCell>
                    <TableCell className="text-right">{parsedData.taxableAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{parsedData.gstAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold">{parsedData.totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
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
