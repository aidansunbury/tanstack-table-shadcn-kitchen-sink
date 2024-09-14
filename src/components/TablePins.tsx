import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ColumnPinningPosition } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Pin, PinOff } from "lucide-react";
import type React from "react";
import { Button } from "./ui/button";

type Props = {
    isPinned: ColumnPinningPosition;
    pin: (position: ColumnPinningPosition) => void;
};

export const TablePins: React.FC<Props> = ({ isPinned, pin }) => {
    const pinLeft = () => pin("left");
    const unPin = () => pin(false);
    const pinRight = () => pin("right");

    return (
        <div className="flex gap-1 justify-center">
            {isPinned !== "left" ? (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            onClick={pinLeft}
                            size={"doubleSmallIcon"}
                            variant={"ghost"}
                        >
                            <ChevronLeft />
                            <Pin />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Pin To Left</p>
                    </TooltipContent>
                </Tooltip>
            ) : null}
            {isPinned ? (
                <Button
                    onClick={unPin}
                    size={"doubleSmallIcon"}
                    variant={"ghost"}
                >
                    <PinOff size={16} />
                </Button>
            ) : null}
            {isPinned !== "right" ? (
                <Button
                    onClick={pinRight}
                    size={"doubleSmallIcon"}
                    variant={"ghost"}
                >
                    <Pin />
                    <ChevronRight />
                </Button>
            ) : null}
        </div>
    );
};

export default TablePins;
