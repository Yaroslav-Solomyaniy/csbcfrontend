import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ModalWindow from '../../../components/common/ModalWindow';
import { IGroupEditParams } from '../../../hooks/useGroups';
import { useGroupContext } from '../../../context/group';
import ModalInput from '../../../components/common/ModalInput';
import SelectCurator from '../../../components/common/Select/SelectCurator';
import ModalControlButtons from '../../../components/common/ModalControlButtons';
import { useMessagesContext } from '../../../context/useMessagesContext';
import { IEditModal } from '../../../types';
import { LettersAndNumbersEnUa, NumbersAndLettersEn, OnlyNumbers } from '../../../types/regExp';
import SelectSemester from '../../../components/common/Select/SelectSemester';
import SelectReason from '../../../components/common/Select/SelectReason';
import Table from '../../../components/common/table';
import { ITableHeader } from '../../../components/common/table/TableHeader';
import { ITableRowItem } from '../../../components/common/table/TableBody';

interface typeFormData{
  rating: number | null;
  reason: number;
}

const formInitialData:typeFormData = {
  rating: null,
  reason: 1,
};

const dataHeader: ITableHeader[] = [
  { id: 1, label: 'Предмет' },
  { id: 2, label: 'Дата' },
  { id: 3, label: 'Оцінка' },
  { id: 2, label: 'Причина зміни' },
  { id: 3, label: 'Хто змінив' },
];

export const TeacherRatingHistory = ({ modalActive, closeModal, Id }: IEditModal): JSX.Element => {
  const { addInfo } = useMessagesContext();
  const [formData, setFormData] = useState<typeFormData>(formInitialData);
  const [dataRow, setDataRow] = useState<ITableRowItem[]>([]);
  const [isSubmitted, setIsSubmited] = useState(false);

  const handleClose = () => {
    setIsSubmited(false);
    setFormData(formInitialData);
    closeModal();
  };

  const onSubmit = (e: React.FormEvent | undefined) => {
    e?.preventDefault?.();
    setIsSubmited(true);
  };

  /* useEffect(() => {
    handleClose();
    if (groupEdit?.data) {
      addInfo(`Група: ${getGroupId?.data?.name} з номером наказу:
      ${getGroupId?.data?.orderNumber} успішно відредагована.`);
    }
  }, [groupEdit?.data]);

  useEffect(() => {
    if (Id) {
      getGroupId?.getGroupId({ id: `${Id}` });
    }
  }, [Id]); */

  return (
    <ModalWindow modalTitle="Історія змін оцінок" active={modalActive} closeModal={handleClose}>
      <div className={styles.infoBlock}>
        <Table
          dataHeader={dataHeader}
          dataRow={dataRow}
          gridColumns={styles.columns}
        />
      </div>
      <ModalControlButtons
        handleClose={handleClose}
        onSubmit={(e) => undefined}
        isOffSubmit
        cancelButtonText="Назад"
      />
    </ModalWindow>
  );
};

export default TeacherRatingHistory;
