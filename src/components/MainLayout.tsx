import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronRight,
  FolderOpen,
  FileText,
  Users,
  Shield,
  Activity,
  Filter,
  SortAsc,
  MoreVertical,
  Eye,
  Download,
  Share,
  Edit,
  Clock,
  User,
  Tag,
  Building
} from "lucide-react";
import { UserRole } from "./LoginScreen";
import logo from "@/assets/logo.png";

interface MainLayoutProps {
  userRole: UserRole;
  onLogout: () => void;
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

export function MainLayout({ userRole, onLogout }: MainLayoutProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(mockDocuments[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Ruya" className="w-8 h-8" />
            <div>
              <h2 className="font-semibold text-sm">Ruya DMS</h2>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start nav-item">
              <FolderOpen className="w-4 h-4 mr-3" />
              All Documents
            </Button>
            <Button variant="ghost" className="w-full justify-start nav-item">
              <Users className="w-4 h-4 mr-3" />
              Shared with Me
            </Button>
            {userRole !== "employee" && (
              <Button variant="ghost" className="w-full justify-start nav-item">
                <Shield className="w-4 h-4 mr-3" />
                Pending Approvals
                <Badge className="ml-auto bg-accent text-accent-foreground">3</Badge>
              </Button>
            )}
            <Button variant="ghost" className="w-full justify-start nav-item">
              <Activity className="w-4 h-4 mr-3" />
              Recent Activity
            </Button>
          </div>

          <Separator />

          {/* Folder Tree */}
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
              Departments
            </div>
            <Button variant="ghost" className="w-full justify-start nav-item pl-6">
              <ChevronRight className="w-3 h-3 mr-2" />
              <Building className="w-4 h-4 mr-2" />
              Finance
            </Button>
            <Button variant="ghost" className="w-full justify-start nav-item pl-6">
              <ChevronRight className="w-3 h-3 mr-2" />
              <Building className="w-4 h-4 mr-2" />
              Human Resources
            </Button>
            <Button variant="ghost" className="w-full justify-start nav-item pl-6">
              <ChevronRight className="w-3 h-3 mr-2" />
              <Building className="w-4 h-4 mr-2" />
              Engineering
            </Button>
          </div>
        </div>

        {/* User Menu */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {userRole[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Demo User</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents, tags, or content..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {userRole !== "employee" && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                  2
                </Badge>
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Document List */}
          <div className="w-1/2 border-r border-border flex flex-col">
            {/* List Header */}
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Documents</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <SortAsc className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Document Items */}
            <div className="flex-1 overflow-y-auto">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`document-item p-4 border-b border-border cursor-pointer ${
                    selectedDocument?.id === doc.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                  }`}
                  onClick={() => setSelectedDocument(doc)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <FileText className="w-5 h-5 text-primary-light mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{doc.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-muted-foreground">{doc.type}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {getStatusBadge(doc.status)}
                          <span className="text-xs text-muted-foreground">{doc.lastModified}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Preview */}
          {selectedDocument && (
            <div className="flex-1 flex flex-col">
              {/* Preview Header */}
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold truncate">{selectedDocument.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedDocument.owner} • {selectedDocument.lastModified}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link to={`/document/${selectedDocument.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
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
              </div>

              <div className="flex-1 flex">
                {/* Document Content */}
                <div className="flex-1 p-6 bg-muted/20">
                  <div className="bg-card rounded-lg shadow-sm border border-border h-full flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Document preview would appear here</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {selectedDocument.type} • {selectedDocument.size}
                      </p>
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
                          {getStatusBadge(selectedDocument.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Size</span>
                          <span>{selectedDocument.size}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Type</span>
                          <span>{selectedDocument.type}</span>
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
                          <span>{selectedDocument.owner}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Department</span>
                          <span>{selectedDocument.department}</span>
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
                        {selectedDocument.tags.map(tag => (
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
          )}
        </div>
      </div>
    </div>
  );
}