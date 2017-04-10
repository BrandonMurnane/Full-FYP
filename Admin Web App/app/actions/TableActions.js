export const SELECT_ROW_TO_SHOW_DETAILS = 'SELECT_ROW_TO_SHOW_DETAILS'
export const selectRowToShowDetails = (selectedRowId) => {
  return {
    type: SELECT_ROW_TO_SHOW_DETAILS,
    selectedRowId
  }
}

export const RESET_ROW = 'RESET_ROW';
export const resetRow = () => {
  return {
    type: RESET_ROW,
  }
}