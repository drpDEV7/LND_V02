
export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[]; // Array para Frente e Verso
    sizes: string[];
    description: string;
    stock: number; // Nova propriedade de estoque
    isNew?: boolean;
    measurements?: {
        size: string;
        waist: string;
        hips: string;
        length: string;
    }[];
    _source?: 'supabase' | 'local';
}

export const PRODUCTS: Product[] = [
    // --- CALÇAS (PEDIDO ESPECÍFICO) ---
    {
        id: 'calca-baggy-cargo-azul-escuro',
        name: 'Calça Baggy Masculina Cargo Azul Escuro',
        category: 'calcas',
        price: 289.90,
        stock: 50,
        images: [
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/public/calca1/FRENTE.png",
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/public/calca1/TRAS.png"
        ],
        sizes: ['38', '40', '42', '44', '46'],
        description: "Modelagem Baggy Cargo com bolsos laterais utilitários. Confeccionada em sarja de alta gramatura na cor Azul Escuro. Costuras reforçadas e caimento amplo para máximo conforto e estilo streetwear.",
        isNew: true,
        _source: 'local',
        measurements: [
            { size: '38', waist: '38-40cm', hips: '54cm', length: '106cm' },
            { size: '40', waist: '40-42cm', hips: '56cm', length: '107cm' },
            { size: '42', waist: '42-44cm', hips: '58cm', length: '108cm' },
            { size: '44', waist: '44-46cm', hips: '60cm', length: '109cm' },
            { size: '46', waist: '46-48cm', hips: '62cm', length: '110cm' },
        ]
    },
    {
        id: 'calca-baggy-grafite',
        name: 'Calça Baggy Masculina Grafite',
        category: 'calcas',
        price: 279.90,
        stock: 30,
        images: [
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/sign/Calca%20Baggy%20Masculina%20Grafite/FRENTE.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNDdlMTMzOS05YmYxLTRlNGYtYjQ2OC1iNGNlMDcxYmE0NWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDYWxjYSBCYWdneSBNYXNjdWxpbmEgR3JhZml0ZS9GUkVOVEUucG5nIiwiaWF0IjoxNzYzOTkzMDMwLCJleHAiOjE3OTU1MjkwMzB9.cWtJiwbm-J0Grhg5t63mD1kSsGRn2-m5HhlWhuV22Dg",
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/sign/Calca%20Baggy%20Masculina%20Grafite/TRAS.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNDdlMTMzOS05YmYxLTRlNGYtYjQ2OC1iNGNlMDcxYmE0NWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDYWxjYSBCYWdneSBNYXNjdWxpbmEgR3JhZml0ZS9UUkFTLnBuZyIsImlhdCI6MTc2Mzk5MzA0NiwiZXhwIjoxNzk1NTI5MDQ2fQ.bTQVStA_3HSnmHTM-JY0zNlZxvcVFg1ASMchrI_oc34"
        ],
        sizes: ['38', '40', '42', '44', '46'],
        description: "Baggy fit na cor Grafite estonada. Processo de lavagem industrial para toque macio e visual vintage autêntico.",
        _source: 'local',
        measurements: [
            { size: '38', waist: '38-40cm', hips: '54cm', length: '106cm' },
            { size: '40', waist: '40-42cm', hips: '56cm', length: '107cm' },
            { size: '42', waist: '42-44cm', hips: '58cm', length: '108cm' },
        ]
    },
    {
        id: 'calca-baggy-jeans-azul-claro',
        name: 'Calça Baggy Masculina Jeans Azul Claro',
        category: 'calcas',
        price: 299.90,
        stock: 45,
        images: [
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/public/Calca%20Baggy%20Masculina%20Jeans%20Azul%20Claro/FRENTE.png",
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/public/Calca%20Baggy%20Masculina%20Jeans%20Azul%20Claro/TRAS.png"
        ],
        sizes: ['38', '40', '42', '44', '46'],
        description: "O clássico Jeans Azul Claro em modelagem Baggy. Tecido 100% algodão premium. A peça essencial para compor qualquer outfit street.",
        isNew: true,
        _source: 'local',
        measurements: [
            { size: '38', waist: '38-40cm', hips: '54cm', length: '106cm' },
            { size: '40', waist: '40-42cm', hips: '56cm', length: '107cm' },
            { size: '42', waist: '42-44cm', hips: '58cm', length: '108cm' },
        ]
    },
    {
        id: 'calca-baggy-jeans-azul-escuro',
        name: 'Calça Baggy Masculina Jeans Azul Escuro',
        category: 'calcas',
        price: 299.90,
        stock: 20,
        images: [
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/sign/Calca%20Baggy%20Masculina%20Jeans%20Azul%20Escuro/FRENTE.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNDdlMTMzOS05YmYxLTRlNGYtYjQ2OC1iNGNlMDcxYmE0NWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDYWxjYSBCYWdneSBNYXNjdWxpbmEgSmVhbnMgQXp1bCBFc2N1cm8vRlJFTlRFLnBuZyIsImlhdCI6MTc2Mzk5NTA0OCwiZXhwIjoxNzk1NTMxMDQ4fQ.ocLEOD03nS07rrrd-g1rSMOPysPf14PNNkyjrEYbtYI",
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/sign/Calca%20Baggy%20Masculina%20Jeans%20Azul%20Escuro/TRAS.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNDdlMTMzOS05YmYxLTRlNGYtYjQ2OC1iNGNlMDcxYmE0NWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDYWxjYSBCYWdneSBNYXNjdWxpbmEgSmVhbnMgQXp1bCBFc2N1cm8vVFJBUy5wbmciLCJpYXQiOjE3NjM5OTUwODMsImV4cCI6MTc5NTUzMTA4M30.H2PWFVdFLrPzAez-MzeHGwTAB_JB_zn6HO4BI3BmzTA"
        ],
        sizes: ['38', '40', '42', '44', '46'],
        description: "Jeans Raw (Azul Escuro) sem lavagem agressiva. Mantém a rigidez original do denim com o conforto da modelagem larga.",
        _source: 'local',
        measurements: [
            { size: '38', waist: '38-40cm', hips: '54cm', length: '106cm' },
            { size: '40', waist: '40-42cm', hips: '56cm', length: '107cm' },
        ]
    },
    {
        id: 'calca-jeans-reta-breakout',
        name: 'CALÇA JEANS RETA - BREAKOUT',
        category: 'calcas',
        price: 319.90,
        stock: 10,
        images: [
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/sign/CALcA%20JEANS%20RETA%20-%20BREAKOUT/FRENTE.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNDdlMTMzOS05YmYxLTRlNGYtYjQ2OC1iNGNlMDcxYmE0NWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDQUxjQSBKRUFOUyBSRVRBIC0gQlJFQUtPVVQvRlJFTlRFLnBuZyIsImlhdCI6MTc2Mzk5NTIzNywiZXhwIjoxNzk1NTMxMjM3fQ._H9Q7n4e_-6lgJsaB3etc0vKxp4ugqP77G9C_JjCG38",
            "https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/sign/CALcA%20JEANS%20RETA%20-%20BREAKOUT/TRAS.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iNDdlMTMzOS05YmYxLTRlNGYtYjQ2OC1iNGNlMDcxYmE0NWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDQUxjQSBKRUFOUyBSRVRBIC0gQlJFQUtPVVQvVFJBUy5wbmciLCJpYXQiOjE3NjM5OTUyNDQsImV4cCI6MTc5NTUzMTI0NH0.iJ6E97SLqRnwiCBFXfm5C59Uv2-Z-lZ663s02nzaYqo"
        ],
        sizes: ['38', '40', '42', '44'],
        description: "Modelagem Reta (Straight Leg). Edição limitada BREAKOUT com detalhes em costura contrastante e etiqueta emborrachada no bolso traseiro.",
        isNew: true,
        _source: 'local',
        measurements: [
            { size: '38', waist: '38cm', hips: '50cm', length: '104cm' },
            { size: '40', waist: '40cm', hips: '52cm', length: '105cm' },
            { size: '42', waist: '42cm', hips: '54cm', length: '106cm' },
        ]
    },

    // --- OUTRAS CATEGORIAS (MOCK GENÉRICO) ---
    {
        id: 'c1', name: "T-Shirt Oversized Heavyweight Black", category: 'camisetas', price: 149.90, stock: 100,
        images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800"], sizes: ['P', 'M', 'G', 'GG'], description: "Algodão 300gsm.", _source: 'local'
    },
    {
        id: 't1', name: "Retro High OG", category: 'tenis', price: 899.90, stock: 5,
        images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800"], sizes: ['39', '40', '41', '42'], description: "Sneaker clássico.", _source: 'local'
    },
    {
        id: 'b1', name: "Cap Structured Black", category: 'bones', price: 119.90, stock: 0, // Exemplo sem estoque
        images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800"], sizes: ['U'], description: "Boné estruturado.", _source: 'local'
    }
];
