import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import VendorCreateForm from "@/components/vendor/VendorCreateForm";
import { VendorType } from "@/utils/type";
import VendorUpdateForm from "@/components/vendor/VendorUpdateForm";
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
  const responseJson = await response.json();
  const vendor: VendorType = responseJson.data

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
              {!hasVendor ? ("Create your vendor 🏪"):(`${vendor.name}`)}
            </CardTitle>
            <CardDescription className="text-xl">
              {!hasVendor ? ("Start owning your store"):(`${vendor.description}`)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!hasVendor ? (
              <div>
                <VendorCreateForm callBack={createVendorRequest} userId={user.id}/>
              </div>
            ) : (
              <div><VendorUpdateForm callBack={createVendorRequest} userId={user.id} vendorData={vendor}/></div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
