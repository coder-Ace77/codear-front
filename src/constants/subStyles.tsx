import {
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  ChevronDown,
  Code,
  LineChart,
  Database,
  FileText,
} from "lucide-react";

import type { Submission, SubmissionStatus } from "@/types/submission"; // Assumes types are in this file


export const getStatusStyles = (status: SubmissionStatus) => {
  switch (status) {
    case "PASSED":
    case "COMPLETED":
      return {
        icon: <CheckCircle className="w-5 h-5" />,
        color: "text-green-500",
        bgColor: "bg-green-50",
      };
    case "FAILED":
    case "ERROR":
      return {
        icon: <XCircle className="w-5 h-5" />,
        color: "text-red-500",
        bgColor: "bg-red-50",
      };
    case "RUNNING":
      return {
        icon: <Loader2 className="w-5 h-5 animate-spin" />,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
      };
    case "PENDING":
    default:
      return {
        icon: <Clock className="w-5 h-5" />,
        color: "text-yellow-500",
        bgColor: "bg-yellow-50",
      };
  }
};
