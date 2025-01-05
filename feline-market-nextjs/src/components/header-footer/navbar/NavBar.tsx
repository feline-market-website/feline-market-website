import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ThemeModes } from "./ThemeModes";
import { User } from "@/utils/type";
import { logout } from "@/actions/auth/logoutAction";

interface Props {
  user: User | null;
}

const NavBar = ({ user }: Props) => {
  return (
    <div className="flex flex-col justify-between border-b-2 px-36 py-3 sm:flex-row items-center">
      <div className="text-2xl font-bold items-center">Feline Market</div>
      <div className="flex flex-col text-m gap-4 sm:flex-row items-center">
        <Link href="/home">Home</Link>
        <Link href="/vendor">Vendors</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Input placeholder="..Search" type="text" />
      </div>
      <div className="flex flex-col gap-4 my-auto sm:flex-row items-center">
        {user ? (
          <div className="flex flex-col gap-4 sm:flex-row items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={ user.user_profile.avatar_url || "https://github.com/shadcn.png"} />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/profile/${user.id}`}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Vendor</DropdownMenuItem>
                <DropdownMenuItem disabled>Admin</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 font-bold"
                  onClick={logout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ShoppingCart />
          </div>
        ) : (
          <div className="flex flex-col gap-1 sm:flex-row items-center">
            <Link href="/register">
              <Button variant={"ghost"}>
                <p className="font-bold">Register</p>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant={"default"}>
                <p className="font-bold">Login</p>
              </Button>
            </Link>
          </div>
        )}
        <ThemeModes />
      </div>
    </div>
  );
};

export default NavBar;
