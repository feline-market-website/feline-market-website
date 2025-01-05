import { DataTable } from "@/components/admin/users/data-table";
import { columns } from "@/components/admin/users/columns";

export default async function Users() {
  const getUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/users`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Fetch users data error: ${(error as Error).message}`);
      return { success: false, error: (error as Error).message };
    }
  };
  const users = await getUsers();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users.data} />
    </div>
    
  );
}
