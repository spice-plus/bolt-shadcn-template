import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageTitle } from "@/components/layout/PageTitle";
import { brand, semantic, neutral } from "@/tokens/colors";

export default function HomePage() {
  const ColorSwatch = ({
    label,
    color,
  }: {
    label: string;
    color: string;
  }) => (
    <div className="text-center">
      <div
        className="w-full h-12 rounded-md shadow-sm border border-border"
        style={{ backgroundColor: color }}
      />
      <p className="text-xs mt-1 font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">{color}</p>
    </div>
  );

  const ColorGroup = ({
    title,
    colors,
  }: {
    title: string;
    colors: Record<string, string>;
  }) => (
    <div className="mb-6">
      <h4 className="text-sm font-semibold mb-3 text-muted-foreground">{title}</h4>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(colors).map(([key, value]) => (
          <ColorSwatch key={key} label={key} color={value} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <PageTitle title="カラーシステム" />
          <p className="text-muted-foreground mt-2">
            <code className="bg-muted px-2 py-1 rounded font-mono">src/tokens/colors.ts</code>{" "}
            の hex 値を変更するだけでテーマが更新されます
          </p>
        </div>

        {/* ブランドカラー */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ブランドカラー</CardTitle>
            <CardDescription>
              brand.primary.base を変更すると shadcn コンポーネントの primary カラーも変わります
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ColorGroup title="Primary" colors={brand.primary} />
            <ColorGroup title="Secondary" colors={brand.secondary} />
            <ColorGroup title="Tertiary" colors={brand.tertiary} />
          </CardContent>
        </Card>

        {/* セマンティックカラー */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>セマンティックカラー</CardTitle>
            <CardDescription>状態を表すカラー（light / base / dark）</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <ColorGroup title="Destructive" colors={semantic.destructive} />
              <ColorGroup title="Success" colors={semantic.success} />
              <ColorGroup title="Warning" colors={semantic.warning} />
              <ColorGroup title="Info" colors={semantic.info} />
            </div>
          </CardContent>
        </Card>

        {/* ニュートラルカラー */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ニュートラルカラー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {Object.entries(neutral).map(([key, value]) => (
                <ColorSwatch key={key} label={key} color={value} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 実際の使用例 */}
        <Card>
          <CardHeader>
            <CardTitle>使用例</CardTitle>
            <CardDescription>CSS 変数から導出された shadcn コンポーネント</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: brand.primary.base }}
            >
              <p className="font-semibold" style={{ color: neutral.white }}>
                brand.primary.base — CSS 変数 --primary に反映
              </p>
            </div>

            <div
              className="p-4 rounded-lg border-2"
              style={{
                backgroundColor: semantic.success.light,
                borderColor: semantic.success.base,
              }}
            >
              <p className="font-semibold" style={{ color: semantic.success.dark }}>
                semantic.success — 成功メッセージの例
              </p>
            </div>

            <div
              className="p-4 rounded-lg border-2"
              style={{
                backgroundColor: semantic.destructive.light,
                borderColor: semantic.destructive.base,
              }}
            >
              <p className="font-semibold" style={{ color: semantic.destructive.dark }}>
                semantic.destructive — エラーメッセージの例
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
