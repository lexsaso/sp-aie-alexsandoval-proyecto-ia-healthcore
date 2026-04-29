import { CitaMedica, Paciente } from '../types/models';

export const validarPaciente = (paciente: Paciente): boolean => {
    const nombreValido = paciente.nombre.trim().length > 2;
    const edadValida = paciente.edad > 0 && paciente.edad < 120;
    return nombreValido && edadValida;
};

export const validarCita = (cita: CitaMedica): boolean => {
    const fechaValida = cita.fecha.getTime() > Date.now();
    const costoValido = cita.costo >= 0;
    return fechaValida && costoValido;
};