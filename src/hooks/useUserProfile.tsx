import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '../features/store';
import { uploadImageToCloudinary } from '../utils/common';
import { updateUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  email: z.string().nullable(),
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
  password: z
    .string()
    .nullable()
    .refine((value) => value === null || value === '' || value.length >= 4, {
      message: 'Password must be at least 4 characters long or empty',
    }),
});

export type UpdateUserValues = z.infer<typeof formSchema>;

export const useUserProfile = (id: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const form = useForm<UpdateUserValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: Number(id),
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      avatar: currentUser?.avatar || '',
      password: undefined,
    },
  });

  useEffect(() => {
    if (!currentUser || currentUser.id !== Number(id)) {
      navigate('/');
    }
  }, [currentUser, id, navigate]);

  if (!currentUser || currentUser.id !== Number(id)) {
    return { form: null, isLoading, isAvatarChanged, onSubmit: () => {} };
  }

  const onSubmit = async (data: UpdateUserValues) => {
    const filteredData: UpdateUserValues = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== null && value !== undefined && value !== '',
      ),
    ) as UpdateUserValues;

    setIsLoading(true);
    if (filteredData.avatar !== undefined && currentUser.avatar !== filteredData.avatar) {
      setIsAvatarChanged(true);
      const avatarUrl = await uploadImageToCloudinary(filteredData.avatar as File);
      setIsAvatarChanged(false);
      if (!avatarUrl) {
        setIsLoading(false);
        toast.error('Error while uploading avatar!');
        return;
      }
      filteredData.avatar = avatarUrl;
      form.setValue('avatar', avatarUrl);
    }

    dispatch(updateUser(filteredData))
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error('Something went wrong while updating profile!');
      });
  };

  return {
    form,
    isLoading,
    isAvatarChanged,
    onSubmit,
    currentUser,
  };
};
