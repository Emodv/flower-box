"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetchNextPage?: () => void;
  fetchPreviousPage?: () => void;
  hasNextPage?: boolean;
  pageIndex: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  pageIndex
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 4,
      },
    },
  });
  const pathname = usePathname();
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                onClick={() => {
                  if (pathname === "/dashboard/all-products") {
                    const allCells = row.getAllCells();
                    const rowData = allCells.reduce((acc: any, cell) => {
                      acc[cell.column.id] = cell.getValue();
                      return acc;
                    }, {});
                    router.push(`/dashboard/all-products/${rowData.id}`);
                  }
                }}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <Button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </Button> */}
      <Button
        onClick={fetchPreviousPage}
        // disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </Button>
      <Button
        onClick={()=>{
          fetchNextPage()
          table.nextPage()
        }}
        disabled={!hasNextPage}
      >
        {">"}
      </Button>
      {/* <Button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </Button> */}
    </div>
  );
}
