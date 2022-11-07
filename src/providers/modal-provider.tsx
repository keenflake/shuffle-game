import { AnimatePresence, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, FC, ReactNode, createContext, useCallback, useState } from 'react';

import { noop } from '../utils';

export interface ModalContextValue {
  show: (node: ReactNode) => void;
  hide: () => void;
}

export const ModalContext = createContext<ModalContextValue>({ show: noop, hide: noop });

export interface ModalProviderProps extends ComponentPropsWithoutRef<any> {}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [node, setNode] = useState<ReactNode>();

  const show = useCallback((node: ReactNode) => {
    setNode(node);
  }, []);

  const hide = useCallback(() => {
    setNode(null);
  }, []);

  return (
    <ModalContext.Provider value={{ show, hide }}>
      <AnimatePresence>
        {node && (
          <motion.div
            className="flex justify-center items-center fixed inset-0 z-10"
            initial={{ background: 'rgba(0, 0, 0, 0)' }}
            animate={{ background: 'rgba(0, 0, 0, 0.2)' }}
            exit={{ background: 'rgba(0, 0, 0, 0)' }}
            transition={{ type: 'keyframes', duration: 0.2 }}
            onClick={hide}
          >
            <motion.div
              className="w-full max-w-2xl px-6 py-4 bg-white rounded-xl"
              initial={{ y: -25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 25, opacity: 0 }}
              transition={{ type: 'keyframes', duration: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              {node}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </ModalContext.Provider>
  );
};
