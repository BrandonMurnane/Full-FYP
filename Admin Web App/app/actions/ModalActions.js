export const OPEN_MODAL = 'OPEN_MODAL';
export function handleOpen(name) {
  return {
    type: OPEN_MODAL,
    name
  }
}

export const CLOSE_MODAL = 'CLOSE_MODAL';
export function handleClose(name) {
  return {
    type: CLOSE_MODAL,
    name
  }
}