'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterUser } from '@/utils/RegisterUser/RegisterUser';
import { signIn, useSession } from 'next-auth/react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });
  const [erro, setErro] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const router = useRouter();
  const session = useSession();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novosErros = {};

   
    if (!formData.nome) {
      novosErros.nome = 'Por favor, insira seu nome.';
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      novosErros.email = 'Por favor, insira um endereço de email válido.';
    }

    
    if (!formData.senha) {
      novosErros.senha = 'Por favor, insira uma senha.';
    }

    
    setErro(novosErros);

    
    if (Object.keys(novosErros).length > 0) {
      setTimeout(() => {
        setErro({});
      }, 3000); 
      return;
    }

    
    const result = await RegisterUser(formData.nome, formData.email, formData.senha);

    if (result.success) {
      setMensagemSucesso('Conta criada com sucesso');
      setMostrarModal(true);
      setTimeout(() => {
        setMostrarModal(false);
        router.push('/');
        signIn('credentials', { email: formData.email, password: formData.senha });
      }, 3000);
    } else if (result.message.includes('already exists')) {
      setErro({ email: 'Este email já está registrado.' });
      setTimeout(() => {
        setErro({});
      }, 3000); 
    } else {
      setErro({ geral: result.message || 'Ocorreu um erro desconhecido' });
      setTimeout(() => {
        setErro({});
      }, 3000); 
    }
  };

  if (session.status === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (session.status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <h2>Registrar</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Nome */}
        <input
          name="nome"
          type="text"
          placeholder="Nome"
          className={styles.input}
          onChange={onChangeHandle}
        />
        {erro.nome && <p className={styles.error}>{erro.nome}</p>}

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={styles.input}
          onChange={onChangeHandle}
        />
        {erro.email && <p className={styles.error}>{erro.email}</p>}

        {/* Senha */}
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          className={styles.input}
          onChange={onChangeHandle}
        />
        {erro.senha && <p className={styles.error}>{erro.senha}</p>}

        <button className={styles.button}>Registrar</button>
        {erro.geral && <p className={styles.error}>{erro.geral}</p>}
      </form>
      <Link href="/dashboard/login" className={styles.loginLink}>
        Login com uma conta existente
      </Link>

      {mostrarModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Registro bem-sucedido!</h3>
            <p>Sua conta foi criada com sucesso.</p>
          </div>
        </div>
      )}
    </div>
  );
}
