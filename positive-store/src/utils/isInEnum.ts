export const isInEnum = <Enum extends object>(val: any, e: Enum): val is Enum[keyof Enum] =>
  val in e;
