import { checkingFinish, login, logout } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";

describe("Pruebas en el authReducer", () => {
  const initialState = {
    checking: true,
  };

  test("Debe de retornar el estado por defecto", () => {
    const state = authReducer(initialState, "cualquier cosa");
    expect(state).toEqual(initialState);
  });

  test("Debe de loguear con los datos establecidos", () => {
    const user = { uid: "123", name: "Fernando" };
    const action = login(user);
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      checking: false,
      ...user,
    });
  });

  test('Debe de finalizar el checking', () => {
      const action = checkingFinish();
      const state = authReducer(initialState, action);
      expect(state).toEqual({
          checking: false
      })
  })

  test('Debe de realizar el logout', () => {
    const user = { uid: "123", name: "Fernando", checking: false};
    const action = logout();
    const state = authReducer(user, action);
    expect(state).toEqual({
        checking: false
    })
  })
  
  
});
