import { faker } from "@faker-js/faker";
import type { AccessorColumnDef } from "@tanstack/react-table";

// Represents the data type of entries in the table
type TDataType = string;

// Represents an individual column in the table
type Header = {
    id: string; // The column header
    accessorKey: string; // The key to access the data
};

// A record that contains all the accessor keys and their corresponding data

//* Could look like this:
// type Person = {
//     firstName: string;
//     lastName: string;
//     age: number;
//     visits: number;
//     status: string;
//     progress: number;
// };

type Row = Record<string, TDataType>;

const range = (len: number) => {
    const arr: number[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

// Make items number of columns
export function makeHeaderData(items: number): AccessorColumnDef<Header>[] {
    return range(items).map((i) => ({
        id: `header-${i}`,
        accessorKey: `col-${i}`,
        cell: (info) => info.getValue(),
    }));
}

export function makeColumnData(rows: number, headers: Header[]): Row[] {
    const columns: Record<string, string>[] = [];

    for (let i = 0; i < rows; i++) {
        const row: Record<string, string> = {};
        headers.forEach((header, j) => {
            row[header.accessorKey] = faker.lorem.word() + i;
        });
        columns.push(row);
    }
    return columns;
}
