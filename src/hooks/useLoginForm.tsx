import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { AppDispatch } from '../features/store';
import { loginUser } from '../features/user/userSlice';
export type UserLoginFormValues = z.infer<typeof formSchema>;
const formSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(4),
});

export const useLoginForm = (closeDrawer: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<UserLoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: UserLoginFormValues) => {
    setIsLoading(true);
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        closeDrawer();
      })
      .catch(() => {
        toast.error('Something went wrong!');
        setIsLoading(false);
      });
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};
