import TitlePage from '../../components/TitlePage';
import Selectoptions from '../../UI/Select/Selectoptions';
import '../../style/Pages/Group.css';

const options = [
  { value: '1P20', label: '1П-20' },
  { value: '2P20', label: '2П-20' },
];
const name = [
  { value: 'YaroslavSolomianiy', label: "Ярослав Солом'яний" },
  { value: 'VadimSirenko', label: 'Вадим Сіренко' },
];
const formstudy = [
  { value: 'fulltime', label: 'Очна' },
  { value: 'parttime', label: 'Заочна' },
];

function Group() {
  return (
    <div>
      <TitlePage title="Групи" />
      <div className="filter__block">
        <Selectoptions select={options} placeholder="Групи" />
        <Selectoptions select={name} placeholder="ПІБ" />
        <Selectoptions select={formstudy} placeholder="Форма навчання" />
      </div>
    </div>
  );
}

export default Group;
