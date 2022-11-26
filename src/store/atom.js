import { atom, selectorFamily } from 'recoil'
import { urlSyncEffect } from 'recoil-sync'
import { object, or, string, number, nullable } from '@recoiljs/refine'

import { getRandomString } from '../utils/String'

export const selectedIdAtom = atom({
  key: 'selectedIdAtom',
  default: {},
  effects: [
    urlSyncEffect({
      refine: object(
        nullable({
          [or(string(), number())]: or(string(), number()),
        }),
      ),
    }),
  ],
})

export const selectedPackIdByIdSelector = selectorFamily({
  key: 'selectedPackIdByIdSelector',
  get:
    (priceModelId) =>
    ({ get }) =>
      get(selectedIdAtom)[priceModelId],
  set:
    (priceModelId) =>
    ({ get, set }, newValue) => {
      const randomKey = getRandomString()
      const selectedPackIdAtom = get(selectedIdAtom)

      //if (newValue && selectedPackIdAtom?.[priceModelId] !== newValue) {
      set(selectedIdAtom, {
        ...selectedPackIdAtom,
        [priceModelId]: newValue,
      })
      // } else {
      //   const { [priceModelId]: removedProperty, ...newAtom } = selectedPackIdAtom || {}

      //   set(selectedIdAtom, {
      //     ...newAtom,
      //   })
      // }
    },
})
