import NavBar from "@/components/header-footer/navbar/NavBar";
import getMe from "@/actions/auth/getMeAction";

export default async function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe()
  return (
    <section>
      <NavBar user={user} />
      {children}
    </section>
  );
}
