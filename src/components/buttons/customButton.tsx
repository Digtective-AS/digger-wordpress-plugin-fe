import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'flex items-center gap-2.5 rounded-[8px] text-sm ',
  {
    variants: {
      variant: {
        default:
          'bg-primary not:disabled:hover:bg-[#0a3a4b] text-white duration-200 disabled:opacity-50 duration-200 px-[20px] '
          + 'py-[8px] focus:outline-primary/50 focus:outline-[1px] focus:outline-offset-[3px] '
          + 'not:disabled:active:bg-opacity-80 ',
        outline:
          'not:disabled:border-gray border-2 bg-transparent text-primary hover:border-gray px-[20px]',
        icon:
          'h-[40px] w-[40px] grid place-content-center relative bg-primary px-0 border hover:bg-[#0a3a4b] '
          + 'hover:text-white',
        iconOutlined:
          'h-[40px] w-[40px] border bg-transparent px-0 duration-200 grid place-content-center enabled:hover:bg-dark '
          + 'hover:text-white enabled:active:bg-[#0a3a4b33] disabled:opacity-90 disabled:cursor-not-allowed',
      },
      sizeVariant: {
        none: '',
        default: 'px-[20px] py-[8px] ',
      },
    },
    defaultVariants: {
      variant: 'default',
      sizeVariant: 'none',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  dataCy?: string;
  loading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <button
      ref={ref}
      {...props}
      type={props.type || 'button'}
      disabled={props.disabled}
      className={cn(
        buttonVariants({ variant: props.variant, className: props.className }),
      )}
      style={{ ...props.style }}
      data-cy={props.dataCy}
    >
      {props.children}
    </button>
  ),
);

export { CustomButton, buttonVariants };
