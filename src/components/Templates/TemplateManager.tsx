import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  Image,
  Video,
  FileAudio,
  Search,
  Tag,
  Users
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  mediaType?: "image" | "video" | "audio";
  mediaUrl?: string;
  variables: string[];
  usage: number;
  lastUsed: string;
  created: string;
  tags: string[];
}

const templates: Template[] = [
  {
    id: "1",
    name: "Daily Newsletter",
    category: "Newsletter",
    content: "Good morning {name}! 🌅\n\nHere's your daily update:\n\n• {headline1}\n• {headline2}\n• {headline3}\n\nHave a great day!\n\nBest regards,\n{sender_name}",
    variables: ["name", "headline1", "headline2", "headline3", "sender_name"],
    usage: 520,
    lastUsed: "Today at 9:00 AM",
    created: "2024-01-15",
    tags: ["newsletter", "daily", "updates"]
  },
  {
    id: "2",
    name: "Welcome Message",
    category: "Onboarding",
    content: "Hi {name}! 👋\n\nWelcome to {company_name}! We're excited to have you on board.\n\nWhat you can expect:\n✅ Weekly updates\n✅ Exclusive offers\n✅ Priority support\n\nReply STOP to unsubscribe anytime.",
    variables: ["name", "company_name"],
    usage: 89,
    lastUsed: "2 hours ago",
    created: "2024-01-20",
    tags: ["welcome", "onboarding", "introduction"]
  },
  {
    id: "3",
    name: "Product Launch",
    category: "Marketing",
    content: "🚀 Exciting News, {name}!\n\nWe're launching {product_name} on {launch_date}!\n\nEarly bird special: {discount}% off for the first 48 hours.\n\nGet yours: {link}\n\n#ProductLaunch #Exclusive",
    mediaType: "image",
    mediaUrl: "/product-image.jpg",
    variables: ["name", "product_name", "launch_date", "discount", "link"],
    usage: 1204,
    lastUsed: "Yesterday",
    created: "2024-01-10",
    tags: ["marketing", "product", "launch", "promotion"]
  },
  {
    id: "4",
    name: "Appointment Reminder",
    category: "Reminders",
    content: "Hi {name},\n\nThis is a friendly reminder about your appointment:\n\n📅 Date: {date}\n🕐 Time: {time}\n📍 Location: {location}\n\nPlease confirm your attendance by replying YES.\n\nSee you soon!",
    variables: ["name", "date", "time", "location"],
    usage: 156,
    lastUsed: "3 hours ago",
    created: "2024-01-18",
    tags: ["reminder", "appointment", "confirmation"]
  },
  {
    id: "5",
    name: "Holiday Promotion",
    category: "Seasonal",
    content: "🎉 {holiday_name} Special for {name}!\n\nEnjoy {discount}% off on all {category} items!\n\nUse code: {promo_code}\nValid until: {expiry_date}\n\nShop now: {shop_link}\n\nHappy {holiday_name}! 🎊",
    mediaType: "video",
    mediaUrl: "/holiday-promo.mp4",
    variables: ["holiday_name", "name", "discount", "category", "promo_code", "expiry_date", "shop_link"],
    usage: 2500,
    lastUsed: "Last week",
    created: "2024-01-05",
    tags: ["holiday", "promotion", "seasonal", "discount"]
  }
];

const categories = ["All", "Newsletter", "Marketing", "Onboarding", "Reminders", "Seasonal", "Support"];

export function TemplateManager() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const getMediaIcon = (mediaType?: string) => {
    switch (mediaType) {
      case "image":
        return <Image className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <FileAudio className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const CreateTemplateDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
          <DialogDescription>
            Design a reusable message template with personalization variables
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input id="template-name" placeholder="e.g., Daily Newsletter" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(cat => cat !== "All").map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Message Content</Label>
              <Textarea
                id="content"
                placeholder="Hi {name}! Welcome to our service..."
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Use {"{variable_name}"} for personalization. Variables will be replaced with actual values when sending.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Detected Variables:</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">name</Badge>
                <Badge variant="outline">company_name</Badge>
                <Badge variant="outline">date</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <div className="space-y-2">
              <Label>Media Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Text Only</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="media-upload">Upload Media</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-3">
                  <Image className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">Drag and drop your media file</p>
                <p className="text-xs text-muted-foreground">or click to browse files</p>
                <Button variant="outline" className="mt-3">
                  Browse Files
                </Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Images: JPG, PNG, GIF (max 5MB)</p>
              <p>• Videos: MP4, MOV (max 16MB)</p>
              <p>• Audio: MP3, WAV, OGG (max 16MB)</p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="newsletter, daily, updates" />
              <p className="text-xs text-muted-foreground">Separate tags with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief description of this template..."
                rows={3}
              />
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Template Preview:</h4>
              <div className="bg-background p-3 rounded border text-sm">
                <p>Hi <span className="bg-primary/20 px-1 rounded">John Doe</span>! Welcome to our service...</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            Create Template
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
          <h1 className="text-3xl font-bold text-foreground">Message Templates</h1>
          <p className="text-muted-foreground">
            Create and manage reusable message templates with personalization
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <CreateTemplateDialog />
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{templates.length}</p>
                <p className="text-sm text-muted-foreground">Total Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold">4,469</p>
                <p className="text-sm text-muted-foreground">Total Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Image className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">With Media</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getMediaIcon(template.mediaType)}
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {template.usage} uses
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Content Preview */}
                <div className="bg-muted p-3 rounded text-sm max-h-24 overflow-hidden">
                  {template.content.substring(0, 120)}
                  {template.content.length > 120 && "..."}
                </div>

                {/* Variables */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Variables:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.slice(0, 3).map((variable) => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {variable}
                      </Badge>
                    ))}
                    {template.variables.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.variables.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Last used: {template.lastUsed}</p>
                  <p>Created: {template.created}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}