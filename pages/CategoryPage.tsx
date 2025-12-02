
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../services/api';
import { Product } from '../data/products';

export const CategoryPage: React.FC = () => {
    const { type } = useParams<{ type: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Mapeamento de Títulos
    const getCategoryTitle = (type: string | undefined) => {
        if (!type) return 'Produtos';
        const titles: Record<string, string> = {
            'camisetas': 'Camisetas',
            'moletons': 'Moletons',
            'jaquetas': 'Jaquetas',
            'calcas': 'Calças',
            'shorts': 'Shorts',
            'bones': 'Bonés',
            'gorros': 'Gorros',
            'bags': 'Bags & Mochilas',
            'meias': 'Meias',
            'tenis': 'Sneakers',
            'chinelos': 'Slides',
        };
        return titles[type] || type.charAt(0).toUpperCase() + type.slice(1);
    };

    const title = getCategoryTitle(type);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getProductsByCategory(type || '');
            setProducts(data);
            setLoading(false);
        };
        
        fetchProducts();
    }, [type]);

    return (
        <main className="pt-8 pb-20 px-6 xl:px-20 min-h-[80vh]">
            {/* Cabeçalho da Categoria Compacto e Elegante */}
            <div className="flex flex-col mb-10">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 uppercase tracking-widest font-semibold">
                    <Link to="/" className="hover:text-black transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-black">{title}</span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black pb-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-text-01 tracking-tighter uppercase">{title}</h1>
                    
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500 whitespace-nowrap">{products.length} Produtos</span>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <select className="bg-transparent border-none outline-none font-semibold text-text-01 cursor-pointer hover:opacity-70 transition-opacity">
                            <option>Relevância</option>
                            <option>Menor Preço</option>
                            <option>Maior Preço</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                    <div className="loader"></div>
                </div>
            ) : (
                /* Grid de Produtos */
                products.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                        {products.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer animate-fade-in-up">
                                <div className="w-full aspect-[3/4] bg-light-02 rounded-sm overflow-hidden mb-4 relative">
                                    {product.isNew && (
                                        <span className="absolute top-0 left-0 bg-text-01 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider z-10">
                                            Novo
                                        </span>
                                    )}
                                    <div className="w-full h-full relative">
                                        {product.images && product.images.length > 0 ? (
                                            <img 
                                                src={product.images[0]} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                <span className="material-icons-outlined text-4xl">image_not_supported</span>
                                            </div>
                                        )}
                                        {/* Overlay Escuro ao passar o mouse */}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div className="absolute inset-x-4 bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <button className="w-full bg-white/90 backdrop-blur-sm text-text-01 font-semibold py-3 hover:bg-text-01 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wide">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-text-01 font-medium text-sm leading-snug group-hover:underline decoration-1 underline-offset-4 line-clamp-2 min-h-[40px]">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-text-01 font-bold text-sm">
                                            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-medium">
                                            6x de {(product.price / 6).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-bold text-gray-600">Categoria em construção</h3>
                        <p className="text-gray-500 mt-2 mb-6">Estamos adicionando os produtos desta coleção.</p>
                        <Link to="/" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-brand-01 hover:border-brand-01 transition-all">
                            Continuar Comprando
                        </Link>
                    </div>
                )
            )}
        </main>
    );
};
