import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch } from '../features/store';
import { uploadImageToCloudinary } from '../utils/common';
import { createUser } from '../features/user/userSlice';

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  avatar: z.union([
    z
      .custom<File>((file) => file instanceof File, {
        message: 'File is required',
      })
      .refine((file) => file.size > 0, {
        message: 'Please upload a file',
      }),
    z.string().optional(),
  ]),
  password: z.string().min(4),
});

export type UserSignUpFormValues = z.infer<typeof formSchema>;

export const useSignUpForm = (closeDrawer: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<UserSignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      avatar:
        'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D',
      password: '',
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: UserSignUpFormValues) => {
    setIsLoading(true);
    const avatarUrl = await uploadImageToCloudinary(data.avatar as File);
    if (!avatarUrl) {
      setIsLoading(false);
      return;
    }
    data.avatar = avatarUrl;
    dispatch(createUser(data))
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Something went wrong!');
        setIsLoading(false);
      });
    closeDrawer();
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};
