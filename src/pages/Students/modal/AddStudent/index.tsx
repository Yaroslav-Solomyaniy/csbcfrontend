import React, { useState } from 'react';
import styles from './index.module.scss';
import ModalWindow from '../../../../components/common/ModalWindow';
import Select from '../../../../components/common/Select';

interface IGroupCreateModal {
  closeModal: () => void;
  modalActive: boolean;
}

export const AddStudentsModal = ({ modalActive, closeModal }: IGroupCreateModal): JSX.Element => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    middleName: '',
    groupName: '',
    email: '',
    orderNumber: '',
    edeboId: '',
    isFullTime: true,
  });

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    // тут буде запрос
  };

  return (
    <ModalWindow modalTitle="Додавання студента" active={modalActive} closeModal={closeModal}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form__input}>
          <label className={styles.input__label}>Прізвище</label>
          <input
            className={styles.input__select}
            placeholder="Прізвище"
            value={formData.lastName}
            onChange={(event) => {
              setFormData({ ...formData, lastName: event.target.value });
            }}
          />
        </div>
        <div className={styles.form__input}>
          <label className={styles.input__label}>Ім'я</label>
          <input
            className={styles.input__select}
            placeholder="Ім'я"
            value={formData.firstName}
            onChange={(event) => {
              setFormData({ ...formData, firstName: event.target.value });
            }}
          />
        </div>
        <div className={styles.form__input}>
          <label className={styles.input__label}>По-Батькові</label>
          <input
            className={styles.input__select}
            placeholder="По-Батькові"
            value={formData.middleName}
            onChange={(event) => {
              setFormData({ ...formData, middleName: event.target.value });
            }}
          />
        </div>
        <div className={styles.form__input}>
          <label className={styles.input__label}>Дата народження</label>
          <input
            className={styles.input__select}
            placeholder="Дата народження"
            value={formData.dateOfBirth}
            onChange={(event) => {
              setFormData({ ...formData, dateOfBirth: event.target.value });
            }}
          />
        </div>
        <Select
          label="Група"
          options={[
            {
              value: '1Д-08',
              label: '1Д-08',
            },
          ]}
          value="abtbsd"
          onChange={() => undefined}
          placeholder="Оберіть групу"
          type="modal"
        />
        {/* /!* <div className={styles.form__input}> *!/ */}
        {/* /!*  <label className={styles.input__label}>Група</label> *!/ */}
        {/* /!*  <Select *!/ */}
        {/* /!*    className={styles.input__select} *!/ */}
        {/* /!*    options={[]} *!/ */}
        {/* /!*    placeholder="Група" *!/ */}
        {/* /!*    isClearable *!/ */}
        {/* /!*    value={formData.groupName} *!/ */}
        {/* /!*  /> *!/ */}
        {/* /!* </div> *!/ */}
        <div className={styles.form__input}>
          <label className={styles.input__label}>Номер наказу</label>
          <input
            className={styles.input__select}
            placeholder="Номер наказу"
            value={formData.orderNumber}
            onChange={(event) => {
              setFormData({ ...formData, orderNumber: event.target.value });
            }}
          />
        </div>
        <div className={styles.form__input}>
          <label className={styles.input__label}>ЄДЕБО</label>
          <input
            className={styles.input__select}
            placeholder="ЄДЕБО"
            value={formData.edeboId}
            onChange={(event) => {
              setFormData({ ...formData, edeboId: event.target.value });
            }}
          />
        </div>
        <div className={styles.form__input}>
          <label className={styles.input__label}>E-Mail</label>
          <input
            className={styles.input__select}
            placeholder="E-Mail"
            value={formData.email}
            onChange={(event) => {
              setFormData({ ...formData, email: event.target.value });
            }}
          />
        </div>
        <Select
          label="форма навчання"
          options={[
            {
              value: 1,
              label: 'true',
            },
            {
              value: 0,
              label: 'false',
            },
          ]}
          value={`${formData.isFullTime}`}
          onChange={() => undefined}
          placeholder="Оберіть форму навчання"
          type="modal"
        />
      </form>
      <div className={styles.modal__buttons}>
        <button
          type="button"
          className={styles.modal_revert}
          onClick={closeModal}
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

export default AddStudentsModal;
