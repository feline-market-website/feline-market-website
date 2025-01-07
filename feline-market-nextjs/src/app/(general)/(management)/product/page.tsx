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

export default async function Product() {
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
        <CreateProductDialog/>
      </CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
}
