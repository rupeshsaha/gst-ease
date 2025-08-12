'use server';
/**
 * @fileOverview An AI-powered invoice parser.
 *
 * - parseInvoice - A function that handles the invoice parsing process.
 * - ParseInvoiceInput - The input type for the parseInvoice function.
 * - ParsedInvoiceOutput - The return type for the parseInvoice function.
 */

import { ai } from '@/ai/genkit';
import { ParseInvoiceInputSchema, ParseInvoiceInput, ParsedInvoiceOutputSchema, ParsedInvoiceOutput } from '@/lib/types';


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

const parseInvoiceFlow = ai.defineFlow(
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


export async function parseInvoice(input: ParseInvoiceInput): Promise<ParsedInvoiceOutput> {
  return parseInvoiceFlow(input);
}
