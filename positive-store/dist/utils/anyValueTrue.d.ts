export declare const anyValueTrue: <T extends Partial<Record<string, boolean>>>(obj: T) => boolean;
export declare const anyLoadingValueTrue: <T extends Partial<Record<string, boolean>>>(obj: T) => boolean;
export declare const anyErrorValueTrue: <T extends Partial<Record<string, {
    error: Error;
    status: number;
} | undefined>>>(obj: T) => boolean;
