
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) throw error;
            
            alert('Cadastro realizado com sucesso! Verifique seu e-mail.');
            navigate('/login');
        } catch (err: any) {
            setError(err.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-light-02">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-text-01 mb-2">Crie sua conta</h1>
                    <p className="text-gray-500">Junte-se ao LND CLUB</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Nome Completo</label>
                        <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-brand-01 focus:ring-1 focus:ring-brand-01 outline-none transition-all"
                            placeholder="Seu nome"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">E-mail</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-brand-01 focus:ring-1 focus:ring-brand-01 outline-none transition-all"
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Senha</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-brand-01 focus:ring-1 focus:ring-brand-01 outline-none transition-all"
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="mt-4 w-full bg-brand-01 text-white font-bold h-12 rounded-full hover:bg-text-01 transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? <div className="loader w-6 h-6 border-white border-t-transparent"></div> : 'CRIAR CONTA'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="font-bold text-brand-01 hover:underline">
                        Entrar
                    </Link>
                </div>
            </div>
        </main>
    );
};
