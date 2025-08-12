'use server';
/**
 * @fileOverview An AI-powered invoice parser.
 *
 * - parseInvoiceFlow - A function that handles the invoice parsing process.
 * - ParseInvoiceInputSchema - The input type for the parseInvoiceFlow function.
 * - ParsedInvoiceOutputSchema - The return type for the parseInvoiceFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const ParseInvoiceInputSchema = z.object({
  fileName: z.string().describe('The name of the invoice file.'),
  fileDataUri: z
    .string()
    .describe(
      "A PDF or image of an invoice, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ParseInvoiceInput = z.infer<typeof ParseInvoiceInputSchema>;

export const ParsedInvoiceOutputSchema = z.object({
  invoiceNo: z.string().describe('The invoice number.'),
  supplierGstin: z.string().describe("The supplier's GST Identification Number."),
  customerGstin: z.string().describe("The customer's GST Identification Number."),
  invoiceDate: z.string().describe('The date of the invoice in YYYY-MM-DD format.'),
  taxableAmount: z.number().describe('The total taxable amount.'),
  gstAmount: z.number().describe('The total GST amount (CGST + SGST or IGST).'),
  totalAmount: z.number().describe('The final total amount of the invoice.'),
});
export type ParsedInvoiceOutput = z.infer<typeof ParsedInvoiceOutputSchema>;

const prompt = ai.definePrompt({
  name: 'parseInvoicePrompt',
  input: { schema: ParseInvoiceInputSchema },
  output: { schema: ParsedInvoiceOutputSchema },
  prompt: `You are an expert accountant specializing in Indian GST invoices. Your task is to accurately parse the provided invoice document and extract key information.

Analyze the document with the file name '{{{fileName}}}' and extract the following fields:
- Invoice No: The unique identifier for the invoice.
- Supplier GSTIN: The Goods and Services Tax Identification Number of the entity issuing the invoice.
- Customer GSTIN: The Goods and Services Tax Identification Number of the recipient of the invoice.
- Invoice Date: The date the invoice was issued. Format this as YYYY-MM-DD.
- Taxable Amount: The total value of goods or services before any tax is applied.
- GST Amount: The total tax amount, which could be a sum of CGST and SGST, or just IGST.
- Total Amount: The final amount payable, including the taxable amount and GST.

Invoice Document:
{{media url=fileDataUri}}

Ensure all extracted data is in the correct format as specified in the output schema.
`,
});

export const parseInvoiceFlow = ai.defineFlow(
  {
    name: 'parseInvoiceFlow',
    inputSchema: ParseInvoiceInputSchema,
    outputSchema: ParsedInvoiceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to parse invoice: LLM returned no output.');
    }
    return output;
  }
);
