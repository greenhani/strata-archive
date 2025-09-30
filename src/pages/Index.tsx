import { useState } from "react";
import { LoginScreen, UserRole } from "@/components/LoginScreen";
import { MainLayout } from "@/components/MainLayout";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserRole | null>(null);

  const handleLogin = (role: UserRole) => {
    setCurrentUser(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <MainLayout userRole={currentUser} onLogout={handleLogout} />;
};

export default Index;
