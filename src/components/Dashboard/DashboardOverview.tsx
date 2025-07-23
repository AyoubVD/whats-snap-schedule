import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Send,
  Clock,
  Users,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Plus
} from "lucide-react";

const stats = [
  {
    title: "Messages Sent Today",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: Send,
    color: "success"
  },
  {
    title: "Active Schedules",
    value: "18",
    change: "+3",
    trend: "up",
    icon: Clock,
    color: "primary"
  },
  {
    title: "Total Recipients",
    value: "1,204",
    change: "+45",
    trend: "up",
    icon: Users,
    color: "accent"
  },
  {
    title: "Failed Messages",
    value: "3",
    change: "-2",
    trend: "down",
    icon: AlertCircle,
    color: "warning"
  },
];

const recentActivity = [
  {
    id: 1,
    type: "success",
    message: "Daily Newsletter sent to 520 recipients",
    time: "2 minutes ago",
    status: "completed"
  },
  {
    id: 2,
    type: "warning",
    message: "Promotional Campaign - 3 failed deliveries",
    time: "15 minutes ago",
    status: "partial"
  },
  {
    id: 3,
    type: "success",
    message: "Welcome Series - Step 2 sent to 89 recipients",
    time: "1 hour ago",
    status: "completed"
  },
  {
    id: 4,
    type: "info",
    message: "New schedule created: Weekly Check-in",
    time: "3 hours ago",
    status: "scheduled"
  },
];

const upcomingSchedules = [
  {
    id: 1,
    name: "Monday Motivation",
    time: "Tomorrow at 9:00 AM",
    recipients: 856,
    template: "Motivational Quote"
  },
  {
    id: 2,
    name: "Product Update",
    time: "Wed at 2:00 PM",
    recipients: 1204,
    template: "Company News"
  },
  {
    id: 3,
    name: "Weekend Reminder",
    time: "Fri at 5:00 PM",
    recipients: 432,
    template: "Casual Reminder"
  },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your WhatsApp message campaigns and schedules
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          New Schedule
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-4 h-4 text-${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-success" />
                  )}
                  <span className="text-success font-medium">{stat.change}</span>
                  <span className="text-muted-foreground">from yesterday</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest message delivery updates and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === "success" && (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                    {activity.type === "warning" && (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    {activity.type === "info" && (
                      <Clock className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <Badge
                        variant={
                          activity.status === "completed"
                            ? "default"
                            : activity.status === "partial"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedules */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Upcoming Schedules</span>
            </CardTitle>
            <CardDescription>
              Messages scheduled to be sent in the next few days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedules.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{schedule.name}</h4>
                    <p className="text-sm text-muted-foreground">{schedule.time}</p>
                    <p className="text-xs text-muted-foreground">
                      Template: {schedule.template}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{schedule.recipients.toLocaleString()}</span>
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">
                      Scheduled
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}