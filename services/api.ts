
import { supabase } from '../supabaseClient';
import { PRODUCTS, Product } from '../data/products';

// Função auxiliar para normalizar dados do Supabase
const normalizeProduct = (data: any): Product => {
    return {
        ...data,
        // Garante que images seja sempre um array, mesmo que venha null do banco
        images: data.images || [],
        // Garante que sizes seja sempre um array
        sizes: data.sizes || [],
        // Garante stock numérico
        stock: data.stock ?? 0,
        // Garante que measurements seja parseado corretamente se vier como string ou mantido se for json
        measurements: typeof data.measurements === 'string' 
            ? JSON.parse(data.measurements) 
            : (data.measurements || undefined),
        _source: 'supabase' // Marca como vindo do Supabase
    };
};

// Função para buscar produtos por categoria
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        console.log(`Buscando categoria '${category}' no Supabase...`);
        
        // Tenta buscar do Supabase
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category);

        // Se houver erro ou não retornar dados, usa o local (fallback)
        if (error) {
            console.error('Erro Supabase (getProductsByCategory):', error.message);
            // Fallback silencioso para dados locais
            return PRODUCTS.filter(p => p.category === category);
        }

        if (!data || data.length === 0) {
             console.log('Nenhum dado encontrado no Supabase para esta categoria. Usando Local.');
             return PRODUCTS.filter(p => p.category === category);
        }

        return data.map(normalizeProduct);
    } catch (e) {
        console.error('Erro de conexão (Exceção):', e);
        return PRODUCTS.filter(p => p.category === category);
    }
};

// Função para buscar produto por ID
export const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Erro Supabase (getProductById):', error.message);
            return PRODUCTS.find(p => p.id === id);
        }

        if (!data) {
            return PRODUCTS.find(p => p.id === id);
        }

        return normalizeProduct(data);
    } catch (e) {
        console.error('Erro crítico ao buscar produto:', e);
        return PRODUCTS.find(p => p.id === id);
    }
};
