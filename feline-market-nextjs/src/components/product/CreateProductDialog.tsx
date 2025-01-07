import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";
import CreateProductForm from "./CreateProductForm";

export const CreateProductDialog = async () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button size="icon">
            <CirclePlus />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your product</DialogTitle>
          <DialogDescription>
            Please type your product information
          </DialogDescription>
        </DialogHeader>
        <CreateProductForm/>
      </DialogContent>
    </Dialog>
  );
};
