import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, FileText, CalendarCheck2, Users } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Invoices",
      value: "125",
      icon: FileText,
      description: "in the last 30 days",
    },
    {
      title: "Pending Filings",
      value: "2",
      icon: CreditCard,
      description: "GSTR-1 & GSTR-3B for July",
    },
    {
      title: "Next Due Date",
      value: "Aug 11, 2024",
      icon: CalendarCheck2,
      description: "for GSTR-1 (July)",
    },
    
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, [User Name]</h1>
        <p className="text-muted-foreground">
          Here's a quick overview of your GST compliance status.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No recent activity to show.</p>
        </CardContent>
      </Card>
    </div>
  );
}
