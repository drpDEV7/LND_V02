import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-text-01 text-light-01 py-12 px-6 xl:px-20 flex flex-col md:flex-row justify-between gap-10">
            <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-semibold mb-4">Roupas</h4>
                <ul className="list-none p-0 flex flex-col items-center md:items-start gap-4">
                    <li><a href="#" className="text-sm font-medium text-light-01/80 hover:text-white transition-colors">Camisetas</a></li>
                    <li><a href="#" className="text-sm font-medium text-light-01/80 hover:text-white transition-colors">Moletons</a></li>
                    <li><a href="#" className="text-sm font-medium text-light-01/80 hover:text-white transition-colors">Calças</a></li>
                </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-semibold mb-4">Acessórios</h4>
                <ul className="list-none p-0 flex flex-col items-center md:items-start gap-4">
                    <li><a href="#" className="text-sm font-medium text-light-01/80 hover:text-white transition-colors">Bonés</a></li>
                    <li><a href="#" className="text-sm font-medium text-light-01/80 hover:text-white transition-colors">Gorros</a></li>
                    <li><a href="#" className="text-sm font-medium text-light-01/80 hover:text-white transition-colors">Meias</a></li>
                </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-semibold mb-4">LND STREET</h4>
                <ul className="list-none p-0 flex flex-col items-center md:items-start gap-4">
                    <li><a href="#" className="text-sm font-medium text-light-01/80 hover:text-white transition-colors">Sobre Nós</a></li>
                    <li><a href="#" className="text-sm font-medium text-light-01/80 hover:text-white transition-colors">Contato</a></li>
                    <li><a href="#" className="text-sm font-medium text-light-01/80 hover:text-white transition-colors">Política de Privacidade</a></li>
                </ul>
            </div>
        </footer>
    );
};