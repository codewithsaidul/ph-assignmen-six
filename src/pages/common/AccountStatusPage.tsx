import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Ban, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router";




export default function AccountStatusPage() {
  // রাউট থেকে স্টেট পাওয়ার জন্য
  const location = useLocation();
  type StatusType = 'blocked' | 'suspended';
  const { status, message } = (location.state as { status: StatusType; message: string }) || { 
    status: 'blocked', 
    message: 'Your account has been blocked.' 
  };

  const statusInfo: Record<StatusType, {
    icon: React.ReactElement;
    title: string;
    description: string;
    nextStep: string;
  }> = {
    blocked: {
      icon: <Ban className="w-16 h-16 text-destructive" />,
      title: "Account Blocked",
      description: "Your account has been blocked due to a violation of our terms of service.",
      nextStep: "If you believe this is a mistake, please contact our support team.",
    },
    suspended: {
      icon: <AlertTriangle className="w-16 h-16 text-yellow-500" />,
      title: "Account Suspended",
      description: "Your driver account has been temporarily suspended.",
      nextStep: "Please check your email for more details or contact support to resolve the issue.",
    }
    // pending: {
    //   icon: <AlertTriangle className="w-16 h-16 text-yellow-500" />,
    //   title: "Application Pending",
    //   description: "Your driver application is still under review. We will notify you once it's approved.",
    //   nextStep: "Thank you for your patience.",
    // },
  };

  const currentStatusInfo = statusInfo[status] || statusInfo.blocked;

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {currentStatusInfo.icon}
          </div>
          <CardTitle className="text-2xl font-bold">{currentStatusInfo.title}</CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm">{currentStatusInfo.nextStep}</p>
          </div>
          <Button asChild className="mt-6 w-full">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}