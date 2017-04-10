import { createSelector } from 'reselect';
// Memoized selectors
// Used as fields, so only pass value

export const requestsSelector = (state) => state.requests;

export const categorySelector = createSelector(
  requestsSelector,
  (requests) => {
    return (requests.categories && requests.categories.value) ? requests.categories.value.map((o) => o.key) : [];
  }
);

export const BoothSelector = createSelector(
  categorySelector,
  (categories) => {
    const fields = {
      'categoryKeys': categories
    };
    return fields;
  }
);

export const EventSelector = createSelector(
  categorySelector,
  (categories) => {
    const fields = {
      'categoryKeys': categories
    };
    return fields;
  }
);

