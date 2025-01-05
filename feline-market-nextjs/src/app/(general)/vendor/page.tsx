import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UserSideNav } from "@/components/user-side-nav/UserSideNav";
import VendorCreateForm from "@/components/vendor/VendorCreateForm";
import getMe from "@/actions/auth/getMeAction";
import { redirect } from "next/navigation";

const getVendorByUserId = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/vendors/${userId}/user-id`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  return response;
};

export default async function Vendor() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  const response = await getVendorByUserId(user.id);

  return (
    <div className="flex flex-col h-screen sm:flex-row">
      <div className="basis-1/4">
        <UserSideNav user={user}/>
      </div>
      <div className="basis-3/4 justify-center">
        <div className="mb-8 mx-auto">
          <p className="font-bold text-3xl">My vendor</p>
          <p className="text-xl">Manage your vendor here</p>
        </div>
        <div>
          <Card className="mx-auto">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">
                Create your vendor 🏪
              </CardTitle>
              <CardDescription className="text-xl">
                Start owning your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!response.ok ? (
                <div>
                  <VendorCreateForm />
                </div>
              ) : (
                <div>Have vendor</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
