import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-right",
    icon: <CheckCircle />,
  });
};

export const showError = (message: string) => {
    toast.error(message, {
        position: "bottom-right", 
        icon: <XCircle/>
    })
}
