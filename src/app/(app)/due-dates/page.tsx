"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { BellPlus, CalendarClock } from "lucide-react";
import { useToast } from '@/hooks/use-toast';


export default function DueDatesPage() {
    const [date, setDate] = useState<Date | undefined>(new Date('2024-08-11'));
    const { toast } = useToast();

    const handleSetReminder = () => {
        toast({
            title: "Reminder Set!",
            description: `We'll remind you about the filing for GSTR-1 on ${date?.toLocaleDateString()}.`
        });
    };

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Due Date Tracker</h1>
        <p className="text-muted-foreground">
          Stay on top of your GST filing deadlines.
        </p>
      </div>

      <Card className="w-full md:w-1/2 lg:w-1/3">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <CalendarClock className="h-8 w-8" />
          </div>
          <div>
            <CardDescription>Next GST Filing Due Date</CardDescription>
            <CardTitle className="text-3xl">August 11, 2024</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This is the deadline for filing your <strong>GSTR-1</strong> for the period of July 2024.
          </p>
          <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <BellPlus className="mr-2 h-4 w-4" /> Set Reminder
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Set a Reminder</DialogTitle>
                <DialogDescription>
                    Select a date to be reminded. We will notify you via email.
                </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center py-4">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                </div>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button type="submit" onClick={handleSetReminder}>Save changes</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
