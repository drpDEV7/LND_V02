import React from 'react';

const InfoItem: React.FC<{ icon: string; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
    <div className="flex items-center justify-center gap-4 relative lg:after:content-[''] lg:after:absolute lg:after:-right-8 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:w-px lg:after:h-10 lg:after:bg-[#ddd] lg:last:after:hidden">
        <span className="material-icons-outlined text-[32px] text-text-01">{icon}</span>
        <div className="text-left">
            <strong className="text-base font-bold block text-text-01">{title}</strong>
            <p className="text-sm text-[#555] m-0">{subtitle}</p>
        </div>
    </div>
);

export const InfoBar: React.FC = () => {
    return (
        <section className="bg-light-01 py-12 px-6 xl:px-20 border-y border-[#eee] flex flex-col md:flex-row justify-around gap-8 md:gap-4">
            <InfoItem icon="credit_card" title="Parcelamento" subtitle="em até 6 vezes sem juros" />
            <InfoItem icon="local_shipping" title="Frete Grátis" subtitle="Em todo site por tempo limitado!" />
            <InfoItem icon="whatsapp" title="Whatsapp" subtitle="(21) 4105-8684" />
            <InfoItem icon="sell" title="LND's CLUB" subtitle="Cadastre-se e fique por dentro" />
        </section>
    );
};