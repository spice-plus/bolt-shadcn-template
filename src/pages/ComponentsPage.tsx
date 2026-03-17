import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageTitle } from "@/components/layout/PageTitle";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import { FormField } from "@/components/shared/FormField";
import { DataTable, type DataTableColumn } from "@/components/shared/DataTable";
import { LoadingSpinner, TableSkeleton } from "@/components/shared/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { ActionMenu } from "@/components/shared/ActionMenu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ComponentsPage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmResult, setConfirmResult] = useState<string | null>(null);
  const [deleteResult, setDeleteResult] = useState<string | null>(null);

  type User = { id: number; name: string; role: string; status: "active" | "inactive" };
  const users: User[] = [
    { id: 1, name: "山田 太郎", role: "管理者", status: "active" },
    { id: 2, name: "鈴木 花子", role: "編集者", status: "active" },
    { id: 3, name: "田中 一郎", role: "閲覧者", status: "inactive" },
  ];
  const userColumns: DataTableColumn<User>[] = [
    { key: "id", header: "ID", align: "center" },
    { key: "name", header: "名前" },
    { key: "role", header: "役割" },
    {
      key: "status",
      header: "ステータス",
      align: "center",
      render: (row) => (
        <Badge variant={row.status === "active" ? "default" : "secondary"}>
          {row.status === "active" ? "有効" : "無効"}
        </Badge>
      ),
    },
  ];

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailBlur = () => {
    if (email && !email.includes("@")) {
      setEmailError("有効なメールアドレスを入力してください");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "コンポーネント" },
        ]}
      />
      <PageTitle title="shared/ コンポーネント" />

      {/* ConfirmDialog */}
      <Card>
        <CardHeader>
          <CardTitle>ConfirmDialog</CardTitle>
          <CardDescription>
            汎用の確認ダイアログ。title / description / confirmLabel をカスタマイズ可能。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={() => setConfirmOpen(true)}>ダイアログを開く</Button>
          {confirmResult && (
            <p className="text-muted-foreground">結果: {confirmResult}</p>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="変更を保存しますか？"
        description="この操作により設定が更新されます。"
        confirmLabel="保存する"
        onConfirm={() => setConfirmResult("保存しました")}
      />

      {/* DeleteConfirmDialog */}
      <Card>
        <CardHeader>
          <CardTitle>DeleteConfirmDialog</CardTitle>
          <CardDescription>
            削除専用ダイアログ。destructive スタイル固定。itemName で対象を指定。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            削除ダイアログを開く
          </Button>
          {deleteResult && (
            <p className="text-muted-foreground">結果: {deleteResult}</p>
          )}
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName="ユーザーデータ"
        onConfirm={() => setDeleteResult("削除しました")}
      />

      {/* DataTable */}
      <Card>
        <CardHeader>
          <CardTitle>DataTable</CardTitle>
          <CardDescription>
            columns と data を渡すだけで使えるテーブル。render でセルをカスタマイズ可能。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={userColumns}
            data={users}
            keyField="id"
          />
          <DataTable
            columns={userColumns}
            data={[]}
            keyField="id"
            emptyMessage="ユーザーが登録されていません"
            emptyDescription="右上のボタンから新しいユーザーを追加してください"
            emptyAction={{ label: "ユーザーを追加", onClick: () => {} }}
          />
        </CardContent>
      </Card>

      {/* LoadingSpinner / TableSkeleton */}
      <Card>
        <CardHeader>
          <CardTitle>LoadingSpinner / TableSkeleton</CardTitle>
          <CardDescription>
            ローディング中に使うスピナーとテーブル用スケルトン。size で大きさを変更可能。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
          </div>
          <TableSkeleton rows={3} cols={4} />
        </CardContent>
      </Card>

      {/* EmptyState */}
      <Card>
        <CardHeader>
          <CardTitle>EmptyState</CardTitle>
          <CardDescription>
            データが空のときのプレースホルダー。action を渡すと CTA ボタンを表示。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <EmptyState
            title="データが見つかりません"
            description="条件を変えて再検索してください"
            action={{ label: "新規追加", onClick: () => {} }}
          />
          <EmptyState title="通知はありません" />
        </CardContent>
      </Card>

      {/* ActionMenu */}
      <Card>
        <CardHeader>
          <CardTitle>ActionMenu</CardTitle>
          <CardDescription>
            縦三点リーダー（⋮）のドロップダウンメニュー。DataTable の行アクションに埋め込んで使う。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">行アクション例:</span>
            <ActionMenu
              items={[
                { label: "編集", icon: <Pencil className="h-4 w-4" />, onClick: () => {} },
                { label: "削除", icon: <Trash2 className="h-4 w-4" />, onClick: () => {}, variant: "destructive" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* FormField */}
      <Card>
        <CardHeader>
          <CardTitle>FormField</CardTitle>
          <CardDescription>
            Label + フィールド + エラー表示のラッパー。children に Input / Select / Checkbox / Textarea を渡す。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Input */}
          <FormField label="ユーザー名" id="username">
            <Input id="username" placeholder="例: yamada_taro" />
          </FormField>

          {/* Input with validation */}
          <FormField label="メールアドレス" id="email" error={emailError}>
            <Input
              id="email"
              type="email"
              placeholder="例: yamada@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />
          </FormField>

          {/* Input with error */}
          <FormField label="パスワード（エラーあり例）" id="password-error" error="8文字以上で入力してください">
            <Input id="password-error" type="password" defaultValue="abc" />
          </FormField>

          {/* Select */}
          <FormField label="役割" id="role">
            <Select>
              <SelectTrigger id="role">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">管理者</SelectItem>
                <SelectItem value="editor">編集者</SelectItem>
                <SelectItem value="viewer">閲覧者</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {/* Select with error */}
          <FormField label="部署" id="dept" error="部署を選択してください">
            <Select>
              <SelectTrigger id="dept">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eng">エンジニアリング</SelectItem>
                <SelectItem value="design">デザイン</SelectItem>
                <SelectItem value="biz">ビジネス</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {/* Textarea */}
          <FormField label="備考（複数行）" id="note">
            <Textarea id="note" placeholder="自由記述..." rows={3} />
          </FormField>

          {/* Checkbox（horizontal） */}
          <FormField label="利用規約に同意する" id="agree" layout="horizontal">
            <Checkbox id="agree" />
          </FormField>

          {/* Checkbox with error（horizontal） */}
          <FormField label="メールマガジンを受け取る" id="newsletter" layout="horizontal" error="このチェックは必須です">
            <Checkbox id="newsletter" />
          </FormField>

        </CardContent>
      </Card>
    </div>
  );
}
