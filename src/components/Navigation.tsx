import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Administrators from '../pages/Administrators/Administrators';
import Students from '../pages/Students/Students';
import '../style/Navigation.css';
import Group from '../pages/Group/Group';
import Curators from '../pages/Сurators/Curators';
import Teachers from '../pages/Teachers/Teachers';
import Subjects from '../pages/Subjects/Subjects';
import Estimates from '../pages/Estimates/Estimates';
import VotingAdmin from '../pages/Voting_admin/VotingAdmin';
import IndividualPlan from '../pages/Individual_plan/IndividualPlan';
import VotingStudents from '../pages/Voting_students/VotingStudents';
import Teacher from '../pages/Teacher/Teacher';
import Curator from '../pages/Сurator/Curator';
// import svgAdministrators from '../images/Administrators.svg';
// import svgGroup from '../images/Group.svg';
// import svgStudents from '../images/Students.svg';

function Navigation() {
  /* куратор */
  return (
    <BrowserRouter>
      <div className="navAndContent">
        <div className="navMenu">
          <Link className="link" to="/">Групи</Link>
          <Link className="link" to="/students">Студенти</Link>
          <Link className="link" to="/curators">Куратори</Link>
          <Link className="link" to="/teachers">Викладачі</Link>
          <Link className="link" to="/subjects">Предмети</Link>
          <Link className="link" to="/estimates">Оцінки</Link>
          <Link className="link" to="/voting_admin">Голосування адмінка</Link>
          <Link className="link" to="/administrators">Адміністратори</Link>
          {/* студент */}
          <Link className="link" to="/individual_plan">Індивідуальний план</Link>
          <Link className="link" to="/voting_students">Голосування студенти</Link>
          {/* викладач */}
          <Link className="link" to="/teacher">Викладач</Link>

          <Link className="link" to="/curator">Куратор</Link>
        </div>
        <Routes>
          <Route index element={<Group />} />
          <Route path="/students" element={<Students />} />
          <Route path="/curators" element={<Curators />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/estimates" element={<Estimates />} />
          <Route path="/voting_admin" element={<VotingAdmin />} />
          <Route path="/administrators" element={<Administrators />} />

          <Route path="/individual_plan" element={<IndividualPlan />} />
          <Route path="/voting_students" element={<VotingStudents />} />

          <Route path="/teacher" element={<Teacher />} />

          <Route path="/curator" element={<Curator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Navigation;
