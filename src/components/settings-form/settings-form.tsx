import { FieldArray, Form, Formik } from 'formik';
import { FC, useCallback, useContext } from 'react';

import { ModalContext } from '../../providers';
import { usePrizesStore } from '../../store';
import { Button } from '../button/button';
import { Icon } from '../icon';
import { TextField } from '../text-field';

interface SettingsFormValues {
  prizes: string[];
}

export const SettingsForm: FC = () => {
  const prizes = usePrizesStore(state => state.prizes);
  const setPrizes = usePrizesStore(state => state.setPrizes);

  const { hide } = useContext(ModalContext);

  const handleCloseClick = useCallback(() => {
    hide();
  }, [hide]);

  const handleSubmit = useCallback(
    (values: SettingsFormValues) => {
      setPrizes(values.prizes.filter(prize => !!prize));
      hide();
    },
    [setPrizes, hide],
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>Settings</h2>

        <button
          type="button"
          className="p-1 rounded-md transition-colors hover:bg-gray-200 active:bg-gray-300"
          onClick={handleCloseClick}
        >
          <Icon kind="close" className="w-8 h-8" />
          <span className="sr-only">Close settings window</span>
        </button>
      </div>

      <Formik initialValues={{ prizes }} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="mt-4">
            <FieldArray name="prizes">
              {arrayHelpers => (
                <>
                  {values.prizes.length > 0 ? (
                    <ul className="space-y-2">
                      {values.prizes.map((_, idx) => (
                        <li key={idx} className="flex space-x-2">
                          <TextField name={`prizes.${idx}`} />

                          <button
                            type="button"
                            className="px-3 rounded-md transition-colors hover:bg-gray-200 active:bg-gray-300"
                            onClick={() => arrayHelpers.remove(idx)}
                          >
                            <Icon kind="trash" className="w-5 h-5" />
                            <span className="sr-only">Remove {idx + 1} prize</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="my-6">Add prizes by clicking on "Add Prize" button</p>
                  )}
                  <div className="flex justify-between space-x-2 mt-6">
                    <Button type="button" onClick={() => arrayHelpers.push('')}>
                      Add Prize
                    </Button>

                    <Button type="submit" className="bg-dark-blue">
                      Save
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </>
  );
};
