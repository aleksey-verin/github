import { LanguagesObject, RepositorySearchCommonItem } from '../store/types/repoType';
import { UsersSearchParamsOrder, UsersSearchParamsSort } from '../store/types/usersType';
import { searchUserSortingOptions } from './constants';

export function getViewedLanguages(obj: LanguagesObject): string {
  const total = Object.values(obj).reduce((sum, value) => sum + value, 0);

  const percentages = Object.entries(obj).map(([key, value]) => {
    const percentage = ((value / total) * 100).toFixed(2);
    return `${key}: ${percentage}%`;
  });

  return percentages.join(', ');
}

export function getNumberOfPages(total: number, per_page: number): number {
  return Math.ceil(total / per_page);
}

export function getPaginationArray(numberOfPages: number, currentPage: number): Array<number> {
  const maxAmount = 9;
  const halfOfMaxAmount = Math.floor(maxAmount / 2);
  const listOfNumbers = [];

  if (numberOfPages <= maxAmount) {
    for (let i = 1; i <= numberOfPages; i++) {
      listOfNumbers.push(i);
    }
  }
  if (numberOfPages > maxAmount) {
    if (currentPage <= halfOfMaxAmount) {
      for (let i = 1; i <= maxAmount; i++) {
        listOfNumbers.push(i);
      }
    } else if (currentPage > numberOfPages - halfOfMaxAmount) {
      for (let i = numberOfPages - maxAmount + 1; i <= numberOfPages; i++) {
        listOfNumbers.push(i);
      }
    } else {
      for (let i = currentPage - halfOfMaxAmount; i <= currentPage + halfOfMaxAmount; i++) {
        listOfNumbers.push(i);
      }
    }
  }
  return listOfNumbers;
}

export function getShortString(name: string, amount: number): string | undefined {
  if (!name) return;
  return name.length >= amount ? `${name.slice(0, 20)}..` : name;
}

export function getViewedResultsRepos(
  repos: RepositorySearchCommonItem[],
  current_page: number,
  per_page: number,
  global_count_for_request: number,
  max_pagination_items: number
): RepositorySearchCommonItem[] {
  const lengthRepos = repos.length;
  const currentPageByOrder = current_page - (global_count_for_request - 1) * max_pagination_items;
  if (lengthRepos <= per_page) return repos;
  const start = per_page * (currentPageByOrder - 1); // 6 * (2 -1) = 6
  const viewedResults = repos.slice(start, start + per_page);
  return viewedResults;
}

export function getPaginationForGraph(
  max_pagination_items: number,
  globalCountRequest: number,
  numberOfPages: number
): Array<number> {
  const listOfNumbers = [];

  const start = (globalCountRequest - 1) * max_pagination_items + 1;
  const end =
    numberOfPages > max_pagination_items * globalCountRequest
      ? start + max_pagination_items - 1
      : numberOfPages;
  for (let i = start; i <= end; i++) {
    listOfNumbers.push(i);
  }

  return listOfNumbers;
}

export function getSearchParamsFormSelect(value: keyof typeof searchUserSortingOptions): {
  sort: UsersSearchParamsSort;
  order: UsersSearchParamsOrder;
} {
  switch (value) {
    case searchUserSortingOptions.bestMatch.value:
      return { sort: null, order: null };
    case searchUserSortingOptions.reposDesc.value:
      return { sort: 'repositories', order: 'desc' };
    case searchUserSortingOptions.reposAsc.value:
      return { sort: 'repositories', order: 'asc' };
    case searchUserSortingOptions.followersDesc.value:
      return { sort: 'followers', order: 'desc' };
    case searchUserSortingOptions.followersAsc.value:
      return { sort: 'followers', order: 'asc' };
    case searchUserSortingOptions.joinedDesc.value:
      return { sort: 'joined', order: 'desc' };
    case searchUserSortingOptions.joinedAsc.value:
      return { sort: 'joined', order: 'asc' };
    default:
      return { sort: null, order: null };
  }
}
