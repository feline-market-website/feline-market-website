import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BaggageClaim,
  PackageSearch,
  PencilLine,
  ReceiptText,
  Store,
  UserRoundPen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { User } from "@/utils/type";

interface Props {
  user: User;
}

export const UserSideNav: React.FC<Props> = async ({ user }) => {
  return (
    <Card className="h-auto md:h-4/5">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Menu</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex justify-center items-center gap-4">
          <Avatar>
            <AvatarImage
              src={
                user.user_profile.avatar_url || "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl font-bold">{user.username}</p>
            <p className="flex text-m items-center">
              <PencilLine size={17.5} />
              Edit your profile
            </p>
          </div>
        </div>

        <Separator />

        <Link href={`/profile/${user.id}`}>
          <Button className="w-full" variant={"default"}>
            <UserRoundPen />
            My Account
          </Button>
        </Link>

        <Link href={"/vendor"}>
          <Button className="w-full" variant={"outline"}>
            <Store />
            My Vendor
          </Button>
        </Link>

        <Button className="w-full" variant={"outline"}>
          <PackageSearch />
          My Product
        </Button>

        <Button className="w-full" variant={"outline"}>
          <BaggageClaim />
          My Cart
        </Button>

        <Button className="w-full" variant={"outline"}>
          <ReceiptText />
          My Purchase
        </Button>

      </CardContent>
    </Card>
  );
};
