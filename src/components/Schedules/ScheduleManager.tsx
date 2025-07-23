import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Users,
  MessageSquare,
  Calendar,
  Repeat,
  MoreVertical
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Schedule {
  id: string;
  name: string;
  template: string;
  recipients: number;
  frequency: string;
  nextRun: string;
  status: "active" | "paused" | "completed";
  created: string;
  lastRun?: string;
  successRate: number;
}

const schedules: Schedule[] = [
  {
    id: "1",
    name: "Daily Newsletter",
    template: "Newsletter Template",
    recipients: 520,
    frequency: "Daily at 9:00 AM",
    nextRun: "Tomorrow at 9:00 AM",
    status: "active",
    created: "2024-01-15",
    lastRun: "Today at 9:00 AM",
    successRate: 98.5
  },
  {
    id: "2",
    name: "Weekly Product Updates",
    template: "Product Update",
    recipients: 1204,
    frequency: "Every Monday at 10:00 AM",
    nextRun: "Mon, Jan 29 at 10:00 AM",
    status: "active",
    created: "2024-01-10",
    lastRun: "Mon, Jan 22 at 10:00 AM",
    successRate: 96.2
  },
  {
    id: "3",
    name: "Welcome Series - Step 1",
    template: "Welcome Message",
    recipients: 89,
    frequency: "Triggered by new signup",
    nextRun: "As needed",
    status: "active",
    created: "2024-01-20",
    lastRun: "2 hours ago",
    successRate: 100
  },
  {
    id: "4",
    name: "Holiday Promotion",
    template: "Holiday Special",
    recipients: 2500,
    frequency: "One-time",
    nextRun: "Completed",
    status: "completed",
    created: "2024-01-05",
    lastRun: "Jan 15 at 2:00 PM",
    successRate: 94.8
  }
];

export function ScheduleManager() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "paused":
        return "bg-warning text-warning-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const CreateScheduleDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Schedule</DialogTitle>
          <DialogDescription>
            Set up a new WhatsApp message schedule with personalized templates
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="recipients">Recipients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Schedule Name</Label>
              <Input id="name" placeholder="e.g., Daily Newsletter" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template">Message Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newsletter">Newsletter Template</SelectItem>
                  <SelectItem value="welcome">Welcome Message</SelectItem>
                  <SelectItem value="reminder">Reminder Template</SelectItem>
                  <SelectItem value="promotion">Promotional Template</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                placeholder="Brief description of this schedule..."
                rows={3}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <div className="space-y-2">
              <Label>Schedule Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">One-time</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="triggered">Triggered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Start Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="cet">Central European Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="recipients" className="space-y-4">
            <div className="space-y-2">
              <Label>Recipient Groups</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contacts</SelectItem>
                  <SelectItem value="subscribers">Newsletter Subscribers</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                  <SelectItem value="leads">Leads</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Estimated Recipients</p>
                  <p className="text-sm text-muted-foreground">Based on selected groups</p>
                </div>
                <div className="text-2xl font-bold text-primary">1,204</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            Create Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Message Schedules</h1>
          <p className="text-muted-foreground">
            Manage your automated WhatsApp message campaigns
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              New Schedule
            </Button>
          </DialogTrigger>
          <CreateScheduleDialog />
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Active Schedules</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-muted-foreground">Messages Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">3.2K</p>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Repeat className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">97.2%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedules List */}
      <Card>
        <CardHeader>
          <CardTitle>All Schedules</CardTitle>
          <CardDescription>
            View and manage all your message schedules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-foreground">{schedule.name}</h3>
                    <Badge className={getStatusColor(schedule.status)}>
                      {schedule.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium">Template:</p>
                      <p>{schedule.template}</p>
                    </div>
                    <div>
                      <p className="font-medium">Recipients:</p>
                      <p>{schedule.recipients.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Frequency:</p>
                      <p>{schedule.frequency}</p>
                    </div>
                    <div>
                      <p className="font-medium">Next Run:</p>
                      <p>{schedule.nextRun}</p>
                    </div>
                  </div>
                  {schedule.lastRun && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Last run: {schedule.lastRun} • Success rate: {schedule.successRate}%
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {schedule.status === "active" ? (
                    <Button size="sm" variant="outline">
                      <Pause className="w-4 h-4" />
                    </Button>
                  ) : schedule.status === "paused" ? (
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4" />
                    </Button>
                  ) : null}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        View Messages
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}