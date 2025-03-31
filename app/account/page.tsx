import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
          {!!isPasswordProvider && <div>Password provider</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage;
