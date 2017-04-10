import SyntheticEvent from 'react-dom/lib/SyntheticEvent';
import _ from 'lodash';

export const LOAD = '@@form/LOAD';
export function handleLoad(form, fields, buttons, data) {
  const action = {
    type: LOAD,
    form,
    fields,
    buttons,
    data
  };
  return action;
}

export const CLICK = '@@form/CLICK';
export function onClick(form, name) {
  const action = {
    type: CLICK,
    form,
    name
  };

  return action;
}

/**
 * Form element change actions are handled by a single action handler
 * that attempts to parse the event and create an unified action.
 * @type {Object} Synthetic React Event or constructed object
 */
export const CHANGE = '@@form/CHANGE';
export function onChange(form, name, valueOrEvent) {
  const action = {
    type: CHANGE,
    form,
    name
  };

  if (valueOrEvent instanceof SyntheticEvent) {
    valueOrEvent.persist();
    const { target, currentTarget } = valueOrEvent;

    if (_.isBoolean(target.selected)) {
      action.selected = target.selected;
    } else if (_.isBoolean(target.currentTarget)) {
      action.selected = target.currentTarget;
    }

    if (_.isBoolean(target.checked)) {
      action.checked = target.checked;
    } else if (_.isBoolean(target.currentTarget)) {
      action.checked = target.currentTarget;
    }

    const value = target.value || currentTarget.value || undefined;

    // cast strings to booleans/value or use value
    // cast string into empty value
    if (value === 'true') {
      action.value = true;
    } else if (value === 'false') {
      action.value = false;
    } else if (value === 'null') {
      action.value = null;
    } else if (value === undefined) {
      // empty forms return undefined instead of an empty string when empty
      action.value = '';
    } else {
      action.value = value;
    }
  } else {
    action.value = valueOrEvent;
  }

  return action;
}

export const FOCUS = '@@form/FOCUS';
export function onFocus(form, name) {
  const action = {
    type: FOCUS,
    form,
    name
  };

  return action;
}

export const BLUR = '@@form/BLUR';
export function onBlur(form, name) {
  const action = {
    type: BLUR,
    form,
    name
  };

  return action;
}

export const SHOW_ERRORS = '@@form/SHOW_ERRORS';
export function showErrors(form, name) {
  const action = {
    type: SHOW_ERRORS,
    form,
    name
  };

  return action;
}

export function showFormErrors(form) {
  const action = {
    type: SHOW_ERRORS,
    form
  };

  return action;
}

export const HIDE_ERRORS = '@@form/HIDE_ERRORS';
export function hideErrors(form, name) {
  const action = {
    type: HIDE_ERRORS,
    form,
    name
  };

  return action;
}

export function hideFormErrors(form) {
  const action = {
    type: HIDE_ERRORS,
    form
  };

  return action;
}

export const CLEAR = '@@form/CLEAR';
export function clear(form, name) {
  const action = {
    type: CLEAR,
    form,
    name
  };

  return action;
}

export const INSERT = '@@form/INSERT';
export function addField(form, path, data, index, fields, buttons) {
  const action = {
    form,
    name: path,
    type: INSERT,
    data,
    index,
    fields,
    buttons
  };

  return action;
}

export const REMOVE = '@@form/REMOVE';
export function removeField(form, path, index) {
  const action = {
    form,
    name: path,
    type: REMOVE,
    index
  };

  return action;
}
