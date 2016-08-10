'use strict';

declare function fbq(action: string, event: string, details: any): void;

export function track(event: string, details?: any) {
    fbq('track', event, details);
};
