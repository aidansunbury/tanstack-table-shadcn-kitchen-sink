import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ColumnPinningPosition } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Pin, PinOff } from "lucide-react";
import type React from "react";
import { Button } from "../ui/button";
import { ToolTipAction } from "./ToolTipAction";

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
            {/* Left Pin */}
            {isPinned !== "left" ? (
                <ToolTipAction onClick={pinLeft} tooltipContent="Pin To Left">
                    <ChevronLeft />
                    <Pin />
                </ToolTipAction>
            ) : null}
            {isPinned ? (
                <ToolTipAction onClick={unPin} tooltipContent="Unpin">
                    <PinOff size={12} />
                </ToolTipAction>
            ) : null}
            {isPinned !== "right" ? (
                <ToolTipAction onClick={pinRight} tooltipContent="Pin To Right">
                    <Pin />
                    <ChevronRight />
                </ToolTipAction>
            ) : null}
        </div>
    );
};

export default TablePins;
