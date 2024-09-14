import {
    ChevronLeft,
    ChevronRight,
    Pin,
    PinOff,
    ChevronDown,
    ChevronUp,
    ChevronsUpDown,
    Eye,
} from "lucide-react";
import type React from "react";
import { ToolTipAction } from "./ToolTipAction";
import type { Column, Table } from "@tanstack/react-table";
import { reorder } from "@/utils/reorder";

type Props = {
    column: Column<any, any>;
    table: Table<any>;
};

export const HeaderActions: React.FC<Props> = ({ column, table }) => {
    const { pin, getIsPinned } = column;
    const isPinned = getIsPinned();

    const pinLeft = () => pin("left");
    const unPin = () => pin(false);
    const pinRight = () => pin("right");

    const getSortingIcon = (sorting: false | "asc" | "desc") => {
        if (sorting === "asc") return <ChevronUp />;
        if (sorting === "desc") return <ChevronDown />;
        return <ChevronsUpDown />;
    };

    return (
        <div className="flex gap-1 justify-center flex-wrap">
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
            <ToolTipAction
                onClick={() =>
                    table.setColumnOrder(
                        reorder(table.getState(), column.id, "left"),
                    )
                }
                tooltipContent="Move Column Right"
            >
                <ChevronLeft />
            </ToolTipAction>
            <ToolTipAction
                onClick={() =>
                    table.setColumnOrder(
                        reorder(table.getState(), column.id, "right"),
                    )
                }
                tooltipContent="Move Column Right"
            >
                <ChevronRight />
            </ToolTipAction>
            <ToolTipAction
                onClick={column.getToggleSortingHandler()}
                tooltipContent="Toggle Sorting"
            >
                {getSortingIcon(column.getIsSorted())}
            </ToolTipAction>
            <ToolTipAction
                onClick={() => column.toggleVisibility()}
                tooltipContent="Hide Column"
            >
                <Eye />
            </ToolTipAction>
        </div>
    );
};
