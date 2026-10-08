import { useEffect } from 'react'

const SITE = 'Operating Systems · A/L ICT'

/** Names the browser tab after the page, so tabs, bookmarks and history
 *  read "Paging and address translation", not the same title 40 times. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} · Free interactive course`
  }, [title])
}
