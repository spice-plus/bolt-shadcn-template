/**
 * デザイントークン - カラー定義
 *
 * ブランドカラーを変更する場合は brand の hex 値を編集してください。
 * CSS 変数への反映は src/tokens/theme.ts が自動で行います。
 */

// ブランドカラー（light / base / dark の3段階）
export const brand = {
  primary:   { light: '#8892D1', base: '#2E3A97', dark: '#1B2266' },
  secondary: { light: '#94A3B8', base: '#475569', dark: '#1E293B' },
  tertiary:  { light: '#34D399', base: '#059669', dark: '#064E3B' },
}

// セマンティックカラー（状態を表す）
export const semantic = {
  destructive: { light: '#FCA5A5', base: '#EF4444', dark: '#B91C1C' },
  success:     { light: '#6EE7B7', base: '#10B981', dark: '#065F46' },
  warning:     { light: '#FCD34D', base: '#F59E0B', dark: '#92400E' },
  info:        { light: '#93C5FD', base: '#3B82F6', dark: '#1E40AF' },
}

// ニュートラルカラー
export const neutral = {
  white:   '#FFFFFF',
  black:   '#000000',
  gray50:  '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
}

// 型定義
export type BrandColor = typeof brand
export type SemanticColor = typeof semantic
export type NeutralColor = typeof neutral
