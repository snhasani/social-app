import {useEffect} from 'react'
import {Appearance, NativeEventSubscription} from 'react-native'

import {ShellUiModel} from 'state/models/ui/shell'

export function useAppearanceChangeListener(shellState?: ShellUiModel) {
  useEffect(() => {
    let subscription: NativeEventSubscription | undefined

    if (shellState?.appearanceMode === 'auto') {
      subscription = Appearance.addChangeListener(({colorScheme}) => {
        console.log('Appearance.addChangeListener', colorScheme)
        shellState.setColorScheme(colorScheme)
      })
    }

    return subscription != null
      ? () => (subscription as NativeEventSubscription).remove()
      : undefined
  }, [shellState])
}
