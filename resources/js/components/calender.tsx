import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { useState } from "react"
import { formatDate } from "@/helpers/format-date"
import { cn } from "@/lib/utils"

interface Calendar22Props {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    className?: string;
    disabled?: boolean;
}

export function Calendar22({ date, setDate, className, disabled = false }: Calendar22Props) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        disabled={disabled}
                        className={cn("w-48 justify-between font-normal not-dark:bg-white", className)}
                    >
                        {date ? formatDate(date) : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        disabled={disabled}
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
