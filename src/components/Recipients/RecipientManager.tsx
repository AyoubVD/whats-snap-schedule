import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users,
  Plus,
  Search,
  Filter,
  Upload,
  Download,
  Edit,
  Trash2,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Tag
} from "lucide-react";

interface Recipient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  tags: string[];
  status: "active" | "inactive" | "blocked";
  lastContact: string;
  totalMessages: number;
  groups: string[];
}

const recipients: Recipient[] = [
  {
    id: "1",
    name: "Alice Johnson",
    phone: "+1 (555) 123-4567",
    email: "alice@example.com",
    location: "New York, NY",
    tags: ["VIP", "Newsletter"],
    status: "active",
    lastContact: "2024-01-23",
    totalMessages: 45,
    groups: ["Newsletter Subscribers", "VIP Customers"]
  },
  {
    id: "2",
    name: "Bob Smith",
    phone: "+1 (555) 987-6543",
    email: "bob@example.com",
    location: "Los Angeles, CA",
    tags: ["Customer", "Support"],
    status: "active",
    lastContact: "2024-01-22",
    totalMessages: 23,
    groups: ["Customers", "Support Tickets"]
  },
  {
    id: "3",
    name: "Carol Davis",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    tags: ["Lead", "Newsletter"],
    status: "active",
    lastContact: "2024-01-21",
    totalMessages: 12,
    groups: ["Newsletter Subscribers", "Leads"]
  },
  {
    id: "4",
    name: "David Wilson",
    phone: "+1 (555) 321-0987",
    email: "david@example.com",
    tags: ["Customer"],
    status: "inactive",
    lastContact: "2024-01-15",
    totalMessages: 67,
    groups: ["Customers"]
  }
];

const groups = [
  { name: "Newsletter Subscribers", count: 1204, description: "Users subscribed to newsletters" },
  { name: "VIP Customers", count: 89, description: "High-value customers" },
  { name: "Leads", count: 456, description: "Potential customers" },
  { name: "Support Tickets", count: 234, description: "Users with active support" },
  { name: "Customers", count: 892, description: "Active customers" }
];

export function RecipientManager() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "inactive":
        return "bg-warning text-warning-foreground";
      case "blocked":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const AddRecipientDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Recipient</DialogTitle>
          <DialogDescription>
            Add a new contact to your WhatsApp messaging list
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+1 (555) 123-4567" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input id="location" placeholder="New York, NY" />
          </div>
          
          <div className="space-y-2">
            <Label>Groups</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select groups" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.name} value={group.name}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input id="tags" placeholder="VIP, Customer, Newsletter" />
            <p className="text-xs text-muted-foreground">Separate tags with commas</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsAddDialogOpen(false)}>
            Add Recipient
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
          <h1 className="text-3xl font-bold text-foreground">Recipients</h1>
          <p className="text-muted-foreground">
            Manage your WhatsApp contacts and groups
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-hover">
                <Plus className="w-4 h-4 mr-2" />
                Add Recipient
              </Button>
            </DialogTrigger>
            <AddRecipientDialog />
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">1,204</p>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserPlus className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold">1,189</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">97.2%</p>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recipients" className="w-full">
        <TabsList>
          <TabsTrigger value="recipients">All Recipients</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="recipients" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search recipients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Groups</SelectItem>
                    {groups.map((group) => (
                      <SelectItem key={group.name} value={group.name}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recipients Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recipients List</CardTitle>
              <CardDescription>
                {recipients.length} total recipients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Groups</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipients.map((recipient) => (
                    <TableRow key={recipient.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{recipient.name}</p>
                          <div className="flex space-x-1 mt-1">
                            {recipient.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{recipient.phone}</span>
                          </div>
                          {recipient.email && (
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm">{recipient.email}</span>
                            </div>
                          )}
                          {recipient.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm">{recipient.location}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {recipient.groups.slice(0, 2).map((group) => (
                            <Badge key={group} variant="secondary" className="text-xs block">
                              {group}
                            </Badge>
                          ))}
                          {recipient.groups.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{recipient.groups.length - 2} more
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(recipient.status)}>
                          {recipient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{recipient.lastContact}</p>
                          <p className="text-xs text-muted-foreground">
                            {recipient.totalMessages} messages
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <Card key={group.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{group.count.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">members</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}