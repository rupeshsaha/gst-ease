
"use client";

import { Control, Controller } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldErrors } from "react-hook-form";

export const signupStep2Schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),
  pan: z.string().regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format"),
  filingFrequency: z.enum(["monthly", "quarterly"]),
});

export type SignupStep2Input = z.infer<typeof signupStep2Schema>;

interface SignupStep2Props {
  control: Control<SignupStep2Input>;
  errors: FieldErrors<SignupStep2Input>;
}

export function SignupStep2({ control, errors }: SignupStep2Props) {
  return (
    <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Controller
            name="businessName"
            control={control}
            defaultValue=""
            render={({ field }) => <Input id="businessName" placeholder="Your Company Inc." {...field} />}
            />
            {errors.businessName && <p className="text-sm text-destructive">{errors.businessName.message}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="gstin">GSTIN</Label>
            <Controller
            name="gstin"
            control={control}
            defaultValue=""
            render={({ field }) => <Input id="gstin" placeholder="22AAAAA0000A1Z5" {...field} />}
            />
            {errors.gstin && <p className="text-sm text-destructive">{errors.gstin.message}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Controller
            name="pan"
            control={control}
            defaultValue=""
            render={({ field }) => <Input id="pan" placeholder="ABCDE1234F" {...field} />}
            />
            {errors.pan && <p className="text-sm text-destructive">{errors.pan.message}</p>}
        </div>
        <div className="space-y-2">
            <Label>Preferred Filing Frequency</Label>
            <Controller
                name="filingFrequency"
                control={control}
                defaultValue="monthly"
                render={({ field }) => (
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4 pt-2"
                    >
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="quarterly" id="quarterly" />
                        <Label htmlFor="quarterly">Quarterly</Label>
                        </div>
                    </RadioGroup>
                )}
            />
            {errors.filingFrequency && <p className="text-sm text-destructive">{errors.filingFrequency.message}</p>}
        </div>
    </div>
  );
}

    