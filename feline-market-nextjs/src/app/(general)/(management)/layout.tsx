import { UserSideNav } from "@/components/user-side-nav/UserSideNav";
import getMe from "@/actions/auth/getMeAction";
import { redirect } from "next/navigation";

export default async function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe()
  if (!user) {
    redirect('/login')
  }
  return (
    <section>
        <div className="flex flex-col h-screen sm:flex-row gap-20">
      <div className="basis-1/5">
        <UserSideNav user={user}/>
      </div>
      <div className="basis-4/5 justify-center">
        {children}
      </div>
    </div>
    </section>
  );
}
