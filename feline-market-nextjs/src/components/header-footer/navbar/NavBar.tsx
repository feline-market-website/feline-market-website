import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ThemeModes } from "./ThemeModes";

const NavBar = () => {
  const session: boolean = true;

  return (
    <div className="flex flex-col justify-between border-b-2 min-w-full px-16 py-2 sm:flex-row">
      <div className="text-2xl font-bold">Feline Market</div>
      <div className="flex flex-col text-m gap-4 sm:flex-row items-center">
        <Link href="#">Home</Link>
        <Link href="#">Vendors</Link>
        <Link href="#">About</Link>
        <Link href="#">Contact</Link>
        <Input placeholder="..Search" type="text" />
      </div>
      <div className="flex flex-col gap-4 my-auto sm:flex-row">
        {session ? (
          <div className="flex flex-col gap-4 sm:flex-row items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <ShoppingCart/>
          </div>
        ) : (
          <div className="flex flex-col gap-1 sm:flex-row">
            <Button variant={"ghost"}>
              <p className="font-bold">Register</p>
            </Button>
            <Button variant={"default"}>
              <p className="font-bold">Login</p>
            </Button>
          </div>
        )}
        <ThemeModes />
      </div>
    </div>
  );
};

export default NavBar;
