type GetMeRequest = void;

type GetMeResponse = User;

type EditMeRequest = {
  firstName: string;
  lastName: string;
};

type EditMeResponse = User;
