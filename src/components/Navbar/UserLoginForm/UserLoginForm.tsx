import React from 'react';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { useAuthActions } from '../../../hooks/useAuthActions';
import { useLoginForm } from '../../../hooks/useLoginForm';

interface UserLoginFormProps {
  setIsOpen: (state: boolean) => void;
  setAuth: () => void;
}

export const UserLoginForm: React.FC<UserLoginFormProps> = ({ setIsOpen, setAuth }) => {
  const { toggleAuth, closeDrawer } = useAuthActions(setIsOpen, setAuth);
  const { form, isLoading, onSubmit } = useLoginForm(closeDrawer);
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <h4 className="font-normal text-sm text-center text-white py-6">Login</h4>
      <Input
        control={form.control}
        label="Email"
        name="email"
        type="email"
        error={form.formState.errors.email?.message}
        register={form.register}
      />
      <Input
        control={form.control}
        label="Password"
        name="password"
        type="password"
        error={form.formState.errors.password?.message}
        register={form.register}
      />
      <div className="mb-5">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span>
              <div className="w-[14px] h-[14px] mr-2 border-4 border-white border-b-transparent rounded-full inline-block animate-rotation"></div>
              Loading...
            </span>
          ) : (
            'Login'
          )}
        </Button>
      </div>
      <span className="flex justify-center cursor-pointer text-white" onClick={toggleAuth}>
        Don't have an account? Register.
      </span>
    </form>
  );
};
