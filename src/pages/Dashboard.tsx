import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { DashboardOverview } from "@/components/Dashboard/DashboardOverview";
import { ScheduleManager } from "@/components/Schedules/ScheduleManager";
import { RecipientManager } from "@/components/Recipients/RecipientManager";
import { TemplateManager } from "@/components/Templates/TemplateManager";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "schedules":
        return <ScheduleManager />;
      case "recipients":
        return <RecipientManager />;
      case "templates":
        return <TemplateManager />;
      case "media":
        return <div className="p-8 text-center text-muted-foreground">Media management coming soon...</div>;
      case "logs":
        return <div className="p-8 text-center text-muted-foreground">Message logs coming soon...</div>;
      case "settings":
        return <div className="p-8 text-center text-muted-foreground">Settings coming soon...</div>;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;