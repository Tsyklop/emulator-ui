import {combine, createEvent, createStore, sample} from 'effector';
import {modelFactory} from 'effector-factorio';
import {debounce} from 'patronum';

import {TableFilterBarData} from './types';

interface FactoryProps {}

export const factory = modelFactory(() => {

  const reset = createEvent();

  const changed = createEvent<void>();

  const searchChanged = createEvent<string>();

  const searchByChanged = createEvent<string>();

  const statusChanged = createEvent<string>();

  const $status = createStore<string>('ANY');
  const $search = createStore<string>('');
  const $searchBy = createStore<string>('ALL');

  $status.reset(reset);
  $search.reset(reset);
  $searchBy.reset(reset);

  const $data = combine($status, $search, $searchBy, (status, search, searchBy) => {
    return {
      status,
      search,
      searchBy,
    } as TableFilterBarData;
  });

  sample({
    clock: statusChanged,
    target: $status,
  });

  sample({
    clock: searchChanged,
    target: $search,
  });

  sample({
    clock: searchByChanged,
    target: $searchBy,
  });

  debounce({
    source: $data,
    timeout: 400,
    target: changed,
  });

  return {
    $data,
    reset,
    changed,
    statusChanged,
    searchChanged,
    searchByChanged,
  };
});
