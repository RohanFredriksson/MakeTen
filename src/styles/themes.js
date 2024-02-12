const dark = {
  primary: '#FBE800',
  background: '#1B1F28',
  surface: '#FFFFFC',
  title: '#FFFFFF',
  header: '#FFFFFF',
  paragraph: '#717576',
  black: '#000000',
  white: '#FFFFFF',
}

const themes = {
  dark: dark,
}

const getTheme = ({theme}) => {
  if (theme in themes) {return themes[theme];}
  return themes.dark;
}

export { getTheme };