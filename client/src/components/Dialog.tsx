import { Dialog, DialogProps } from "@mui/material";

const DialogCustom: React.FC<DialogProps> = ({ open, children, onClose }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      {children}
    </Dialog>
  );
};

export default DialogCustom;
