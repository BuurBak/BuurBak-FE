'use client';

import { twMerge } from 'tailwind-merge';
import React from 'react';
import { Button, ButtonProps } from '@nextui-org/button';

export interface ExtraButtonProps extends ButtonProps {
    buttonVariant: 'primary' | 'secondary' | 'profile';
}

// Just an example of how we can use nextui to do a lot of the work in making components function.
// No need to come up with a Button Component ourselves.
export const NextUIBasedButton: React.FC<ExtraButtonProps> = ({
    className,
    variant,
    buttonVariant,
    ...props
}) => {
    const variantClass = {
        primary: 'bg-primary-100 hover:bg-primary-200 text-white h-12 px-7',
        secondary: 'bg-gray-200 text-black hover:bg-gray-300 h-12 px-7',
        profile: 'bg-transparant hover:text-orange-600 font-semibold'
    };

    return (
        <Button
            className={twMerge(variantClass[buttonVariant], className)}
            {...props}
        />
    );
};