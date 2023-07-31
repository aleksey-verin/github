import { describe, expect, it } from 'vitest';
import { getSearchUsersUrl } from './api-helpers';
import { UsersSearchParams } from '../store/types/usersType';

describe('fn getSearchUsersUrl', () => {
  const url = 'https://test.com/search';
  it('Выбран sort: null, order: null', () => {
    const query = 'query';
    const params: UsersSearchParams = {
      per_page: 12,
      page: 1,
      sort: null,
      order: null
    };
    const result = getSearchUsersUrl(url, query, params) as URL;
    expect(result.toString()).toEqual('https://test.com/search?q=query&page=1&per_page=12');
  });
  it('Выбран sort: repositories, order: desc', () => {
    const query = 'query';
    const params: UsersSearchParams = {
      per_page: 12,
      page: 1,
      sort: 'repositories',
      order: 'desc'
    };
    const result = getSearchUsersUrl(url, query, params) as URL;
    expect(result.toString()).toEqual(
      'https://test.com/search?q=query&page=1&per_page=12&sort=repositories&order=desc'
    );
  });
  it('Ошибка! query не передан, выбран sort: repositories, order: desc', () => {
    const query = '';
    const params: UsersSearchParams = {
      per_page: 12,
      page: 1,
      sort: 'repositories',
      order: 'desc'
    };
    const result = getSearchUsersUrl(url, query, params) as URL;
    expect(result).toEqual(undefined);
  });
});
