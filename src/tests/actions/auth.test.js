import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import Swal from "sweetalert2";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe("Pruebas en las acciones del auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startlogin correcto", async () => {
    await store.dispatch(startLogin("fergiraudo91@gmail.com", "07151405"));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "60eb2b403f0af81670e5d70b",
        name: "Fernando",
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  test("El login debe de ser incorrecto", async () => {
    await store.dispatch(startLogin("fergiraudo91@gmail.com", "332225465"));
    let actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Contraseña incorrecta",
      "error"
    );

    await store.dispatch(startLogin("larararar@gmail.com", "14142135"));
    actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "No existe ese usuario",
      "error"
    );
  });

  test('startChecking correcto', async () => {
      await store.dispatch(startChecking());
      const actions = store.getActions();
  })
  

  
});
