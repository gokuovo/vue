import defaultSettings from '@/settings'

const title = defaultSettings.title || 'SALT SOUND STUDIO'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
