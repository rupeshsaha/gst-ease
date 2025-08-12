import { z } from 'zod';

export const ParseInvoiceInputSchema = z.object({
  fileName: z.string().describe('The name of the invoice file.'),
  fileDataUri: z
    .string()
    .describe(
      "A PDF or image of an invoice, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type InvoiceInput = z.infer<typeof ParseInvoiceInputSchema>;

export const ParsedInvoiceOutputSchema = z.object({
  invoiceNo: z.string().describe('The invoice number.'),
  supplierGstin: z.string().describe("The supplier's GST Identification Number."),
  customerGstin: z.string().describe("The customer's GST Identification Number."),
  invoiceDate: z.string().describe('The date of the invoice in YYYY-MM-DD format.'),
  taxableAmount: z.number().describe('The total taxable amount.'),
  gstAmount: z.number().describe('The total GST amount (CGST + SGST or IGST).'),
  totalAmount: z.number().describe('The final total amount of the invoice.'),
});
export type ParsedInvoice = z.infer<typeof ParsedInvoiceOutputSchema>;
