export const ORDER_INFO_OPEN: 'ORDER_INFO_OPEN' = 'ORDER_INFO_OPEN'
export const ORDER_INFO_CLOSE: 'ORDER_INFO_OPEN' = 'ORDER_INFO_OPEN'

export type TOrderInfoAction =
    | {
          type: typeof ORDER_INFO_OPEN
      }
    | {
          type: typeof ORDER_INFO_CLOSE
      }
