import { describe, expect, it } from 'vitest';
import { getPaginationArray, getSearchParamsFormSelect, getShortString } from './helpers';
import { searchUserSortingOptions } from './constants';

describe('fn getShortString', () => {
  it('Длина строки больше amount', () => {
    expect(getShortString('123456789012345678901234567890', 20)).toEqual('12345678901234567890..');
  });
  it('Длина строки меньше amount', () => {
    expect(getShortString('1234567890', 20)).toEqual('1234567890');
  });
  it('пустая строка', () => {
    expect(getShortString('', 20)).toEqual(undefined);
  });
  it('Длина строки больше на 1 amount', () => {
    expect(getShortString('123456789012345678901', 20)).toEqual('12345678901234567890..');
  });
});

describe('fn getPaginationArray', () => {
  it('Всего 20 страниц, текущая 10, отображаем 9 элементов', () => {
    expect(getPaginationArray(20, 10, 9)).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14]);
  });
  it('Всего 1 страница, текущая 1, отображаем 9 элементов', () => {
    expect(getPaginationArray(1, 1, 9)).toEqual([1]);
  });
  it('Всего 8 страниц, текущая 4, отображаем 9 элементов', () => {
    expect(getPaginationArray(8, 4, 9)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
  it('Всего 20 страниц, текущая 20, отображаем 9 элементов', () => {
    expect(getPaginationArray(20, 20, 9)).toEqual([12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });
  it('Ошибочные данные! Всего 20 страниц, текущая 21, отображаем 9 элементов', () => {
    expect(getPaginationArray(20, 21, 9)).toEqual([12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });
  it('Ошибочные данные! Всего 10 страниц, текущая 0, отображаем 9 элементов', () => {
    expect(getPaginationArray(10, 0, 9)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

describe('fn getSearchParamsFormSelect', () => {
  it('Выбрано "Лучшее совпадение', () => {
    expect(getSearchParamsFormSelect('bestMatch')).toEqual({ sort: null, order: null });
  });
  it('Выбрано "Кол-во репозиториев по возрастанию', () => {
    expect(getSearchParamsFormSelect('reposDesc')).toEqual({ sort: 'repositories', order: 'desc' });
  });
  it('Ошибочные данные! Пустое значение', () => {
    expect(getSearchParamsFormSelect('' as keyof typeof searchUserSortingOptions)).toEqual({
      sort: null,
      order: null
    });
  });
  it('Ошибочные данные! Другое неправильное значение', () => {
    expect(getSearchParamsFormSelect('test' as keyof typeof searchUserSortingOptions)).toEqual({
      sort: null,
      order: null
    });
  });
});
