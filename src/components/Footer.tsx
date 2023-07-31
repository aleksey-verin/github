import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation();
  return <footer>{t('footerText')}</footer>;
};

export default Footer;
