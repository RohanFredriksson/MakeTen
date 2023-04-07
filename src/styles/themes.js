const light = {
  primary: '#F47A0B',
  secondary: '#F3CB30',
  background: '#F5F5F7',
  surface: '#FFFFFF',
  error: '#B00020',
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#000000',
  onSurface: '#000000',
  onError: '#FFFFFF',
};

const dark = {
  primary: '#F47A0B',
  secondary: '#F3CB30',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  error: '#B00020',
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#000000',
  onSurface: '#000000',
  onError: '#FFFFFF',
};

const themes = {
  light: light,
  dark: dark,
}

const getTheme = ({theme}) => {
  if (theme in themes) {return themes[theme];}
  return themes.light;
}

export { getTheme };