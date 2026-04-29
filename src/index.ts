import { Cita, Paciente } from './types/models';
import { buscarPacientePorId, filtrarPorRegion } from './utils/collections';
import { generarReporteEjecutivo } from './utils/transformations';
import { validarCitaHealthCore, validarCumplimiento } from './utils/validations';

const pacientes: Paciente[] = [
    {
        id: 1,
        nombre: 'Alice Carter',
        pais: 'US',
        email: 'alice.carter@healthcore.com',
        fechaRegistro: new Date('2026-04-01'),
        cumpleGDPR: false,
    },
    {
        id: 2,
        nombre: 'Oliver Whitfield',
        pais: 'UK',
        email: 'oliver.whitfield@healthcore.co.uk',
        fechaRegistro: new Date('2026-04-02'),
        cumpleGDPR: true,
    },
    {
        id: 3,
        nombre: 'Amina Okonkwo',
        pais: 'UK',
        email: 'amina.okonkwo@healthcore.co.uk',
        fechaRegistro: new Date('2026-04-03'),
        cumpleGDPR: true,
    },
];

const citasDePrueba: Cita[] = [
    {
        id: 101,
        pacienteId: 1,
        clinicaId: 1,
        especialidad: 'General',
        fecha: new Date(Date.now() + 1000 * 60 * 60 * 24),
        estado: 'no-show',
        costo: 150,
        facturaPagada: false,
        rechazadaPorSeguro: false,
    },
    {
        id: 102,
        pacienteId: 2,
        clinicaId: 1,
        especialidad: 'Dental',
        fecha: new Date(Date.now() + 1000 * 60 * 60 * 48),
        estado: 'completada',
        costo: 200,
        facturaPagada: true,
        rechazadaPorSeguro: true,
    },
    {
        id: 103,
        pacienteId: 3,
        clinicaId: 2,
        especialidad: 'Pediatria',
        fecha: new Date(Date.now() + 1000 * 60 * 60 * 72),
        estado: 'programada',
        costo: 120,
        facturaPagada: false,
        rechazadaPorSeguro: false,
    },
];

const pacientesOrdenados = [...pacientes].sort((a, b) => a.id - b.id);

console.log('--- VALIDACIONES DE CUMPLIMIENTO ---');
console.log('Paciente UK cumple GDPR (id=2):', validarCumplimiento(pacientes[1]));
console.log('Paciente US (id=1):', validarCumplimiento(pacientes[0]));

console.log('--- VALIDACIONES DE CITA ---');
console.log('Cita valida (id=101):', validarCitaHealthCore(citasDePrueba[0]));

console.log('--- BUSQUEDA BINARIA ---');
console.log('Paciente id=3:', buscarPacientePorId(pacientesOrdenados, 3));

console.log('--- FILTRO REGIONAL ---');
console.log('Citas UK:', filtrarPorRegion(citasDePrueba, pacientes, 'UK').length);
console.log('Citas US:', filtrarPorRegion(citasDePrueba, pacientes, 'US').length);

console.log('--- REPORTE PARA LA DRA. OKONKWO ---');
console.log(generarReporteEjecutivo(citasDePrueba));