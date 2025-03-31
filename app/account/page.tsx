import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteAccountButton from "./_components/delete-account-button";
import UpdatePasswordForm from "./_components/update-password-form";

const AccountPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) redirect("/login");

  let decodedToken: DecodedIdToken | null = null;

  try {
    decodedToken = await auth.verifyIdToken(token);
  } catch (error) {
    redirect("/login");
  }

  const user = await auth.getUser(decodedToken.uid);
  const isPasswordProvider = user.providerData.find(
    (provider) => provider.providerId === "password"
  );

  return (
    <div className="max-w-screen-sm mx-auto">
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Email</Label>
          <div>{decodedToken.email}</div>
          {!!isPasswordProvider && <UpdatePasswordForm />}
        </CardContent>
        {!decodedToken.admin && (
          <CardFooter className="flex flex-col items-start">
            <h2 className="text-red-500 text-2xl font-bold">Danger Zone</h2>
            <DeleteAccountButton />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AccountPage;
