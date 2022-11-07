import { FC, useCallback, useContext } from 'react';

import logo from '../../assets/logo.svg';
import { ModalContext } from '../../providers';
import { Container } from '../container';
import { Icon } from '../icon';
import { SettingsForm } from '../settings-form';

export const Header: FC = () => {
  const { show } = useContext(ModalContext);

  const handleSettingsClick = useCallback(() => {
    show(<SettingsForm />);
  }, [show]);

  return (
    <header className="py-8">
      <Container className="flex justify-between items-center">
        <a href="https://quantori.com" target="_blank" className="w-48">
          <img src={logo} alt="logo" />
        </a>

        <button
          type="button"
          className="p-1 rounded-md transition-colors hover:bg-gray-200 active:bg-gray-300"
          onClick={handleSettingsClick}
        >
          <Icon kind="cog" className="w-8 h-8" />
          <span className="sr-only">Open Settings</span>
        </button>
      </Container>
    </header>
  );
};
