
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            
            navigate('/'); // Redireciona para home após login
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-light-02">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-text-01 mb-2">Bem-vindo de volta</h1>
                    <p className="text-gray-500">Entre na sua conta LND STREET</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
                            placeholder="********"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="mt-4 w-full bg-text-01 text-white font-bold h-12 rounded-full hover:bg-brand-01 transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? <div className="loader w-6 h-6 border-white border-t-transparent"></div> : 'ENTRAR'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <Link to="/register" className="font-bold text-brand-01 hover:underline">
                        Cadastre-se
                    </Link>
                </div>
            </div>
        </main>
    );
};
