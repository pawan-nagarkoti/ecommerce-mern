import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import useUI from "../contexts/UIContext";
import { Button } from "@/components/ui/button";

export default function DialogContainer({ children }) {
  const { isDiloagModalOpen, setIsDiloagModalOpen } = useUI();

  return (
    <>
      <Dialog open={isDiloagModalOpen} onOpenChange={setIsDiloagModalOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
