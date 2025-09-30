import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Shield, User, Crown, Chrome } from "lucide-react";
import logo from "@/assets/logo.png";

export type UserRole = "admin" | "manager" | "employee";

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export function LoginScreen({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("employee");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  const roleIcons = {
    admin: Crown,
    manager: Shield,
    employee: User,
  };

  const roleDescriptions = {
    admin: "Full system access with complete metadata, activity logs, and version control",
    manager: "Metadata access with versioning capabilities and approval workflows",
    employee: "Document access with acknowledgment capabilities and basic metadata",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <img src={logo} alt="Ruya" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-primary mb-2">Ruya</h1>
          <p className="text-muted-foreground">Document Management System</p>
        </div>

        <Card className="glass-panel shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold">Sign In</CardTitle>
            <p className="text-sm text-muted-foreground">Choose your access level and credentials</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label htmlFor="role" className="text-sm font-medium">Access Level</Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleIcons).map(([role, Icon]) => (
                    <SelectItem key={role} value={role} className="flex items-center">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span className="capitalize">{role}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {roleDescriptions[selectedRole]}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
              >
                Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* SSO Options */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <div className="w-4 h-4 mr-2 bg-primary rounded-sm flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-bold">M</span>
                </div>
                Microsoft
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>Enterprise document management with role-based access control</p>
        </div>
      </div>
    </div>
  );
}