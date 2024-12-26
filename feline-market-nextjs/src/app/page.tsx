import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center sm:flex-row md:flex-row">
      <div className="flex flex-col flex-1 gap-7 ml-10">
        <div className="text-5xl font-bold">
          Your Gateway to Unique Shopping Experiences!
        </div>
        <div className="text-xl text-gray-500">
          Feline Market is the platform where vendors and customers come
          together effortlessly. With user-friendly tools and secure
          transactions, we make it simple to showcase, discover, and shop for
          products in a growing community.
        </div>
        <div className="flex flex-col gap-5 my-2 sm:flex-row">
          <Button className="font-bold" size={"lg"}>
            <Link href="/home">Home</Link>
          </Button>
          <Button className="font-bold" size={"lg"} variant="ghost">
            <Link
              href="https://github.com/feline-market-website/feline-market-website"
              className="flex gap-2"
            >
              <Github />
              View on Github
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-1">
        <Image
          src="/shop.png"
          alt="alt"
          width={550}
          height={550}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
