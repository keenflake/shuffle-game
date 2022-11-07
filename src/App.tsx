import { FC } from 'react';

import { Header } from './components/header';
import { Picker } from './components/picker';
import './index.css';
import { ModalProvider } from './providers';

export const App: FC = () => {
  return (
    <ModalProvider>
      <Header />
      <div className="mt-4">
        <Picker />
      </div>
    </ModalProvider>
  );
};
