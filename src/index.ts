import { CitaMedica, Paciente } from './types/models';
import { busquedaBinaria, busquedaLineal } from './utils/search';
import { generarReporteCitas } from './utils/transformations';
import { validarCita, validarPaciente } from './utils/validations';

const pacientes: Paciente[] = [
    { id: 1, nombre: 'Ana Perez', edad: 34, genero: 'F', historialCompleto: true },
    { id: 2, nombre: 'Luis Gomez', edad: 41, genero: 'M', historialCompleto: false },
    { id: 3, nombre: 'Sam Torres', edad: 29, genero: 'Otro', historialCompleto: true },
];

const citas: CitaMedica[] = [
    {
        id: 101,
        pacienteId: 1,
        especialidad: 'Cardiologia',
        fecha: new Date(Date.now() + 1000 * 60 * 60 * 24),
        costo: 120,
    },
    {
        id: 102,
        pacienteId: 2,
        especialidad: 'Dermatologia',
        fecha: new Date(Date.now() + 1000 * 60 * 60 * 48),
        costo: 85,
    },
    {
        id: 103,
        pacienteId: 3,
        especialidad: 'Neurologia',
        fecha: new Date(Date.now() + 1000 * 60 * 60 * 72),
        costo: 200,
    },
];

const pacientesOrdenados = [...pacientes].sort((a, b) => a.id - b.id);

console.log('Paciente valido (id=1):', validarPaciente(pacientes[0]));
console.log('Cita valida (id=101):', validarCita(citas[0]));
console.log('Busqueda lineal paciente id=2:', busquedaLineal(pacientes, 2));
console.log('Busqueda binaria paciente id=3:', busquedaBinaria(pacientesOrdenados, 3));
console.log('Reporte citas:', generarReporteCitas(citas));