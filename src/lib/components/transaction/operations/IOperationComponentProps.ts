import type { ITranslation } from 'src/lib/i18n/ITranslation';

export default interface IOperationComponentProps {
    title: keyof ITranslation;
    operationItems: (
        | {
              title: keyof ITranslation;
              value: any;
              translatedValue?: keyof ITranslation;
          }
        | undefined
    )[];
}
