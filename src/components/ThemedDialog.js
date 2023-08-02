import React from 'react';
import { Dialog } from '@headlessui/react';

const ThemedDialog = React.forwardRef(({ width = 'max-w-md', ...props }, ref) => (
  <Dialog
    ref={ref}
    {...props}
    className={`fixed inset-0 z-10 overflow-y-auto ${props.className}`}
  >
    <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
    <div className="min-h-screen px-4 text-center">
      <div className={`inline-block w-full ${width} my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl ${props.innerClassName}`}>
        {props.children}
      </div>
    </div>
  </Dialog>
));

ThemedDialog.Title = Dialog.Title;
ThemedDialog.Description = Dialog.Description;
ThemedDialog.Overlay = Dialog.Overlay;

export default ThemedDialog;
