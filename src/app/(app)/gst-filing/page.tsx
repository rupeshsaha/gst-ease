import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import gstData from "@/data/gst.json";

export default function GstFilingPage() {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'filed':
        return 'default';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">GST Filing</h1>
        <p className="text-muted-foreground">
          Generate your GSTR-1 and GSTR-3B reports and view your filing history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate New Filing</CardTitle>
          <CardDescription>
            Generate reports for the current filing period based on your invoice data.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button>Generate GSTR-1</Button>
          <Button>Generate GSTR-3B</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Filing Summary</CardTitle>
            <CardDescription>A summary of your recent GST filings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Filing Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gstData.map((filing, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{filing.returnType}</TableCell>
                    <TableCell>{filing.period}</TableCell>
                    <TableCell>{filing.dueDate}</TableCell>
                    <TableCell>{filing.filingDate || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(filing.status)}>{filing.status}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                        {filing.status === "Filed" ? (
                             <div className="flex justify-center gap-2">
                                <Button variant="outline" size="icon">
                                    <FileJson className="h-4 w-4"/>
                                    <span className="sr-only">Download JSON</span>
                                </Button>
                                <Button variant="outline" size="icon">
                                    <FileSpreadsheet className="h-4 w-4"/>
                                    <span className="sr-only">Download Excel</span>
                                </Button>
                             </div>
                        ) : (
                            <span className="text-muted-foreground">-</span>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
