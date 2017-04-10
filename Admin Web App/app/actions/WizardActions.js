export const NEXT_PAGE = 'NEXT PAGE'
export const nextPage = (currentPage) => {
  return {
    type: NEXT_PAGE,
    page: currentPage + 1
  }
}

export const PREVIOUS_PAGE = 'PREVIOUS_PAGE'
export const previousPage = (currentPage) => {
  return {
    type: PREVIOUS_PAGE,
    page: Math.max(0, currentPage - 1)
  }
}