
export interface Product {
    id: string | number;
    name: string;
    price: number;
    category: string;
    images: string[]; // Array para Frente e Verso
    sizes: string[];
    description: string;
    stock: number;
    isNew?: boolean;
    measurements?: {
        size: string;
        waist: string;
        hips: string;
        length: string;
    }[];
    _source?: 'supabase' | 'local';
}

export interface CategoryConfig {
    id: string;
    title: string;
    image: string;
    subLinks: { label: string; href: string }[];
}
