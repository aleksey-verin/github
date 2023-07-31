export const storage = {
  isAuth: 'search-users-app-isAuth',
  userAuth: 'search-users-app-userAuth',
  searchValue: 'search-users-app-searchValue',
  searchSortingValue: 'search-users-app-searchSortingValue',
  searchUsersResults: 'search-users-app-searchUsersResults',
  settings: 'search-users-app-userSettings'
};

export const storageGetItem = (storageItem: string) => {
  try {
    const response = localStorage.getItem(storageItem);
    if (response) {
      return JSON.parse(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const storageSetItem = (storageItem: string, value: unknown) => {
  try {
    localStorage.setItem(storageItem, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const clearLocalStorageData = (storageData: Record<string, string>) => {
  Object.values(storageData).forEach((value) => {
    localStorage.removeItem(value);
  });
};
