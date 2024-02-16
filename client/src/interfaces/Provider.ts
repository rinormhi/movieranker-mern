export interface Provider {
    flatrate: Props[];
    buy: Props[];
    rent: Props[];
}

interface Props {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}