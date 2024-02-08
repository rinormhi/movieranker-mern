
export interface Provider {
    flatrate?: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
    },
    buy?: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
    },
    rent?: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
    }
}
