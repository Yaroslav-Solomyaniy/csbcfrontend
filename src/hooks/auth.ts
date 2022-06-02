import axios from 'axios';

interface Login {
  email: string;
  password: string;
}

interface Register {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  uniqueItems: true;
  role: string;
  studentData: StudentData;
  password: string;
}

interface StudentData{
  dateOfBirth: string;
  group: string;
  orderNumber: string;
  edeboId: string;
  isFullTime: boolean;
}

interface ForgotPassword{
  login: string;
}

interface ChangePassword {
  password: string;
}

export const useLogin = () => {
  const [data, setData] = useState();

  const postLogin = (params: Login) => {
    axios.post('/auth/login', params).then((respons) => {
      setData(respons.data);
    }).catch((e) => {
      console.error(e);
    });
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('auth', data);
    }
  }, [data]);

  useEffect(() => {
    const auth = localStorage.getItem('auth');

    if (auth) {
      // @ts-ignore !!!!!!!!!!!!!!!!!!!!!!!!
      setData(auth);
    }
  }, []);

  return { data, postLogin };
};

export const useRefreshToken = () => {
  const authgGet = () => {
    axios.get('auth/refresh-token').then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { authgGet };
};

export const useRegister = () => {
  const postRegister = (params: Register) => {
    axios.post('/auth/register', params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { postRegister };
};

export const useForgotPassword = () => {
  const postForgotPassword = (params: ForgotPassword) => {
    axios.post('/auth/forgot-password', params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { postForgotPassword };
};

export const useChangePassword = () => {
  const patchChangePassword = (params: ChangePassword) => {
    axios.patch('/auth/change-password', params).then((e) => {
      console.log(e);
    }).catch((e) => {
      console.error(e);
    });
  };

  return { patchChangePassword };
};
