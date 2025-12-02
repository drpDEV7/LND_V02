
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export const Header: React.FC = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    const location = useLocation();

    // Fecha o menu mobile ao mudar de rota
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchVisible(false);
        
        // Check current user
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });

        // Listen for changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [location]);

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleAccordion = (category: string) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-light-01">
                {/* Banner Animado (Marquee) */}
                <div className="bg-text-01 text-light-01 text-sm py-2 overflow-hidden whitespace-nowrap relative z-50">
                    <div className="inline-flex animate-marquee gap-8 md:gap-20 w-max hover:[animation-play-state:paused] cursor-default">
                        {[...Array(6)].map((_, i) => (
                            <span key={i} className="inline-flex items-center gap-4">
                                <span>FRETE GRÁTIS EM PEDIDOS ACIMA DE R$150</span>
                                <span className="w-1.5 h-1.5 bg-brand-01 rounded-full opacity-50"></span>
                                <span>PARCELAMENTO EM ATÉ 6X SEM JUROS</span>
                                <span className="w-1.5 h-1.5 bg-brand-01 rounded-full opacity-50"></span>
                            </span>
                        ))}
                    </div>
                </div>
                
                <nav className="flex items-center justify-between h-20 px-6 xl:px-20 border-b border-black/10 relative z-50 bg-light-01">
                    {/* Left Nav (Desktop) + Mobile Toggle */}
                    <div className="flex-1 flex items-center justify-start h-full">
                        {/* Mobile Menu Icon */}
                        <div className="lg:hidden mr-4">
                            <span 
                                onClick={toggleMobileMenu} 
                                className="material-icons-outlined text-2xl cursor-pointer hover:text-brand-01 transition-colors"
                            >
                                menu
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex items-center h-full list-none gap-0">
                            
                            {/* ROUPAS */}
                            <li className="group relative flex items-center h-full px-5 cursor-pointer">
                                <span className="text-base text-text-01 group-hover:text-brand-01 transition-colors font-medium">
                                    Roupas
                                </span>
                                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-[90%] left-0 bg-light-01 p-8 rounded-xl shadow-card-base transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100 whitespace-nowrap z-50">
                                    <div className="flex gap-14">
                                        <ul className="flex flex-col gap-3 min-w-[120px]">
                                            <li className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Parte de Cima</li>
                                            <li><Link to="/camisetas" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Camisetas</Link></li>
                                            <li><Link to="/moletons" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Moletons</Link></li>
                                            <li><Link to="/jaquetas" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Jaquetas</Link></li>
                                        </ul>
                                        <ul className="flex flex-col gap-3 min-w-[120px]">
                                            <li className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Parte de Baixo</li>
                                            <li><Link to="/calcas" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Calças</Link></li>
                                            <li><Link to="/shorts" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Shorts</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            {/* CALÇADOS */}
                            <li className="group relative flex items-center h-full px-5 cursor-pointer">
                                <span className="text-base text-text-01 group-hover:text-brand-01 transition-colors font-medium">
                                    Calçados
                                </span>
                                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-[90%] left-0 bg-light-01 p-8 rounded-xl shadow-card-base transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100 whitespace-nowrap z-50">
                                    <div className="flex gap-14">
                                        <ul className="flex flex-col gap-3 min-w-[120px]">
                                            <li className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Sneakers</li>
                                            <li><Link to="/tenis" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Tênis</Link></li>
                                        </ul>
                                        <ul className="flex flex-col gap-3 min-w-[120px]">
                                            <li className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Slides</li>
                                            <li><Link to="/chinelos" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Chinelos</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            {/* ACESSÓRIOS */}
                            <li className="group relative flex items-center h-full px-5 cursor-pointer">
                                <span className="text-base text-text-01 group-hover:text-brand-01 transition-colors font-medium">
                                    Acessórios
                                </span>
                                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-[90%] left-0 bg-light-01 p-8 rounded-xl shadow-card-base transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100 whitespace-nowrap z-50">
                                    <div className="flex gap-14">
                                        <ul className="flex flex-col gap-3 min-w-[120px]">
                                            <li className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Hardwear</li>
                                            <li><Link to="/bones" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Bonés</Link></li>
                                            <li><Link to="/gorros" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Gorros</Link></li>
                                        </ul>
                                        <ul className="flex flex-col gap-3 min-w-[120px]">
                                            <li className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Essenciais</li>
                                            <li><Link to="/bags" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Bags</Link></li>
                                            <li><Link to="/meias" className="font-medium text-text-01 hover:text-brand-01 transition-colors block py-1">Meias</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" id="logo" className="text-2xl md:text-[28px] font-bold text-text-01 text-center no-underline tracking-tight">
                        LND STREET
                    </Link>

                    {/* Right Nav */}
                    <div className="flex-1 flex items-center justify-end">
                        <ul className="hidden lg:flex items-center h-full list-none gap-0 mr-5">
                            <li><a href="#" className="text-base text-text-01 px-5 hover:text-brand-01 transition-colors font-medium">Lançamentos</a></li>
                            <li><a href="#about" className="text-base text-text-01 px-5 hover:text-brand-01 transition-colors font-medium">Sobre Nós</a></li>
                        </ul>
                        <div className="flex items-center gap-3 md:gap-5">
                            <span onClick={toggleSearch} className="material-icons-outlined cursor-pointer hover:text-brand-01 transition-colors select-none p-2 rounded-full hover:bg-gray-100">search</span>
                            
                            <Link to={user ? "#" : "/login"} className="relative">
                                <span className="material-icons-outlined cursor-pointer hover:text-brand-01 transition-colors p-2 rounded-full hover:bg-gray-100">
                                    {user ? 'person' : 'person_outline'}
                                </span>
                                {user && <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></span>}
                            </Link>

                            <span className="material-icons-outlined cursor-pointer hover:text-brand-01 transition-colors p-2 rounded-full hover:bg-gray-100">shopping_cart</span>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleMobileMenu}></div>
            
            {/* Mobile Menu Drawer */}
            <div className={`fixed top-0 left-0 w-[85%] max-w-[320px] h-full bg-light-01 z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <span className="text-xl font-bold tracking-tight">MENU</span>
                    <span onClick={toggleMobileMenu} className="material-icons-outlined cursor-pointer text-2xl hover:text-brand-01">close</span>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4">
                    <ul className="flex flex-col">
                        {/* Mobile Roupas */}
                        <li className="border-b border-gray-50">
                            <div 
                                onClick={() => toggleAccordion('roupas')}
                                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50"
                            >
                                <span className="font-semibold text-lg">Roupas</span>
                                <span className={`material-icons-outlined transition-transform duration-300 ${openCategory === 'roupas' ? 'rotate-180' : ''}`}>expand_more</span>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 bg-gray-50 ${openCategory === 'roupas' ? 'max-h-[500px]' : 'max-h-0'}`}>
                                <ul className="px-6 py-2 flex flex-col gap-2 pb-4">
                                    <li className="text-xs font-bold text-gray-400 mt-2">PARTE DE CIMA</li>
                                    <li><Link to="/camisetas" className="block py-2 text-gray-600 hover:text-brand-01">Camisetas</Link></li>
                                    <li><Link to="/moletons" className="block py-2 text-gray-600 hover:text-brand-01">Moletons</Link></li>
                                    <li><Link to="/jaquetas" className="block py-2 text-gray-600 hover:text-brand-01">Jaquetas</Link></li>
                                    <li className="text-xs font-bold text-gray-400 mt-2">PARTE DE BAIXO</li>
                                    <li><Link to="/calcas" className="block py-2 text-gray-600 hover:text-brand-01">Calças</Link></li>
                                    <li><Link to="/shorts" className="block py-2 text-gray-600 hover:text-brand-01">Shorts</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Mobile Calçados */}
                        <li className="border-b border-gray-50">
                            <div 
                                onClick={() => toggleAccordion('calcados')}
                                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50"
                            >
                                <span className="font-semibold text-lg">Calçados</span>
                                <span className={`material-icons-outlined transition-transform duration-300 ${openCategory === 'calcados' ? 'rotate-180' : ''}`}>expand_more</span>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 bg-gray-50 ${openCategory === 'calcados' ? 'max-h-[500px]' : 'max-h-0'}`}>
                                <ul className="px-6 py-2 flex flex-col gap-2 pb-4">
                                    <li className="text-xs font-bold text-gray-400 mt-2">SNEAKERS</li>
                                    <li><Link to="/tenis" className="block py-2 text-gray-600 hover:text-brand-01">Tênis</Link></li>
                                    <li className="text-xs font-bold text-gray-400 mt-2">SLIDES</li>
                                    <li><Link to="/chinelos" className="block py-2 text-gray-600 hover:text-brand-01">Chinelos</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Mobile Acessórios */}
                        <li className="border-b border-gray-50">
                            <div 
                                onClick={() => toggleAccordion('acessorios')}
                                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50"
                            >
                                <span className="font-semibold text-lg">Acessórios</span>
                                <span className={`material-icons-outlined transition-transform duration-300 ${openCategory === 'acessorios' ? 'rotate-180' : ''}`}>expand_more</span>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 bg-gray-50 ${openCategory === 'acessorios' ? 'max-h-[500px]' : 'max-h-0'}`}>
                                <ul className="px-6 py-2 flex flex-col gap-2 pb-4">
                                    <li className="text-xs font-bold text-gray-400 mt-2">HARDWEAR</li>
                                    <li><Link to="/bones" className="block py-2 text-gray-600 hover:text-brand-01">Bonés</Link></li>
                                    <li><Link to="/gorros" className="block py-2 text-gray-600 hover:text-brand-01">Gorros</Link></li>
                                    <li className="text-xs font-bold text-gray-400 mt-2">ESSENCIAIS</li>
                                    <li><Link to="/bags" className="block py-2 text-gray-600 hover:text-brand-01">Bags</Link></li>
                                    <li><Link to="/meias" className="block py-2 text-gray-600 hover:text-brand-01">Meias</Link></li>
                                </ul>
                            </div>
                        </li>
                        
                        <li className="px-6 py-4"><a href="#" className="font-semibold text-lg block hover:text-brand-01">Lançamentos</a></li>
                        <li className="px-6 py-4"><a href="#about" className="font-semibold text-lg block hover:text-brand-01">Sobre Nós</a></li>
                    </ul>
                </div>
                
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-center gap-6 text-gray-500">
                        <Link to={user ? "#" : "/login"}>
                            <span className="material-icons-outlined text-2xl cursor-pointer hover:text-brand-01">
                                {user ? 'person' : 'person_outline'}
                            </span>
                        </Link>
                        <span className="material-icons-outlined text-2xl cursor-pointer hover:text-brand-01">favorite_border</span>
                        <span className="material-icons-outlined text-2xl cursor-pointer hover:text-brand-01">shopping_cart</span>
                    </div>
                </div>
            </div>

            {/* Search Bar Container - FIXED OVERLAY */}
            <div 
                className={`fixed top-20 left-0 w-full bg-light-01 z-40 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isSearchVisible ? 'max-h-[100px] py-5 opacity-100 translate-y-0' : 'max-h-0 py-0 opacity-0 -translate-y-5'}`}
            >
                <div className="relative max-w-4xl mx-auto px-6 xl:px-20">
                    <input 
                        type="text" 
                        placeholder="Procurar por..." 
                        className="w-full h-[50px] bg-light-02 border border-[#ddd] rounded-full px-6 pr-[60px] text-base outline-none focus:border-brand-01 transition-colors"
                        autoFocus={isSearchVisible}
                    />
                    <span className="material-icons-outlined absolute right-11 lg:right-24 top-1/2 -translate-y-1/2 text-[#888] cursor-pointer">search</span>
                </div>
            </div>
        </>
    );
};
