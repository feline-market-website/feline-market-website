"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";
import { Product } from "@/utils/type";
import { getUserProductByName } from "@/actions/product/getUserProductByNameAction";
import { useToast } from "@/hooks/use-toast";

interface Props {
  initialProducts: Product[];
  userId: string;
}

export default function ProductDataTable({ initialProducts, userId }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getUserProductByName(userId, search);

        if (Array.isArray(products.data)) {
          setProducts(products.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred while searching products",
          description: (error as Error).message || "Internal server error",
        });
      }
    };

    if (search.trim() !== "") {
      fetchProducts();
    } else {
      setProducts(initialProducts);
    }
  }, [search, userId, initialProducts, toast]);

  return (
    <Card>
      <CardHeader>
        <Input
          placeholder="Search by product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Create</TableHead>
              <TableHead>Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price} Baht</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  {new Date(product.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(product.updated_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
