import clsx from 'clsx';
import { Eye, EyeSlash } from 'phosphor-react';
import React, { useCallback, useRef, useState } from 'react';
import { IInput } from '../../interfaces';

export const Input: React.FC<IInput> = ({ name, icon: Icon, passwordState=undefined, error=undefined, ...restProps }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleToggle = () => {
    if(isFilled && !!passwordState?.togglePassword) {
      passwordState.togglePassword()
    }
    return
  }

  return (
  <div className="flex flex-col">
    <div
      data-testid="input-container-focus"
      className={clsx("relative rounded-sm mt-3 text-zinc-300 bg-zinc-900 flex items-center h-full w-full", {
        'border-focus-input':isFocused
      })}
    >
      <span className="absolute inset-y-0 left-0 flex py-4 px-2 items-center focus:outline-none">
        {Icon && 
            <Icon 
              size={20} 
              className={clsx("text-zinc-400", {
                "text-violet-600 font-bold":isFocused
              })}
            />}
      </span>
      <input 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...restProps}
        className={name === 'password' ? 'input-password' : 'input-primary'}
        autoComplete="off"
      />    
      {passwordState?.togglePassword ? (
        <button 
          type="button" 
          onClick={handleToggle}
          className="absolute inset-y-0 right-0 p-1.5 flex items-center focus:outline-none"
        >
          {passwordState.passwordShown && isFilled ? <EyeSlash size={20} className="text-zinc-400"/> : <Eye size={20} className="text-zinc-400"/>}
        </button>
      ) : null}
    </div>
    {error ? (
      <span className="flex w-full flex-wrap text-red-600 p-1">{error}</span>
    ):null}
  </div>);
}