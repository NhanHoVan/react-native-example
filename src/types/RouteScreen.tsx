export type RootStackParamList = {
  Login: {
    name: String;
  };
  SignUp: {
    name: String;
  };
  ForgotPassword: {
    name: String;
  };
  EmailVerify: {
    name: String;
  };
  Account: {
    name: String;
  };
  EditAccount: {
    name: String;
    param: {
      id: number;
      name: String;
      email: String;
      image: String;
    };
  };
  Home: {
    name: String;
  };
};
