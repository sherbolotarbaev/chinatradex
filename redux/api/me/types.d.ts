type GetMeRequest = void;

type GetMeResponse = User;

type EditMeRequest = {
  firstName: string;
  lastName: string;
  phone: string;
};

type EditMeResponse = User;
