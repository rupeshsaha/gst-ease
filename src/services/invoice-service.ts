'use server';

import { parseInvoiceFlow, ParseInvoiceInputSchema, ParsedInvoiceOutputSchema } from "@/ai/flows/parse-invoice-flow";
import { z } from "zod";

export type InvoiceInput = z.infer<typeof ParseInvoiceInputSchema>;
export type ParsedInvoice = z.infer<typeof ParsedInvoiceOutputSchema>;

export async function parseInvoice(input: InvoiceInput): Promise<ParsedInvoice | null> {
    try {
        const parsedData = await parseInvoiceFlow(input);
        return parsedData;
    } catch (error) {
        console.error("Error parsing invoice:", error);
        return null;
    }
}
