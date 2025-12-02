
import React, { useState } from 'react';

interface ShippingOption {
    name: string;
    price: number;
    days: number;
}

interface ShippingCalculatorProps {
    productPrice: number;
}

export const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ productPrice }) => {
    const [cep, setCep] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ city: string; uf: string; options: ShippingOption[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Máscara 00000-000
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        
        setCep(value);
    };

    const calculateShipping = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanCep = cep.replace('-', '');

        if (cleanCep.length !== 8) {
            setError('Digite um CEP válido com 8 dígitos.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // 1. Busca endereço real na API ViaCEP
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await response.json();

            if (data.erro) {
                throw new Error('CEP não encontrado.');
            }

            // 2. Algoritmo Logístico Baseado na Distância do RJ (Origem da Loja)
            // O primeiro dígito do CEP indica a Região Postal
            const regionDigit = parseInt(cleanCep.substring(0, 1));
            const subRegionDigit = parseInt(cleanCep.substring(1, 2));
            const lastDigit = parseInt(cleanCep.substring(7, 8)); // Usado para variação fina de centavos

            let basePrice = 0;
            let baseDays = 0;

            // Lógica de Zonas baseada na origem Rio de Janeiro (CEPs iniciados em 2)
            if (data.uf === 'RJ') {
                // Zona Local (RJ)
                if (data.localidade === 'Rio de Janeiro') {
                    basePrice = 12.50;
                    baseDays = 2;
                } else {
                    basePrice = 16.90;
                    baseDays = 3;
                }
            } else if (regionDigit === 1 || regionDigit === 3) {
                // SP (1) e MG/ES (3) - Sudeste Vizinho
                basePrice = 24.80;
                baseDays = 4;
            } else if (regionDigit === 8 || regionDigit === 9 || regionDigit === 7 || regionDigit === 4) {
                // Sul (8,9), Centro-Oeste (7), BA/SE (4)
                basePrice = 32.90;
                baseDays = 7;
            } else {
                // Norte e Nordeste Distante (5, 6)
                basePrice = 48.50;
                baseDays = 12;
            }

            // Adiciona variação baseada na sub-região e dígito final para simular cálculo exato da transportadora
            // Isso garante que cada CEP tenha um valor levemente diferente
            const variance = (subRegionDigit * 0.50) + (lastDigit * 0.15);
            
            let pacPrice = basePrice + variance;
            let sedexPrice = (basePrice * 1.6) + variance + 4; // Sedex ~60% mais caro + base fixa
            
            let pacDays = baseDays;
            let sedexDays = Math.max(1, Math.floor(baseDays / 3));

            // Arredondar valores
            pacPrice = Math.round(pacPrice * 100) / 100;
            sedexPrice = Math.round(sedexPrice * 100) / 100;

            // Regra de Negócio: Frete Grátis acima de R$150 (Apenas PAC)
            if (productPrice >= 150) {
                pacPrice = 0;
            }

            setResult({
                city: data.localidade,
                uf: data.uf,
                options: [
                    { name: 'Entrega Standard', price: pacPrice, days: pacDays },
                    { name: 'Entrega Expressa', price: sedexPrice, days: sedexDays }
                ]
            });

        } catch (err) {
            setError('Não foi possível calcular o frete. Verifique o CEP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 mb-8">
            <div className="flex items-center gap-2 mb-3">
                <span className="material-icons-outlined text-text-01">local_shipping</span>
                <span className="text-sm font-bold uppercase tracking-wider text-text-01">Simular Entrega</span>
            </div>

            <form onSubmit={calculateShipping} className="flex gap-2 relative">
                <input 
                    type="text" 
                    value={cep}
                    onChange={handleCepChange}
                    placeholder="00000-000"
                    maxLength={9}
                    className="flex-1 h-10 px-3 border border-gray-300 rounded text-sm outline-none focus:border-brand-01 focus:ring-1 focus:ring-brand-01 bg-white text-text-01 font-medium"
                />
                <button 
                    type="submit" 
                    disabled={loading || cep.length < 9}
                    className="h-10 px-4 bg-text-01 text-white text-xs font-bold uppercase rounded hover:bg-brand-01 transition-colors disabled:opacity-50"
                >
                    {loading ? '...' : 'CALCULAR'}
                </button>
                <a 
                    href="https://buscacepinter.correios.com.br/app/endereco/index.php" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute -bottom-5 right-0 text-[10px] text-gray-400 hover:text-brand-01 underline"
                >
                    Não sei meu CEP
                </a>
            </form>

            {error && (
                <p className="text-xs text-red-500 mt-3 font-medium flex items-center gap-1">
                    <span className="material-icons-outlined text-sm">error</span> {error}
                </p>
            )}

            {result && (
                <div className="mt-4 animate-fade-in-up">
                    <p className="text-xs text-gray-500 mb-3 border-b border-gray-200 pb-2">
                        Entrega para <strong className="text-text-01">{result.city} - {result.uf}</strong>
                    </p>
                    <div className="flex flex-col gap-2">
                        {result.options.map((option, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm p-2 rounded hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-text-01 flex items-center gap-1">
                                        {option.name}
                                        {option.price === 0 && <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded">PROMO</span>}
                                    </span>
                                    <span className="text-xs text-gray-500">chega em até {option.days} dias úteis</span>
                                </div>
                                <span className={`font-bold ${option.price === 0 ? 'text-green-600' : 'text-text-01'}`}>
                                    {option.price === 0 ? 'Grátis' : option.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
