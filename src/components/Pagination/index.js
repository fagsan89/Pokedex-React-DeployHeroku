import React from 'react'

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div className="btn">
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previus</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}
