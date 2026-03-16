// このファイルは shadcn/ui が使用する cn() ユーティリティ専用です。
// プロダクト固有のユーティリティ関数は src/utils/ に追加してください。
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
