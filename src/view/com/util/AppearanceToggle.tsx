import React from 'react'
import {observer} from 'mobx-react-lite'
import {StyleSheet, View, ViewStyle, StyleProp} from 'react-native'

import {useStores} from 'state/index'
import {useAnalytics} from 'lib/analytics'
import {usePalette} from 'lib/hooks/usePalette'
import {Text} from './text/Text'
import {ButtonGroup} from './ButtonGroup'

export const AppearanceToggle = observer(function AppearanceToggle({
  style,
}: {
  style?: StyleProp<ViewStyle>
}) {
  const store = useStores()
  const {track} = useAnalytics()
  const pal = usePalette('default')

  const toggle = React.useCallback(
    value => {
      store.shell.setAppearanceMode(value)
      track('Appearance:Updated', {mode: value})
    },
    [store?.shell, track],
  )

  const getAccessibilityFields = (value: string) => ({
    accessibilityHint: `Sets UI appearance to ${value} mode`,
    accessibilityLabel: `Toggle appearance to ${value} mode`,
  })

  return (
    <View style={style}>
      <Text style={[pal.textLight, styles.title]}>Appearance</Text>
      <ButtonGroup
        selected={store.shell.appearanceMode}
        onChange={toggle}
        items={[
          {
            ...getAccessibilityFields('auto'),
            label: 'Auto',
            value: 'auto',
          },
          {
            ...getAccessibilityFields('dark'),
            label: 'Dark',
            value: 'dark',
          },
          {
            ...getAccessibilityFields('light'),
            label: 'Light',
            value: 'light',
          },
        ]}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  title: {
    marginBottom: 6,
    paddingLeft: 4,
  },
})
