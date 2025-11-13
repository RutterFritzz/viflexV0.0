import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

const FlashHandler = () => {
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string };
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                duration: 1500,
            });
        }

        if (flash?.error) {
            toast.error(flash.error, {
                duration: 2000,
            });
        }
    }, [flash]);

    return null;
};

export default FlashHandler;
