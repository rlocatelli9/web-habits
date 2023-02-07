import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import logo from '../assets/logo.svg'
import { ArrowLeft, EnvelopeSimple, Password, User } from 'phosphor-react';
import { Input } from '../components/Input';
import { IEventFormSignUp, IInputError } from '../interfaces';


export const SignUp: React.FC = () => {
  let navigate = useNavigate();
  let auth = useAuth();

  const [passwordShown, setPasswordShown] = useState(false);
  const [errorFields, setErrorFields] = useState<IInputError>();

  // Password toggle handler
  const togglePassword = useCallback(() => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(oldState => !oldState);
  }, [setPasswordShown]);

 async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { email: InputEmail, password: InputPassword, name: InputName } =
      event.target as typeof event.target & IEventFormSignUp;

    if(!InputEmail) {
      setErrorFields({email: "Campo e-mail é obrigatório"})
      return
    } else if(!InputPassword) {
      setErrorFields({password: "Campo senha é obrigatório"})
      return
    }

    const response = await auth.signup({
      name: InputName.value,
      email: InputEmail.value,
      password: InputPassword.value,
    }, () => {
      navigate('/login', { replace: true });
    });

    if(response.validationError){
      response.fields && response.fields.forEach((field: string | number) => {
        setErrorFields({[field]: "valor inválido"})
      });
      return 
    }    
  }

  return (
    <div className="m-auto w-full h-fit p-2">
      <div className="w-full h-full flex items-center justify-center m-auto transparent">
        <div className="md:min-[900px]:flex md:max-min-[900px]:items-center md:max-min-[900px]:justify-center m-auto gap-12">
          <div className="max-w-[30rem] flex flex-col justify-center items-start gap-16 p-5 md:flex-shrink-0">
            <img className="max-h-20" src={logo} alt="Habits" />
            <h1 className="flex flex-nowrap font-sans text-5xl font-bold text-left">
              Faça seu cadastro 
              <br/>
              na plataforma
            </h1>
          </div>
          <div className="max-w-[30rem] h-[31rem] p-5">
            <div className="bg-zinc-800 rounded-md shadow-md w-[28rem] h-full p-10 gap-1">
              <form className="w-full flex flex-col m-auto" onSubmit={handleSubmit}>

                <Input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="Nome de usuário"                       
                  autoFocus
                  icon={User}
                />
              
                <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Endereço de e-mail"
                  icon={EnvelopeSimple}
                  error={errorFields?.email}
                />

                <Input 
                  type={passwordShown ? "text": "password"}                
                  name="password" 
                  id="password" 
                  icon={Password}
                  placeholder="Senha"                 
                  passwordState={{passwordShown, togglePassword}}
                  error={errorFields?.password}
                />

                <button type="submit" className="uppercase font-bold mt-6 rounded-sm p-4 flex items-center justify-center gap-3 font-semibol bg-violet-700 hover:bg-violet-600 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background">
                  Cadastrar
                </button>

                <a 
                  href="/login"
                  className="flex justify-center mx-auto mt-4 uppercase text-zinc-500 w-fit font-bold focus:outline-none hover:text-zinc-400 transition-colors"
                >
                  voltar para login
                </a>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}