export type ThemeType = 'light' | 'dark';

export type ThemeContextValueType = {
  theme: ThemeType;
  toggleTheme: () => void;
};
