import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageTitle } from "@/components/layout/PageTitle";

export default function Menu1Page() {
  return (
    <div className="p-6 space-y-4">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "メニュー1" },
        ]}
      />
      <PageTitle title="メニュー1" />
      <p className="text-muted-foreground">メニュー1 のコンテンツです。</p>
    </div>
  );
}
