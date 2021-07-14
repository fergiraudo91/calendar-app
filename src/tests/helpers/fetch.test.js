import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe('Pruebas en el helper fetch', () => {
    let token;
    test('Fetch sin token debe de funcionar', async () => {
        const resp = await fetchSinToken('auth', {email: 'fergiraudo91@gmail.com', password: '07151405'}, 'POST');
        expect(resp instanceof Response).toBe(true);
        const body = await resp.json();
        expect(body.ok).toBe(true);
        token = body.token;
    });

    test('Fetch con token debe de funcionar', async () => {
        localStorage.setItem('token', token);
        const resp = await fetchConToken('events/60ec7651366b53022c151dd2', {}, "DELETE");
        const body = await resp.json();
        expect(body.msg).toBe("Ese evento no existe");
    });
    
})
