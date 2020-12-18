export enum RequestTimestamp {
  fresh = 'fresh',
  stale = 'stale',
}

export type RequestTimestampPayload = Record<RequestTimestamp, number>;
