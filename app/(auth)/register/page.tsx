import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./_components/register-form";

const RegisterPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        Already have an account?
        <Link href="/login" className="pl-2 underline">
          Login here
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
