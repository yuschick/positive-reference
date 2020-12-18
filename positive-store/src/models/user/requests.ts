export enum RequestType {}

export type RequestTypeToError = Partial<
  Record<RequestType, { error: Error; status: number } | undefined>
>;
export type RequestTypeToBool = Partial<Record<RequestType, boolean>>;
