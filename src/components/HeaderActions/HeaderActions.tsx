import {
    ChevronLeft,
    ChevronRight,
    Pin,
    PinOff,
    ChevronDown,
    ChevronUp,
    ChevronsUpDown,
    Eye,
    Ellipsis,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    const isSelect = column.id === "select";

    const pinLeft = () => pin("left");
    const unPin = () => pin(false);
    const pinRight = () => pin("right");

    const getSortingIcon = (sorting: false | "asc" | "desc") => {
        if (sorting === "asc") return <ChevronUp />;
        if (sorting === "desc") return <ChevronDown />;
        return <ChevronsUpDown />;
    };

    const renderActions = (isDropdown: boolean) => {
        return (
            <>
                {/* Left Pin */}
                {isPinned !== "left" ? (
                    <ToolTipAction
                        onClick={pinLeft}
                        tooltipContent="Pin To Left"
                        isDropdown={isDropdown}
                    >
                        <ChevronLeft />
                        <Pin />
                    </ToolTipAction>
                ) : null}
                {isPinned ? (
                    <ToolTipAction
                        onClick={unPin}
                        tooltipContent="Unpin"
                        isDropdown={isDropdown}
                    >
                        <PinOff size={12} />
                    </ToolTipAction>
                ) : null}
                {isPinned !== "right" ? (
                    <ToolTipAction
                        onClick={pinRight}
                        tooltipContent="Pin To Right"
                        isDropdown={isDropdown}
                    >
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
                    visible={!isSelect}
                    isDropdown={isDropdown}
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
                    visible={!isSelect}
                    isDropdown={isDropdown}
                >
                    <ChevronRight />
                </ToolTipAction>
                <ToolTipAction
                    onClick={column.getToggleSortingHandler()}
                    tooltipContent="Toggle Sorting"
                    visible={!isSelect}
                    isDropdown={isDropdown}
                >
                    {getSortingIcon(column.getIsSorted())}
                </ToolTipAction>

                <ToolTipAction
                    onClick={() => column.toggleVisibility()}
                    tooltipContent="Hide Column"
                    visible={!isSelect}
                    isDropdown={isDropdown}
                >
                    <Eye />
                </ToolTipAction>
            </>
        );
    };

    if (column.getSize() < 200) {
        return (
            <div className="border">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {renderActions(true)}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }

    return (
        <div className="flex gap-1 justify-center flex-wrap">
            {renderActions(false)}
        </div>
    );
};
