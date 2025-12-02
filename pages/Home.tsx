
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
    title: string;
    image: string;
    link: string;
    gridSpan?: string;
    delay?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, link, gridSpan = "col-span-1", delay = "delay-0" }) => (
    <Link to={link} className={`group relative block ${gridSpan} h-[320px] md:h-[400px] perspective-1000 animate-fade-in-up ${delay}`}>
        {/* Container do Card com efeito 3D */}
        <div className="relative w-full h-full rounded-[30px] overflow-hidden transition-all duration-500 ease-out transform-gpu group-hover:-translate-y-3 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] shadow-card-base bg-gray-100">
            
            {/* Imagem de Fundo com Zoom Suave */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                />
            </div>

            {/* Gradiente Overlay para Leitura */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

            {/* Conteúdo Flutuante */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start justify-end h-full transform transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-2 translate-y-4 transition-transform duration-500 group-hover:translate-y-0 text-shadow-sm">
                    {title}
                </h3>
                
                <div className="h-[2px] w-12 bg-brand-01 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                
                <span className="text-sm font-medium text-white/90 uppercase tracking-widest opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 delay-75 flex items-center gap-2">
                    Ver Coleção <span className="material-icons-outlined text-base">arrow_forward</span>
                </span>
            </div>
        </div>
    </Link>
);

export const Home: React.FC = () => {
    return (
        <main className="pb-12">
            {/* Hero Section com VIDEO */}
            <section className="hero min-h-[600px] relative flex items-center justify-center overflow-hidden mb-12 animate-fade-in-up">
                
                {/* 
                    CONFIGURAÇÃO DO VÍDEO 
                    Substitua o src abaixo pelo caminho do seu vídeo (ex: videos/banner.mp4)
                */}
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                >
                    <source src="https://videos.pexels.com/video-files/3753472/3753472-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos.
                </video>

                {/* Overlay Escuro sobre o vídeo para garantir leitura do texto */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl tracking-tighter animate-fade-in-up delay-100">
                        LND STREET
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md mb-8 animate-fade-in-up delay-200">
                        Elevando o streetwear a um novo nível de autenticidade.
                    </p>
                    <div className="animate-fade-in-up delay-300">
                        <Link to="/camisetas" className="inline-block bg-white text-text-01 font-bold py-4 px-10 rounded-full hover:bg-brand-01 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                            EXPLORAR COLEÇÃO
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="px-6 xl:px-20 mb-20">
                <div className="flex flex-col items-center mb-12 animate-fade-in-up delay-100">
                    <h2 className="text-4xl font-bold text-text-01 mb-3">Coleções</h2>
                    <div className="w-24 h-1 bg-brand-01 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Roupas - Parte de Cima */}
                    <CategoryCard 
                        title="Camisetas" 
                        link="/camisetas" 
                        image="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-100"
                    />
                    <CategoryCard 
                        title="Moletons" 
                        link="/moletons" 
                        image="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-200"
                    />
                    <CategoryCard 
                        title="Jaquetas" 
                        link="/jaquetas" 
                        image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-300"
                    />

                    {/* Roupas - Parte de Baixo */}
                    <CategoryCard 
                        title="Calças" 
                        link="/calcas" 
                        image="https://uyhescuaotrlzjzsfsbh.supabase.co/storage/v1/object/public/calca1/FRENTE.png" 
                        delay="delay-100"
                    />
                    <CategoryCard 
                        title="Shorts" 
                        link="/shorts" 
                        image="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-200"
                    />

                    {/* Calçados (NOVO) */}
                    <CategoryCard 
                        title="Tênis" 
                        link="/tenis" 
                        image="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-300"
                    />
                     <CategoryCard 
                        title="Chinelos" 
                        link="/chinelos" 
                        image="https://images.unsplash.com/photo-1603487742131-4160d698725e?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-100"
                    />
                    
                    {/* Acessórios - Hardwear */}
                    <CategoryCard 
                        title="Bonés" 
                        link="/bones" 
                        image="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-200"
                    />
                    
                    {/* Acessórios - Essenciais */}
                    <CategoryCard 
                        title="Gorros" 
                        link="/gorros" 
                        image="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-300"
                    />
                    <CategoryCard 
                        title="Bags" 
                        link="/bags" 
                        image="https://images.unsplash.com/photo-1590874103328-2784de6d493e?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-100"
                    />
                    <CategoryCard 
                        title="Meias" 
                        link="/meias" 
                        image="https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800&auto=format&fit=crop" 
                        delay="delay-200"
                    />
                </div>
            </section>

            {/* Newsletter Section */}
            <section id="about" className="px-6 xl:px-20 animate-fade-in-up delay-300">
                <div className="bg-gradient-to-br from-[#E6E6FA] to-[#F5F5F5] py-20 px-6 rounded-[40px] text-center shadow-inner relative overflow-hidden group">
                    {/* Efeito sutil de background hover */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-01 opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-[32px] font-bold text-text-01 mb-4">Fique Conectado</h2>
                        <p className="leading-relaxed mt-4 mb-10 max-w-[500px] mx-auto text-text-01/80">
                            Receba drops exclusivos, novidades da coleção e ofertas especiais da LND STREET.
                        </p>
                        <div className="flex justify-center w-full max-w-md mx-auto relative">
                            <input 
                                type="email" 
                                placeholder="Seu melhor e-mail" 
                                className="w-full pl-6 pr-36 py-4 rounded-full border-none shadow-lg outline-none focus:ring-2 focus:ring-brand-01 transition-all"
                            />
                            <button className="absolute right-1 top-1 bottom-1 px-6 rounded-full bg-text-01 text-white font-bold text-sm hover:bg-brand-01 transition-colors duration-300">
                                INSCREVER
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
