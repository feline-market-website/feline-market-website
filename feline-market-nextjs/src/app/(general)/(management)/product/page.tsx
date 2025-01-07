import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FolderKanban, Package } from "lucide-react";

import { CreateProductDialog } from "@/components/product/CreateProductDialog";
import ProductDataTable from "@/components/product/ProductDataTable";
import getMe from "@/actions/auth/getMeAction";
import { getUserProducts } from "@/actions/product/getUserProductsAction";
import { redirect } from "next/navigation";

export default async function Product() {
  const user = await getMe();
  if (!user) {
    redirect("/login");
  }
  const products = await getUserProducts(user.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex gap-2 text-bold text-2xl items-center">
            Manage your product
            <Package />
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex gap-2 text-bold text-lg items-center">
            Add, edit, or remove products to keep your catalog updated.
            <FolderKanban />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateProductDialog />
        {!products.data ? (
          <Alert>
            <AlertTitle>No product found</AlertTitle>
            <AlertDescription>
              You must create product at least 1 to use this table
            </AlertDescription>
          </Alert>
        ) : (
          <ProductDataTable initialProducts={products.data} userId={user.id}/>
        )}
      </CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
}
