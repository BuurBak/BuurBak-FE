import { Dialog, DialogContent } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Carousel from "./Carousel";

function DialogComponent({
  trailerImageArray,
  open,
  setOpen,
}: {
  trailerImageArray: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
      <DialogContent className="w-full h-full ">
        {trailerImageArray && (
          <Carousel params={trailerImageArray} mobile={true} />
        )}
        <div className="w-full h-full flex justify-between"></div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogComponent;
