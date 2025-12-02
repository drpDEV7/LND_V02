
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Product } from '../data/products';
import { ShippingCalculator } from '../components/ShippingCalculator';

export const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isTableOpen, setIsTableOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const data = await getProductById(id);
                if (data) {
                    setProduct(data);
                    window.scrollTo(0, 0);
                }
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center"><div className="loader"></div></div>;
    }

    const priceFormatted = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const installments = `6x de ${(product.price / 6).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    
    // Verifica estoque
    const hasStock = product.stock > 0;
    const isLowStock = product.stock > 0 && product.stock < 5;

    return (
        <main className="pt-0 pb-20 animate-fade-in-up">
            {/* Breadcrumb */}
            <div className="px-6 xl:px-20 mt-8 mb-6 text-xs text-gray-500 uppercase tracking-widest font-semibold">
                <Link to="/" className="hover:text-black">Home</Link> / 
                <Link to={`/${product.category}`} className="hover:text-black mx-1">{product.category}</Link> / 
                <span className="text-black ml-1">{product.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 px-6 xl:px-20">
                {/* GALERIA DE IMAGENS (Estilo Grid) */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 h-fit sticky top-24">
                    {product.images.map((img, index) => (
                        <div key={index} className={`bg-light-02 rounded-sm overflow-hidden aspect-[3/4] ${product.images.length === 1 ? 'md:col-span-2' : ''} ${index === 0 && product.images.length % 2 !== 0 && product.images.length > 1 ? 'md:col-span-2' : ''}`}>
                            <img 
                                src={img} 
                                alt={`${product.name} ${index + 1}`} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/800x1000?text=Imagem+Indisponivel';
                                }}
                            />
                        </div>
                    ))}
                    {/* Fallback se não tiver imagem */}
                    {product.images.length === 0 && (
                        <div className="bg-light-02 rounded-sm overflow-hidden aspect-[3/4] md:col-span-2 flex items-center justify-center text-gray-400">
                             <span className="material-icons-outlined text-6xl">image_not_supported</span>
                        </div>
                    )}
                </div>

                {/* DETALHES DO PRODUTO */}
                <div className="flex-1 lg:max-w-[450px] flex flex-col pt-4">
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-text-01 mb-2 leading-tight">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-2xl font-medium text-text-01">{priceFormatted}</span>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{installments} sem juros</span>
                        </div>
                        
                        {/* Status de Estoque */}
                        {!hasStock ? (
                            <span className="inline-block bg-gray-200 text-gray-500 text-xs font-bold px-3 py-1 uppercase tracking-wider mb-4">
                                Esgotado
                            </span>
                        ) : isLowStock ? (
                            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 uppercase tracking-wider mb-4">
                                Últimas Unidades
                            </span>
                        ) : null}
                    </div>

                    <div className="w-full h-px bg-gray-200 mb-8"></div>

                    {/* Seletor de Tamanho */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold uppercase tracking-wider text-text-01">Tamanho</span>
                            {product.measurements && (
                                <button 
                                    onClick={() => setIsTableOpen(true)}
                                    className="text-xs font-bold uppercase tracking-wider text-brand-01 hover:underline flex items-center gap-1"
                                >
                                    <span className="material-icons-outlined text-base">straighten</span>
                                    Guia de Medidas
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => hasStock && setSelectedSize(size)}
                                    disabled={!hasStock}
                                    className={`w-12 h-12 flex items-center justify-center border rounded transition-all font-medium
                                        ${selectedSize === size 
                                            ? 'border-text-01 bg-text-01 text-white' 
                                            : 'border-gray-300 text-text-01 hover:border-text-01'
                                        }
                                        ${!hasStock ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
                                    `}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Botão de Compra */}
                    <button 
                        disabled={!hasStock || !selectedSize}
                        className={`w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all mb-8 shadow-lg
                            ${!hasStock 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : !selectedSize 
                                    ? 'bg-text-01 text-white opacity-90 hover:opacity-100' 
                                    : 'bg-brand-01 text-white hover:bg-opacity-90 hover:shadow-xl hover:-translate-y-1'
                            }
                        `}
                    >
                        {!hasStock ? 'Indisponível' : !selectedSize ? 'Selecione um Tamanho' : 'Adicionar à Sacola'}
                    </button>

                    {/* Calculadora de Frete (Novo) */}
                    <ShippingCalculator productPrice={product.price} />

                    {/* Descrição */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-text-01 mb-3">Descrição</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {product.description}
                        </p>
                    </div>

                    {/* Detalhes Adicionais */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span className="material-icons-outlined text-gray-400">sync_alt</span>
                            <div>
                                <span className="block text-sm font-bold text-text-01">Troca Fácil</span>
                                <span className="text-xs text-gray-500">7 dias para troca ou devolução gratuita</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-icons-outlined text-gray-400">shield</span>
                            <div>
                                <span className="block text-sm font-bold text-text-01">Compra Segura</span>
                                <span className="text-xs text-gray-500">Seus dados protegidos com criptografia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL TABELA DE MEDIDAS */}
            {isTableOpen && product.measurements && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTableOpen(false)}></div>
                    <div className="bg-white p-8 rounded-2xl w-full max-w-lg relative z-10 animate-fade-in-up">
                        <button 
                            onClick={() => setIsTableOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-text-01"
                        >
                            <span className="material-icons-outlined">close</span>
                        </button>
                        
                        <h3 className="text-xl font-bold text-text-01 mb-6 text-center uppercase tracking-wide">Tabela de Medidas</h3>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Tamanho</th>
                                        <th className="px-6 py-3">Cintura</th>
                                        <th className="px-6 py-3">Quadril</th>
                                        <th className="px-6 py-3">Comprimento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.measurements.map((m, idx) => (
                                        <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-bold text-text-01">{m.size}</td>
                                            <td className="px-6 py-4">{m.waist}</td>
                                            <td className="px-6 py-4">{m.hips}</td>
                                            <td className="px-6 py-4">{m.length}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-xs text-gray-400 text-center">
                            * Medidas em centímetros. Podem variar até 2cm.
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
};
