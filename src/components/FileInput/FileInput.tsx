import React, { useRef, useState } from 'react';
import { FieldPath, FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useFileInput } from '../../hooks/useFileInput';

interface FileInputProps<T extends FieldValues> {
    setValue: UseFormSetValue<T>;
    register: UseFormRegister<T>;
    name: FieldPath<T>;
    title: string;
}
const FileInput = <T extends FieldValues>({ setValue, register, name, title }: FileInputProps<T>) => {
    const { selectedFile, inputRef, handleOnChange, removeFile } = useFileInput({ setValue, name });

    return (
        <>
            <div className="flex justify-center">
                <input
                    type="file"
                    className="hidden"
                    ref={(e) => {
                        inputRef.current = e;
                        register(name);
                    }}
                    onChange={handleOnChange}
                />
                <button
                    type="button"
                    className="text-xl font-medium flex items-center gap-4 text-white border-none cursor-pointer transition-all duration-300 group hover:text-buttonPink"
                    onClick={() => inputRef.current?.click()}
                >
                    <svg
                        height="24px"
                        width="24px"
                        version="1.1"
                        id="Capa_1"
                        className="stroke-current text-white group-hover:text-buttonPink transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 490.955 490.955"
                        fill="currentColor"
                    >
                        <path
                            id="XMLID_448_"
                            d="M445.767,308.42l-53.374-76.49v-20.656v-11.366V97.241c0-6.669-2.604-12.94-7.318-17.645L312.787,7.301
                        C308.073,2.588,301.796,0,295.149,0H77.597C54.161,0,35.103,19.066,35.103,42.494V425.68c0,23.427,19.059,42.494,42.494,42.494
                        h159.307h39.714c1.902,2.54,3.915,5,6.232,7.205c10.033,9.593,23.547,15.576,38.501,15.576c26.935,0-1.247,0,34.363,0
                        c14.936,0,28.483-5.982,38.517-15.576c11.693-11.159,17.348-25.825,17.348-40.29v-40.06c16.216-3.418,30.114-13.866,37.91-28.811
                        C459.151,347.704,457.731,325.554,445.767,308.42z M170.095,414.872H87.422V53.302h175.681v46.752
                        c0,16.655,13.547,30.209,30.209,30.209h46.76v66.377h-0.255v0.039c-17.685-0.415-35.529,7.285-46.934,23.46l-61.586,88.28
                        c-11.965,17.134-13.387,39.284-3.722,57.799c7.795,14.945,21.692,25.393,37.91,28.811v19.842h-10.29H170.095z M410.316,345.771
                        c-2.03,3.866-5.99,6.271-10.337,6.271h-0.016h-32.575v83.048c0,6.437-5.239,11.662-11.659,11.662h-0.017H321.35h-0.017
                        c-6.423,0-11.662-5.225-11.662-11.662v-83.048h-32.574h-0.016c-4.346,0-8.308-2.405-10.336-6.271
                        c-2.012-3.866-1.725-8.49,0.783-12.07l61.424-88.064c2.189-3.123,5.769-4.984,9.57-4.984h0.017c3.802,0,7.38,1.861,9.568,4.984
                        l61.427,88.064C412.04,337.28,412.328,341.905,410.316,345.771z"
                        />
                    </svg>
                    {title}
                </button>
            </div>
            {selectedFile && (
                <div className="mt-2 flex justify-between">
                    <p className="text-buttonPink text-xl font-medium">{selectedFile.name}</p>
                    <button onClick={removeFile} type="button" className="border-none outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="text-buttonPink"
                            width="24px"
                            height="24px"
                            fill="currentColor"
                        >
                            <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default FileInput;