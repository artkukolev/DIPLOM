import React from "react";
import clsx from "clsx";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: "default" | "striped" | "bordered";
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <table
      ref={ref}
      className={clsx(
        "w-full text-sm",
        variant === "striped" &&
          "[&_tbody_tr:nth-child(odd)]:bg-lavender-50 dark:[&_tbody_tr:nth-child(odd)]:bg-gray-800",
        variant === "bordered" &&
          "border border-lavender-200 dark:border-gray-700",
        className,
      )}
      {...props}
    />
  ),
);
Table.displayName = "Table";

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={clsx(
      "bg-lavender-100 dark:bg-gray-800 border-b border-lavender-200 dark:border-gray-700",
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={clsx(
      "divide-y divide-lavender-200 dark:divide-gray-700",
      className,
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hover = true, ...props }, ref) => (
    <tr
      ref={ref}
      className={clsx(
        hover &&
          "hover:bg-lavender-50 dark:hover:bg-gray-700/50 transition-colors",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

export interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = "left", ...props }, ref) => (
    <td
      ref={ref}
      className={clsx(
        "px-4 py-3 text-gray-900 dark:text-gray-100",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

export interface TableHeadCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export const TableHeadCell = React.forwardRef<
  HTMLTableCellElement,
  TableHeadCellProps
>(({ className, align = "left", ...props }, ref) => (
  <th
    ref={ref}
    className={clsx(
      "px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-left font-sans",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className,
    )}
    {...props}
  />
));
TableHeadCell.displayName = "TableHeadCell";
