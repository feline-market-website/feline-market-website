import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import VendorCreateForm from "@/components/vendor/VendorCreateForm";
import { createVendorRequest } from "@/actions/vendor/createVendorRequestAction";
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
  const hasVendor = response.ok
  const vendor = await response.json();

  return (
    <div>
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
            {!hasVendor ? (
              <div>
                <VendorCreateForm callBack={createVendorRequest} userId={user.id}/>
              </div>
            ) : (
              <div>{vendor.name}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
