import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  MessageSquare,
  Image,
  BarChart3,
  Settings,
  Menu,
  X,
  Send,
  Clock,
  Shield
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "schedules", label: "Schedules", icon: Clock },
  { id: "recipients", label: "Recipients", icon: Users },
  { id: "templates", label: "Templates", icon: MessageSquare },
  { id: "media", label: "Media", icon: Image },
  { id: "logs", label: "Logs", icon: Send },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-card border-r border-border h-screen transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">WhatsApp</h1>
                <p className="text-xs text-muted-foreground">Scheduler</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200",
                isCollapsed ? "px-3" : "px-3",
                activeTab === item.id && "bg-primary text-primary-foreground shadow-sm"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Status Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-muted rounded-lg p-3 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs font-medium text-foreground">System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">API Connected</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}