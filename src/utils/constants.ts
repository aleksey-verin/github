// import i18n from './i18n/i18n';

export const searchUserSortingOptions = {
  bestMatch: {
    value: 'bestMatch',
    name: 'Best match'
  },
  reposDesc: {
    value: 'reposDesc',
    name: 'Most repositories'
  },
  reposAsc: {
    value: 'reposAsc',
    name: 'Fewest repositories'
  },
  followersDesc: {
    value: 'followersDesc',
    name: 'Most followers'
  },
  followersAsc: {
    value: 'followersAsc',
    name: 'Fewest followers'
  },
  joinedDesc: {
    value: 'joinedDesc',
    name: 'Most recently joined'
  },
  joinedAsc: {
    value: 'joinedAsc',
    name: 'Least recently joined'
  }
};

export const languageOptions = {
  ru: {
    value: 'ru',
    name: 'Русский'
  },
  en: {
    value: 'en',
    name: 'English'
  }
};

// export function getOptionNameForLocalization(name: string): string {
//   return i18n.t(name);
// }
