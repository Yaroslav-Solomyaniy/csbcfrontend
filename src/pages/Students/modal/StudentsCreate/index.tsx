import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import { IStudents } from '../../../../hooks/useStudents';
import Select from '../../../../components/common/Select';
import Input from '../../../../components/common/Input';
import { useStudentsContext } from '../../../../context/students';
import { Option } from '../../../../types';
import SelectGroup from '../../../../components/common/SelectGroup';

interface IGroupCreateModal {
  closeModal: () => void;
  modalActive: boolean;
}

const formInitialData = {
  dateOfBirth: '',
  groupId: 0,
  user: {
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    role: 'student',
  },
  orderNumber: '',
  edeboId: '',
  isFullTime: true,
};

const selectValueDefault = {
  group: '',
  isFullTime: '',
};

export const StudentsCreateModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const { createStudents, getOptionsGroups } = useStudentsContext();

  const [formData, setFormData] = useState<IStudents>(formInitialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectValue, setSelectValue] = useState(selectValueDefault);

  useEffect(() => {
    getOptionsGroups?.getOptionsGroups();
  }, []);

  useEffect(() => {
    if (getOptionsGroups?.optionsGroups?.items.length) {
      setOptions(getOptionsGroups?.optionsGroups.items.map((group) => ({ value: group.id, label: group.name })));
    }
  }, [getOptionsGroups?.optionsGroups]);

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData(formInitialData);
    setSelectValue(selectValueDefault);
    closeModal();
  };

  useEffect(() => {
    setSelectValue({ ...selectValue, isFullTime: formData.isFullTime ? 'Денна' : 'Заочна' });
  }, [formData.isFullTime]);

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    if (
      formData.dateOfBirth
      && formData.groupId
      && formData.user.firstName
      && formData.user.lastName
      && formData.user.patronymic
      && formData.user.email
      && formData.orderNumber
      && formData.edeboId
    ) {
      createStudents?.addStudent(formData);
    }
  };

  return (
    <ModalWindow modalTitle="Додавання студента" active={modalActive} closeModal={handleClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          required
          label="Прізвище"
          placeholder="Прізвище"
          value={formData.user.lastName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, lastName: event.target.value } });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="Ім'я"
          placeholder="Ім'я"
          value={formData.user.firstName}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, firstName: event.target.value } });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="По-Батькові"
          placeholder="По-Батькові"
          value={formData.user.patronymic}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, patronymic: event.target.value } });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="Дата народження"
          placeholder="Дата народження"
          value={formData.dateOfBirth}
          onChange={(event) => {
            setFormData({ ...formData, dateOfBirth: event.target.value });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <SelectGroup
          type="modal"
          label="Група"
          placeholder="Група"
          onChange={(label: string) => {
            options.map((item) => {
              if (item.label === label) {
                setFormData({ ...formData, groupId: +item.value });
                setSelectValue({ ...selectValue, group: item.label });
              }

              return item;
            });
          }}
          value={selectValue.group}
          isClearable
          isSearchable
        />
        <Input
          required
          label="Номер наказу"
          placeholder="Номер наказу"
          value={formData.orderNumber}
          onChange={(event) => {
            setFormData({ ...formData, orderNumber: event.target.value });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="ЄДЕБО"
          placeholder="ЄДЕБО"
          value={formData.edeboId}
          onChange={(event) => {
            setFormData({ ...formData, edeboId: event.target.value });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Input
          required
          label="E-Mail"
          placeholder="E-Mail"
          value={formData.user.email}
          onChange={(event) => {
            setFormData({ ...formData, user: { ...formData.user, email: event.target.value } });
          }}
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
        <Select
          type="modal"
          label="форма навчання"
          required
          isSearchable
          isClearable
          options={[
            { value: 'Денна', label: 'Денна' },
            { value: 'Заочна', label: 'Заочна' },
          ]}
          value={selectValue.isFullTime}
          onChange={(value) => {
            setFormData({ ...formData, isFullTime: value === 'Денна' });
          }}
          placeholder="Оберіть форму навчання"
          error={isSubmitted && !formData.orderNumber ? 'Номер групи не введено' : ''}
        />
      </form>
      <div className={styles.modal__buttons}>
        <button
          type="button"
          className={styles.modal_revert}
          onClick={handleClose}
        >
          Відміна
        </button>
        <button
          type="button"
          className={styles.modal_submit}
          onClick={onSubmit}
        >
          Створити
        </button>
      </div>
    </ModalWindow>
  );
};

export default StudentsCreateModal;
