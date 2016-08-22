'use strict';

declare function fbq(action: string, event: string, details: any): void;
declare function ga(action: string, event: string, eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: number): void;

export function track(event: string, details?: any) {
    fbq('track', event, details);
    ga('send', 'event', 'purchase', event);
};
