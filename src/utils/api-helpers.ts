import { RepositoryItem, RepositorySearchCommonItem } from '../store/types/repoType';
import { UsersSearchParams } from '../store/types/usersType';

export const _searchURL = 'https://api.github.com/search/users';

export const getSearchUsersUrl = (
  url: string,
  searchValue: string,
  params: UsersSearchParams
): URL | void => {
  const _url = new URL(url);
  if (!searchValue) return;
  _url.searchParams.append('q', searchValue);
  _url.searchParams.append('page', String(params.page));
  _url.searchParams.append('per_page', String(params.per_page));
  if (params.sort && params.order) {
    _url.searchParams.append('sort', String(params.sort));
    _url.searchParams.append('order', String(params.order));
  }
  return _url;
};

export function transformUserReposData(response: RepositoryItem[]): RepositorySearchCommonItem[] {
  const resultsRepos = response.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    owner: {
      login: item.owner.login,
      html_url: item.owner.html_url,
      avatar_url: item.owner.avatar_url
    },
    languageMain: item.language ? item.language : "there's no info",
    languages: item.languages_url,
    pushedAt: item.pushed_at,
    stargazerCount: item.stargazers_count
  }));
  return resultsRepos;
}

export async function getLanguageForRepo(url: string) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
