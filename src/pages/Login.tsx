import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import logo from '../assets/logo.svg'
import { EnvelopeSimple, Password, SignIn } from 'phosphor-react';
import { Input } from '../components/Input';
import { IEventFormLogin } from '../interfaces';


export const Login: React.FC = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/login";

  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = useCallback(() => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(oldState => !oldState);
  }, [setPasswordShown]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { email: InputEmail, password: InputPassword } =
      event.target as typeof event.target & IEventFormLogin;

    if(!InputEmail || !InputPassword) {
      return 
    }

    auth.signin({
      email: InputEmail.value,
      password: InputPassword.value,
    }, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div className="m-auto w-full h-fit p-2">
      <div className="w-full h-full flex items-center justify-center m-auto transparent">
        <div className="md:min-[900px]:flex md:max-min-[900px]:items-center md:max-min-[900px]:justify-center m-auto gap-12">
          <div className="max-w-[30rem] flex flex-col justify-center items-start gap-16 p-5 md:flex-shrink-0">
            <img className="max-h-20" src={logo} alt="Habits" />
            <h1 className="flex flex-nowrap font-sans text-5xl font-bold text-left">
              Faça seu login 
              <br/>
              na plataforma
            </h1>
          </div>
          <div className="max-w-[30rem] h-[31rem] p-5">
            <div className="bg-zinc-800 rounded-md shadow-md w-[28rem] h-full p-10 gap-1">
              <form className="w-full flex flex-col mt-6" onSubmit={handleSubmit}>
              
                <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="E-mail"                       
                  autoFocus
                  icon={EnvelopeSimple}
                /> 

                <Input 
                  type={passwordShown ? "text": "password"}                
                  name="password" 
                  id="password" 
                  icon={Password}
                  placeholder="Senha"                 
                  passwordState={{passwordShown, togglePassword}}
                /> 

                <a 
                  href="/forgot" 
                  className="mt-3 text-violet-700 text-sm font-bold focus:outline-none hover:text-violet-500 w-fit"      
                >
                  Esqueci minha senha
                </a>
    

                <button type="submit" className="uppercase font-bold mt-6 rounded-sm p-4 flex items-center justify-center gap-3 font-semibol bg-violet-700 hover:bg-violet-600 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background">
                  <SignIn size={20} weight="bold" />
                  entrar
                </button>              
              </form>

              <div className="border-t-2 flex justify-center mt-8 border-t-zinc-600 w-10/12 m-auto p-3">
                <span className='text-zinc-300'>
                  Não tem uma conta? <a href="/signup" className='font-bold text-violet-700 focus:outline-none hover:text-violet-500 w-fit'>Registre-se</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}