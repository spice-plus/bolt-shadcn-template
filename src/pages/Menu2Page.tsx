import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageTitle } from "@/components/layout/PageTitle";

export default function Menu2Page() {
  return (
    <div className="p-6 space-y-4">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "メニュー2" },
        ]}
      />
      <PageTitle title="メニュー2" />
      <p className="text-muted-foreground">メニュー2 のコンテンツです。</p>
    </div>
  );
}
