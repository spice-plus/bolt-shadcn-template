import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataTableColumn<T> = {
  /** データオブジェクトのキー、またはカスタム識別子 */
  key: string;
  /** ヘッダーに表示するラベル */
  header: string;
  /** セルのカスタム描画。省略時は row[key] をそのまま表示 */
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  /** 各行の一意キー（row[keyField] が React key になる） */
  keyField: keyof T;
  /** データが空のときに表示するメッセージ */
  emptyMessage?: string;
};

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function DataTable<T>({
  columns,
  data,
  keyField,
  emptyMessage = "データがありません",
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={alignClass[col.align ?? "left"]}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="text-center text-muted-foreground"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => (
            <TableRow key={String(row[keyField])}>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={alignClass[col.align ?? "left"]}
                >
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
