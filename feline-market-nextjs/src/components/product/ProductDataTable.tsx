"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Product } from "@/utils/type";
import { getUserProductByName } from "@/actions/product/getUserProductByNameAction";
import { getUserProductPagination } from "@/actions/product/getUserProductPagination";
import { useToast } from "@/hooks/use-toast";

interface Props {
  initialProducts: {
    data: Product[];
    total: number;
    currentPage: number;
    totalPage: number;
  };
  userId: string;
}

export default function ProductDataTable({ initialProducts, userId }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts.data);
  const [currentPage, setCurrentPage] = useState<number>(
    initialProducts.currentPage
  );
  const [total, setTotal] = useState<number>(initialProducts.total);
  const [totalPage, setTotalPage] = useState<number>(initialProducts.totalPage);
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
      setProducts(initialProducts.data);
    }
  }, [search, userId, initialProducts, toast]);

  const handlePagination = async (page: number) => {
    try {
      const response = await getUserProductPagination(userId, page, 10);
      if (!response.responseData) {
        throw new Error(response.message);
      }
      setProducts(response.responseData.data);
      setTotal(response.responseData.total);
      setCurrentPage(response.responseData.currentPage);
      setTotalPage(response.responseData.totalPage);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred while changing page",
        description: (error as Error).message || "Internal server error",
      });
    }
  };
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
          <TableCaption>Currently page {currentPage} of {totalPage} | {total} products</TableCaption>
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
        <div className="flex justify-center items-center my-4 gap-2">
        <Button
        variant={"secondary"}
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
          Prev
        </Button>
        <Button
        variant={"secondary"}
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          Next
          <ChevronRight />
        </Button>
        </div>
      </CardContent>
    </Card>
  );
}
