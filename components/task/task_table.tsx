"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type Row,
  type Header,
  type Cell,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Frame, FrameFooter } from "@/components/ui/frame";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Task } from "@/services/task";
import { TaskStatusBadge } from "./task_status_badge";
import { getUserById, getCurrentUser } from "@/services/hierarchy";
import { AlertCircle } from "lucide-react";

function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return "just now";
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString();
  }
}

const priorityColors: Record<Task["priority"], string> = {
  low: "bg-blue-500/10 text-blue-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  high: "bg-orange-500/10 text-orange-500",
  urgent: "bg-red-500/10 text-red-500",
};

type TaskTableProps = {
  tasks: Task[];
  isLoading?: boolean;
};

export function TaskTable({ tasks, isLoading }: TaskTableProps) {
  const pageSize = 10;
  const currentUser = getCurrentUser();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      desc: true,
      id: "updatedAt",
    },
  ]);

  const columns: ColumnDef<Task>[] = useMemo(() => [
    {
      accessorKey: "title",
      cell: ({ row }: { row: Row<Task> }) => (
        <Link
          href={`/tasks/${row.original.id}`}
          className="font-medium hover:underline"
        >
          {row.getValue("title")}
        </Link>
      ),
      header: "Title",
      size: 250,
    },
    {
      accessorKey: "status",
      cell: ({ row }: { row: Row<Task> }) => {
        const status = row.getValue("status") as Task["status"];
        const needsReview =
          status === "completed" && row.original.assignerId === currentUser.id;
        return (
          <div className="flex items-center gap-2">
            <TaskStatusBadge status={status} />
            {needsReview && (
              <Badge variant="warning" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Review
              </Badge>
            )}
          </div>
        );
      },
      header: "Status",
      size: 150,
    },
    {
      accessorKey: "priority",
      cell: ({ row }: { row: Row<Task> }) => {
        const priority = row.getValue("priority") as Task["priority"];
        return (
          <Badge className={cn("text-xs", priorityColors[priority])}>
            {priority}
          </Badge>
        );
      },
      header: "Priority",
      size: 100,
    },
    {
      accessorKey: "assigneeId",
      cell: ({ row }: { row: Row<Task> }) => {
        const assignee = getUserById(row.original.assigneeId);
        return (
          <div className="text-sm">{assignee ? assignee.name : "Unknown"}</div>
        );
      },
      header: "Assignee",
      size: 150,
    },
    {
      accessorKey: "assignerId",
      cell: ({ row }: { row: Row<Task> }) => {
        const assigner = getUserById(row.original.assignerId);
        return (
          <div className="text-sm text-muted-foreground">
            {assigner ? assigner.name : "Unknown"}
          </div>
        );
      },
      header: "Assigned By",
      size: 150,
    },
    {
      accessorKey: "category",
      cell: ({ row }: { row: Row<Task> }) => (
        <Badge variant="outline" className="text-xs">
          {row.getValue("category")}
        </Badge>
      ),
      header: "Category",
      size: 120,
    },
    {
      accessorKey: "type",
      cell: ({ row }: { row: Row<Task> }) => (
        <span className="text-sm text-muted-foreground capitalize">
          {row.getValue("type")}
        </span>
      ),
      header: "Type",
      size: 100,
    },
    {
      accessorKey: "dueDate",
      cell: ({ row }: { row: Row<Task> }) => {
        const dueDate = row.getValue("dueDate") as string | undefined;
        if (!dueDate) return <span className="text-muted-foreground">-</span>;
        const isOverdue =
          new Date(dueDate) < new Date() &&
          row.original.status !== "completed" &&
          row.original.status !== "reviewed";
        return (
          <span
            className={cn(
              "text-sm",
              isOverdue && "text-destructive font-medium"
            )}
          >
            {new Date(dueDate).toLocaleDateString()}
          </span>
        );
      },
      header: "Due Date",
      size: 120,
    },
    {
      accessorKey: "updatedAt",
      cell: ({ row }: { row: Row<Task> }) => {
        const date = row.getValue("updatedAt") as Date;
        return (
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(date)}
          </span>
        );
      },
      header: "Updated",
      size: 120,
    },
  ], [currentUser.id]);

  const tableOptions = useMemo(() => ({
    columns,
    data: tasks,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  }), [columns, tasks, pagination, sorting]);

  const table = useReactTable(tableOptions);

  if (isLoading) {
    return (
      <Frame className="w-full">
        <Table className="table-fixed">
          <TableHeader>
            {columns.map((col, idx) => (
              <TableHead
                key={idx}
                style={{ width: col.size ? `${col.size}px` : undefined }}
              >
                {typeof col.header === "string" ? col.header : ""}
              </TableHead>
            ))}
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                {columns.map((_, idx) => (
                  <TableCell key={idx}>
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Frame>
    );
  }

  if (tasks.length === 0) {
    return (
      <Frame className="w-full">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: { id: string; headers: Header<Task, unknown>[] }) => (
              <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<Task, unknown>) => {
                  const columnSize = header.column.getSize();
                  return (
                    <TableHead
                      key={header.id}
                      style={
                        columnSize ? { width: `${columnSize}px` } : undefined
                      }
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className="flex h-full cursor-pointer select-none items-center justify-between gap-2"
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                aria-hidden="true"
                                className="size-4 shrink-0 opacity-80"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                aria-hidden="true"
                                className="size-4 shrink-0 opacity-80"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No tasks found.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Frame>
    );
  }

  return (
    <Frame className="w-full">
      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-transparent" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnSize = header.column.getSize();
                return (
                  <TableHead
                    key={header.id}
                    style={
                      columnSize ? { width: `${columnSize}px` } : undefined
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className="flex h-full cursor-pointer select-none items-center justify-between gap-2"
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ChevronUpIcon
                              aria-hidden="true"
                              className="size-4 shrink-0 opacity-80"
                            />
                          ),
                          desc: (
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="size-4 shrink-0 opacity-80"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row: Row<Task>) => {
              const needsReview =
                row.original.status === "completed" &&
                row.original.assignerId === currentUser.id;
              return (
                <TableRow
                  key={row.id}
                  className={cn(
                    "cursor-pointer hover:bg-muted/50",
                    needsReview && "bg-warning/5 border-l-2 border-l-warning"
                  )}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (!target.closest("a")) {
                      window.location.href = `/tasks/${row.original.id}`;
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell: Cell<Task, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No tasks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <FrameFooter className="p-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <p className="text-muted-foreground text-sm">Viewing</p>
            <Select
              onValueChange={(value: string) => {
                table.setPageIndex(Number(value) - 1);
              }}
              value={String(table.getState().pagination.pageIndex + 1)}
            >
              <SelectTrigger
                aria-label="Select result range"
                className="w-fit min-w-none"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: table.getPageCount() }, (_, i) => {
                  const start = i * table.getState().pagination.pageSize + 1;
                  const end = Math.min(
                    (i + 1) * table.getState().pagination.pageSize,
                    table.getRowCount()
                  );
                  const pageNum = i + 1;
                  return (
                    <SelectItem key={pageNum} value={String(pageNum)}>
                      {`${start}-${end}`}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-sm">
              of{" "}
              <strong className="font-medium text-foreground">
                {table.getRowCount()}
              </strong>{" "}
              results
            </p>
          </div>

          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="sm:*:[svg]:hidden"
                  onClick={() => table.previousPage()}
                  style={{ pointerEvents: table.getCanPreviousPage() ? "auto" : "none", opacity: table.getCanPreviousPage() ? 1 : 0.5 }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="sm:*:[svg]:hidden"
                  onClick={() => table.nextPage()}
                  style={{ pointerEvents: table.getCanNextPage() ? "auto" : "none", opacity: table.getCanNextPage() ? 1 : 0.5 }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </FrameFooter>
    </Frame>
  );
}
