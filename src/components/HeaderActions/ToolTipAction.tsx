import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type React from "react";
import { Button } from "@/components/ui/button";

type TooltipActionProps = {
    children: React.ReactNode;
    tooltipContent: string;
    onClick: () => void;
};

export const ToolTipAction: React.FC<TooltipActionProps> = ({
    children,
    tooltipContent,
    onClick,
}) => {
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
