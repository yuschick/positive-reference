export declare enum RequestTimestamp {
    fresh = "fresh",
    stale = "stale"
}
export declare type RequestTimestampPayload = Record<RequestTimestamp, number>;
