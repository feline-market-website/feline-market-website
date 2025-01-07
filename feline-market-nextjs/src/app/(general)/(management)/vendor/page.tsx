import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import VendorCreateForm from "@/components/vendor/VendorCreateForm";
import { VendorType } from "@/utils/type";
import VendorUpdateForm from "@/components/vendor/VendorUpdateForm";
import { createVendorRequest } from "@/actions/vendor/createVendorRequestAction";
import getMe from "@/actions/auth/getMeAction";
import { getVendorByUserId } from "@/actions/vendor/getVendorByUserIdAction";
import { redirect } from "next/navigation";
import { updateVendorRequest } from "@/actions/vendor/updateVendorRequestAction";

export default async function Vendor() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  const response = await getVendorByUserId(user.id);
  const vendor: VendorType | undefined = response.data;

  return (
    <div>
      <div className="mb-8 mx-auto">
        <p className="font-bold text-3xl">My vendor 🏪</p>
        <p className="text-xl">Manage your vendor here</p>
      </div>
      <div>
        <Card className="mx-auto">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div>
                {vendor ? (
                  <Image
                    src={vendor.logo_url}
                    alt="alt"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  ></Image>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <CardTitle className="font-bold text-2xl">
                  {!vendor ? "Create your vendor 🏪" : `${vendor.name}`}
                </CardTitle>
                <CardDescription className="text-xl">
                  {!vendor
                    ? "Start owning your store"
                    : `${vendor.description}`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!vendor ? (
              <div>
                <VendorCreateForm
                  callBack={createVendorRequest}
                  userId={user.id}
                />
              </div>
            ) : (
              <div>
                <VendorUpdateForm
                  callBack={updateVendorRequest}
                  vendorId={vendor.id}
                  vendorData={vendor}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
