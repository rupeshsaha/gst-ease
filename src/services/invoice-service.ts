'use server';

import { parseInvoice as parseInvoiceFlow } from "@/ai/flows/parse-invoice-flow";
import { ParseInvoiceInput, ParsedInvoice } from "@/lib/types";


export async function parseInvoice(input: ParseInvoiceInput): Promise<ParsedInvoice | null> {
    try {
        const parsedData = await parseInvoiceFlow(input);
        return parsedData;
    } catch (error) {
        console.error("Error parsing invoice:", error);
        return null;
    }
}
