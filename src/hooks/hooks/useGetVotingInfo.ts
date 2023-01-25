import { useEffect } from 'react';
import moment from 'moment/moment';
import { MessagesContext } from '../../context/All/Messages';
import { AuthContext } from '../../context/All/AuthContext';
import { useGetStudentVotingInfo } from '../api/student/useGetInfo';

const useGetVotingInfo = () => {
  const { roleStudent } = AuthContext();
  const { getStudentVotingInfo, votingInfo } = useGetStudentVotingInfo();
  const { addVoting, addWarning } = MessagesContext();

  useEffect(() => {
    if (roleStudent) {
      getStudentVotingInfo();
    }
  }, [roleStudent]);

  useEffect(() => {
    if (votingInfo) {
      const nowDate = new Date();
      const startDate = moment(votingInfo.startDate).toDate() || nowDate;
      const endDate = moment(votingInfo.endDate).toDate() || nowDate;
      const DayToStartVoting = +moment(Math.abs(nowDate.getTime() - startDate.getTime())).format('D') - 1;

      if (nowDate < startDate) {
        addWarning(votingInfo.isRevote
          ? `Скоро розпочнеться переголосування. До початку переголосування ${DayToStartVoting} - дні(-в).`
          : `Скоро розпочнеться голосування. До початку голосування ${DayToStartVoting} - дні(-в).`);
      }
      if (nowDate > startDate && nowDate < endDate) {
        addVoting(votingInfo.isRevote
          ? 'Розпочалось переголосування. Ви можете змінити свій вибір.'
          : 'Розпочалось голосування. Ви можете обрати вибіркові предмети.');
      }
    }
  }, [votingInfo]);
};

export default useGetVotingInfo;
