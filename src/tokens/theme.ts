/**
 * テーマ定義
 *
 * colors.ts の hex 値を CSS 変数にマッピングします。
 * src/main.tsx から injectTheme() を呼ぶことで :root に CSS 変数がセットされます。
 */

import { brand, neutral, semantic } from './colors'

export const theme = {
  light: {
    '--background':               neutral.white,
    '--foreground':               neutral.gray900,
    '--card':                     neutral.white,
    '--card-foreground':          neutral.gray900,
    '--popover':                  neutral.white,
    '--popover-foreground':       neutral.gray900,
    '--primary':                  brand.primary.base,
    '--primary-foreground':       neutral.white,
    '--secondary':                neutral.gray50,
    '--secondary-foreground':     neutral.gray900,
    '--muted':                    neutral.gray50,
    '--muted-foreground':         neutral.gray500,
    '--accent':                   neutral.gray100,
    '--accent-foreground':        neutral.gray900,
    '--destructive':              semantic.destructive.base,
    '--destructive-foreground':   neutral.white,
    '--border':                   neutral.gray200,
    '--input':                    neutral.gray200,
    '--ring':                     brand.primary.base,
    '--radius':                   '0.5rem',
    '--chart-1':                  brand.primary.base,
    '--chart-2':                  brand.tertiary.base,
    '--chart-3':                  semantic.info.base,
    '--chart-4':                  semantic.warning.base,
    '--chart-5':                  semantic.destructive.base,
  },
  dark: {
    '--background':               neutral.gray900,
    '--foreground':               '#FAFAFA',
    '--card':                     neutral.gray900,
    '--card-foreground':          '#FAFAFA',
    '--popover':                  neutral.gray900,
    '--popover-foreground':       '#FAFAFA',
    '--primary':                  '#FAFAFA',
    '--primary-foreground':       neutral.gray900,
    '--secondary':                neutral.gray800,
    '--secondary-foreground':     '#FAFAFA',
    '--muted':                    neutral.gray800,
    '--muted-foreground':         neutral.gray400,
    '--accent':                   neutral.gray800,
    '--accent-foreground':        '#FAFAFA',
    '--destructive':              semantic.destructive.dark,
    '--destructive-foreground':   '#FAFAFA',
    '--border':                   neutral.gray800,
    '--input':                    neutral.gray800,
    '--ring':                     neutral.gray400,
    '--radius':                   '0.5rem',
    '--chart-1':                  brand.primary.light,
    '--chart-2':                  brand.tertiary.light,
    '--chart-3':                  semantic.info.light,
    '--chart-4':                  semantic.warning.light,
    '--chart-5':                  semantic.destructive.light,
  },
}

export function injectTheme(isDark = false): void {
  const vars = isDark ? theme.dark : theme.light
  const root = document.documentElement
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value)
  }
  root.classList.toggle('dark', isDark)
}
