export const getLangNameByLocale = (localeVal: string | undefined) => {
  switch (localeVal) {
    case 'ru': {
      return 'Russian';
    }

    default: {
      return 'English';
    }
  }
};
