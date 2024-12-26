import { useState, useRef } from 'react';
import { UseFormSetValue, FieldValues, PathValue, Path, FieldPath } from 'react-hook-form';

interface UseFileInputProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  name: FieldPath<T>;
}

export const useFileInput = <T extends FieldValues>({ setValue, name }: UseFileInputProps<T>) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setValue(name, file as PathValue<T, Path<T>>);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setValue(name, '' as PathValue<T, Path<T>>);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return {
    selectedFile,
    inputRef,
    handleOnChange,
    removeFile,
  };
};
