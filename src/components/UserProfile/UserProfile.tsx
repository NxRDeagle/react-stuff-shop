import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { useParams } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile';
import FileInput from '../FileInput/FileInput';

export const UserProfile = () => {
  const { id } = useParams();
  const { form, isLoading, isAvatarChanged, currentUser, onSubmit } = useUserProfile(id);

  if (!form) return null;

  return (
    <div className="bg-customGray p-5 rounded-md h-fit flex-1">
      <h3 className="text-white text-lg xs:text-2xl mb-5">
        Welcome to your profile {form.watch('name')}!
      </h3>
      <div className="flex flex-col  gap-5">
        <div className="relative">
          <img
            src={currentUser.avatar}
            className={`rounded-md w-full object-cover max-w-full h-full  ${
              isAvatarChanged ? 'opacity-60' : ''
            }`}
            alt=""
          />
          {isAvatarChanged && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[76px] h-[76px] border-4 border-white border-b-transparent rounded-full inline-block animate-rotation"></div>
            </div>
          )}
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 navInputHide:min-w-[344px]">
          <Input
            label="Username"
            name="name"
            control={form.control}
            register={form.register}
            error={form.formState.errors.name?.message}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            control={form.control}
            register={form.register}
            error={form.formState.errors.email?.message}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            control={form.control}
            register={form.register}
            error={form.formState.errors.password?.message}
          />
          <div className="relative w-full mb-5">
            <FileInput
              title="Upload Avatar"
              setValue={form.setValue}
              register={form.register}
              name="avatar"
            />
          </div>
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
        </form>
      </div>
    </div>
  );
};
