// POST
// /auth/login
//
// GET
// /auth/refresh-token
//
// POST
// /auth/register
//
// POST
// /auth/forgot-password
//
// PATCH
// /auth/change-password

import axios from 'axios';

interface Login {
  email: string;
  password: string;
}

export const useLogin = () => {
  // const [] = useState();

  const fetch = (params: Login) => {
    axios.post('/auth/login', params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { fetch };
};

// export const useLogin = () => {
//   // const [] = useState();
//
//   const fetch = (params: Login) => {
//     axios.post('/auth/login', params).then((e) => {
//       console.log(e);
//     }).catch((e) => {
//       console.error(e);
//     });
//   };
//
//   return { fetch };
// };
