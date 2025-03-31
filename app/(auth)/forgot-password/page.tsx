import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "./_components/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address below and we will send you a link to reset
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordPage;
