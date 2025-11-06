import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-primary/5">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold gradient-text">404</h1>
          <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        </div>
        <p className="text-foreground/70 max-w-md">
          The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-primary to-secondary">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
