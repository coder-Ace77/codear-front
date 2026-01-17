import { useState } from "react";
import { Problem } from "@/types/problem";
import EditorialTab from "./EditorialTab";
import { Tab } from "@/types/Tabs";
import ProblemDescription from "./ProblemDescription";
import { SubmissionsContent } from "./SubmissionContent";

const EditorialContent = () => (
  <div className="p-6">
    <h2 className="text-lg font-semibold mb-3">Editorial</h2>
    <p className="text-muted-foreground">The editorial for this problem is not yet available.</p>
  </div>
);

interface ProblemPanelProps {
  problem: Problem;
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
  submissionId: string | null;
}
const ProblemPanel: React.FC<ProblemPanelProps> = ({ problem, activeTab, setActiveTab, submissionId }) => {

  const renderTabContent = () => {
    switch (activeTab) {
      case "problem":
        return <ProblemDescription problem={problem} />;
      case "submissions":
        return <SubmissionsContent problemId={problem.id} />;
      case "editorial":
        return <EditorialTab problemId={problem.id} />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tabId: Tab; label: string }> = ({ tabId, label }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      data-state={activeTab === tabId ? 'active' : 'inactive'}
      className="px-4 py-2.5 text-sm font-medium 
                 text-muted-foreground
                 data-[state=active]:text-foreground
                 data-[state=active]:border-b-2
                 data-[state=active]:border-primary"
    >
      {label}
    </button>
  );

  return (
    <div className="w-full lg:w-2/5 flex flex-col h-[500px] lg:h-full shrink-0 overflow-hidden bg-card border border-border rounded-xl">

      <div className="flex border-b border-border px-2">
        <TabButton tabId="problem" label="Problem" />
        <TabButton tabId="submissions" label="Submissions" />
        <TabButton tabId="editorial" label="Editorial" />
      </div>
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProblemPanel;