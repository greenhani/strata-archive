import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  FileText,
  Eye,
  Download,
  Share,
  Edit,
  Clock,
  User,
  Tag,
  Activity
} from "lucide-react";
import { UserRole } from "@/components/LoginScreen";

interface DocumentPreviewProps {
  userRole: UserRole;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  owner: string;
  department: string;
  status: "pending" | "approved" | "revision";
  tags: string[];
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Q3 Financial Report.pdf",
    type: "PDF",
    size: "2.4 MB",
    lastModified: "2 hours ago",
    owner: "Sarah Johnson",
    department: "Finance",
    status: "approved",
    tags: ["Finance", "Q3", "Report"]
  },
  {
    id: "2", 
    name: "Employee Handbook 2024.docx",
    type: "Word",
    size: "1.8 MB",
    lastModified: "1 day ago",
    owner: "HR Department",
    department: "Human Resources",
    status: "pending",
    tags: ["HR", "Handbook", "Policy"]
  },
  {
    id: "3",
    name: "Project Proposal - Ruya 2.0.pptx",
    type: "PowerPoint",
    size: "5.2 MB", 
    lastModified: "3 days ago",
    owner: "Ahmed Al-Rashid",
    department: "Engineering",
    status: "revision",
    tags: ["Project", "Engineering", "Proposal"]
  }
];

export default function DocumentPreview({ userRole }: DocumentPreviewProps) {
  const { id } = useParams();
  const document = mockDocuments.find(doc => doc.id === id);

  if (!document) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documents
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: Document["status"]) => {
    const variants = {
      pending: "status-pending",
      approved: "status-approved", 
      revision: "status-revision"
    };
    
    return (
      <Badge className={`${variants[status]} text-xs px-2 py-1`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const canSeeFullMetadata = userRole === "admin";
  const canSeeVersioning = userRole === "admin" || userRole === "manager";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold">{document.name}</h1>
            <p className="text-sm text-muted-foreground">
              {document.owner} • {document.lastModified}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-4 h-4" />
          </Button>
          {userRole !== "employee" && (
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Document Content */}
        <div className="flex-1 p-6 bg-muted/20">
          <div className="bg-card rounded-lg shadow-sm border border-border h-full flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-xl font-semibold mb-2">{document.name}</h2>
              <p className="text-muted-foreground mb-4">Document preview would appear here</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <span>{document.type}</span>
                <span>•</span>
                <span>{document.size}</span>
                <span>•</span>
                {getStatusBadge(document.status)}
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Sidebar */}
        <div className="w-80 border-l border-border bg-card">
          <div className="p-4 space-y-6">
            {/* Basic Info */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Document Info
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  {getStatusBadge(document.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Size</span>
                  <span>{document.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span>{document.type}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* People */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                People
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span>{document.owner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span>{document.department}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {document.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {canSeeVersioning && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Version History
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded-lg">
                      <div className="font-medium">v1.2 (Current)</div>
                      <div className="text-muted-foreground">Updated 2 hours ago</div>
                    </div>
                    <div className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="font-medium">v1.1</div>
                      <div className="text-muted-foreground">Updated 1 day ago</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {canSeeFullMetadata && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Activity Log
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <div className="font-medium">Document approved</div>
                      <div className="text-muted-foreground">by Sarah Johnson • 2 hours ago</div>
                    </div>
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <div className="font-medium">Document updated</div>
                      <div className="text-muted-foreground">by Ahmed Al-Rashid • 1 day ago</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {userRole === "employee" && (
              <>
                <Separator />
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Acknowledge Document
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}