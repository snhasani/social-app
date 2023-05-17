import React from 'react'
import {StyleSheet, Pressable, View, StyleProp, ViewStyle} from 'react-native'

import {usePalette} from 'lib/hooks/usePalette'
import {Text} from './text/Text'

type Order = 'first' | 'middle' | 'last'

type ButtonGroupItem<T> = {
  value: T
  label: string
  accessibilityHint: string
  accessibilityLabel: string
}

interface ButtonGroupProps<T> {
  items: ButtonGroupItem<T>[]
  onChange: (v: T) => void
  selected: T
  style?: StyleProp<ViewStyle>
}

export function ButtonGroup<T extends string>({
  items,
  selected,
  onChange,
  style,
}: ButtonGroupProps<T>) {
  return (
    <View style={[style, styles.buttonGroup]}>
      {items.map(
        ({accessibilityHint, accessibilityLabel, label, value}, index) => {
          let order: Order = 'middle'

          switch (index) {
            case 0:
              order = 'first'
              break
            case items.length - 1:
              order = 'last'
              break
            default:
              break
          }

          return (
            <SelectableBtn
              accessibilityLabel={accessibilityLabel}
              accessibilityHint={accessibilityHint}
              isSelected={value === selected}
              label={label}
              key={value}
              onChange={onChange}
              order={order}
              value={value}
            />
          )
        },
      )}
    </View>
  )
}

interface SelectableBtnProps<T> {
  accessibilityHint: string
  accessibilityLabel: string
  isSelected: boolean
  label: string
  onChange: (value: T) => void
  order: Order
  value: T
}

function SelectableBtn<T extends string>({
  accessibilityHint,
  accessibilityLabel,
  isSelected,
  value,
  label,
  order,
  onChange,
}: SelectableBtnProps<T>) {
  const pal = usePalette('default')
  const palPrimary = usePalette('inverted')
  let orderBasedStyles = [styles.selectableBtn, pal.border]

  switch (order) {
    case 'first':
      orderBasedStyles = [...orderBasedStyles, styles.selectableBtnLeft]
      break
    case 'last':
      orderBasedStyles = [...orderBasedStyles, styles.selectableBtnRight]
      break
    default:
      break
  }

  return (
    <Pressable
      style={[
        ...orderBasedStyles,
        pal.border,
        isSelected ? palPrimary.view : pal.view,
      ]}
      onPress={() => onChange(value)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}>
      <Text style={isSelected ? palPrimary.text : pal.text}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
  },
  selectableBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  selectableBtnLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderLeftWidth: 1,
  },
  selectableBtnRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
})
