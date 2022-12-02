import type { ModalProps } from '@micro-lc/bk-react-components'

import type { BkModal } from './bk-modal'

export type LocalizedText = string | Record<string, string>

export const DEFAULT_LANGUAGE = 'en'

export function getLocalizedText(
  localizedText: LocalizedText,
  lang: string = navigator.language || DEFAULT_LANGUAGE
): string {
  if (typeof localizedText === 'string') {
    return localizedText
  }

  if (localizedText[lang]) {
    return localizedText[lang]
  }

  const availableKeys = Object.keys(localizedText)
  if (availableKeys.includes(lang.substring(0, 2))) {
    return localizedText[lang.substring(0, 2)]
  }

  return localizedText.toString()
}

export function getNavigatorLanguage(): string {
  return navigator.language.substring(0, 2)
}

function localize(localized: LocalizedText | undefined): string {
  if (localized) {
    return getLocalizedText(localized, getNavigatorLanguage())
  }

  return ''
}

export function createProps(this: BkModal): ModalProps {
  return {
    getContainer: this.rootElementSelector ?? (() => {
      // ant somehow modifies the most external div adding a style class
      // and after that ReactDOM wouldn't recognize it as its own root
      return this.container.firstElementChild as HTMLDivElement
    }),
    height: this.height,
    onCancel: () => {
      this.visible = false
      this.oncancel?.call(this)
    },
    open: this._visible,
    subTitle: this.subTitle && localize(this.subTitle),
    title: localize(this.modalTitle),
    titleIcon: this.titleIcon,
    width: this.width,
    zIndex: this.zIndex,
  }
}
