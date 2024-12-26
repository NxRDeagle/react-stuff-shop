import React from 'react';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import FileInput from '../../FileInput/FileInput';
import { useSignUpForm } from '../../../hooks/useSignUpForm';
import { useAuthActions } from '../../../hooks/useAuthActions';

interface UserSignUpFormProps {
  setIsOpen: (state: boolean) => void;
  setAuth: () => void;
}

export const UserSignUpForm: React.FC<UserSignUpFormProps> = ({ setIsOpen, setAuth }) => {
  const { toggleAuth, closeDrawer } = useAuthActions(setIsOpen, setAuth);
  const { form, isLoading, onSubmit } = useSignUpForm(closeDrawer);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <h4 className="font-normal text-sm text-center text-white py-6 -z-10">Register</h4>
      <Input
        control={form.control}
        label="Username"
        name="name"
        error={form.formState.errors.name?.message}
        register={form.register}
      />
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
      <div className="relative w-full mb-5">
        <FileInput
          title="Upload Avatar"
          setValue={form.setValue}
          register={form.register}
          name="avatar"
        />
      </div>
      <div className="mb-5">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span>
              <div className="w-[14px] h-[14px] mr-2 border-4 border-white border-b-transparent rounded-full inline-block animate-rotation"></div>
              Loading...
            </span>
          ) : (
            'Submit'
          )}
        </Button>
      </div>
      <span className="flex justify-center cursor-pointer text-white" onClick={toggleAuth}>
        Already have an account? Login.
      </span>
    </form>
  );
};
