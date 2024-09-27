import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type TooltipActionProps = {
    children: React.ReactNode;
    tooltipContent: string;
    isDropdown?: boolean;
    visible?: boolean;
    onClick: () => void;
};

export const ToolTipAction: React.FC<TooltipActionProps> = ({
    children,
    tooltipContent,
    isDropdown,
    visible = true,
    onClick,
}) => {
    if (!visible) {
        return null;
    }

    if (isDropdown) {
        return (
            <DropdownMenuItem onClick={onClick}>
                {children} <p>{tooltipContent}</p>
            </DropdownMenuItem>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    onClick={onClick}
                    size={"doubleSmallIcon"}
                    variant={"ghost"}
                >
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltipContent}</p>
            </TooltipContent>
        </Tooltip>
    );
};
