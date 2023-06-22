const light = {
  primary: '#F47A0B',
  secondary: '#171919',
  background: '#F5F5F7',
  surface: '#FFFFFF',
  error: '#B00020',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#000000',
  onSurface: '#000000',
  onError: '#FFFFFF',
};

const dark = {
  primary: '#FBE800',
  secondary: '#171919',
  background: '#1B1F28',
  surface: '#FFFFFC',
  error: '#B00020',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
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
  return themes.dark;
}

export { getTheme };