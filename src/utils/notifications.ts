import { toast } from 'react-hot-toast';
import i18n from './i18n/i18n';

export const showNoteSearchRequest = (
  promise: Promise<unknown>,
  // resolveFunc: void,
  // rejectFunc: void,
  value: string
) => {
  toast.promise(
    promise,
    {
      loading: i18n.t('searching'),
      success: () => {
        // resolveFunc;
        return `${i18n.t('search')} "${value}" ${i18n.t('completed')}!`;
      },
      error: () => {
        // rejectFunc;
        return i18n.t('searchError');
      }
    },
    {
      success: {
        duration: 1000
      },
      error: {
        duration: 3000,
        icon: '😢'
      }
    }
  );
};

export const showNoteSameWordForSearch = () => {
  toast(i18n.t('sameRequest'), {
    duration: 1000
  });
};

export const showNoteLogin = (promise: Promise<unknown>) => {
  toast.promise(
    promise,
    {
      loading: i18n.t('Please wait..'),
      success: i18n.t('successfullyLogged'),
      error: i18n.t('loginError')
    },
    {
      success: {
        duration: 3000,
        icon: '🔥'
      },
      error: {
        duration: 3000,
        icon: '😢'
      }
    }
  );
};

export const showNoteSaveParams = (promise: Promise<unknown>) => {
  toast.promise(
    promise,
    {
      loading: i18n.t('Please wait..'),
      success: i18n.t('Successfully saved'),
      error: i18n.t('saveParamsError')
    },
    {
      success: {
        duration: 1000,
        icon: '🔥'
      },
      error: {
        duration: 1000,
        icon: '😢'
      }
    }
  );
};
