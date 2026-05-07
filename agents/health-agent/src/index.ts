import { Cita, Paciente } from './types/models';
import { buscarPacientePorId, filtrarPorRegion } from './utils/collections';
import { findPatientByName, sortPatientsByIdAsc, sortPatientsByIdDesc, sortPatientsByName, sortPatientsByNameDesc } from './utils/search';
import { generarReporteEjecutivo } from './utils/transformations';
import { validarCitaHealthCore, validarCumplimiento, validatePatient } from './utils/validations';

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

const pacientesOrdenados: Paciente[] = [...pacientes].sort((a, b) => a.id - b.id);

console.log('\n[REQUISITO 1] BUSQUEDA LINEAL POR NOMBRE');
console.log('Buscar "Alice Carter":', findPatientByName(pacientes, 'Alice Carter')?.nombre);
console.log('Buscar "oliver whitfield" (case-insensitive):', findPatientByName(pacientes, 'oliver whitfield')?.nombre);
console.log('Buscar "No Existe":', findPatientByName(pacientes, 'No Existe'));

console.log('\n[REQUISITO 2] BUSQUEDA BINARIA POR ID');
console.log('Paciente id=1:', buscarPacientePorId(pacientesOrdenados, 1)?.nombre);
console.log('Paciente id=3:', buscarPacientePorId(pacientesOrdenados, 3)?.nombre);
console.log('Paciente id=999 (no existe):', buscarPacientePorId(pacientesOrdenados, 999));

console.log('\n[REQUISITO 3] ORDENAMIENTO POR NOMBRE (ASCENDENTE A-Z)');
const pacientesAz: Paciente[] = sortPatientsByName(pacientes);
console.log('Orden A-Z:', pacientesAz.map((p) => p.nombre));

console.log('\n[REQUISITO 4] ORDENAMIENTO POR NOMBRE (DESCENDENTE Z-A)');
const pacientesZa: Paciente[] = sortPatientsByNameDesc(pacientes);
console.log('Orden Z-A:', pacientesZa.map((p) => p.nombre));

console.log('\n[REQUISITO 5] ORDENAMIENTO POR ID (ASCENDENTE)');
const pacientesIdAsc: Paciente[] = sortPatientsByIdAsc(pacientes);
console.log('IDs Ascendente:', pacientesIdAsc.map((p) => p.id));

console.log('\n[REQUISITO 6] ORDENAMIENTO POR ID (DESCENDENTE)');
const pacientesIdDesc: Paciente[] = sortPatientsByIdDesc(pacientes);
console.log('IDs Descendente:', pacientesIdDesc.map((p) => p.id));

console.log('\n[REQUISITO 7] VALIDACION DE DATOS DE PACIENTE');
console.log('Validar Alice Carter (valido):', validatePatient(pacientes[0]));
console.log('Validar nombre muy corto (invalido):', validatePatient({ nombre: 'Al', email: 'test@test.com', pais: 'US' }));
console.log('Validar email sin @ (invalido):', validatePatient({ nombre: 'John Doe', email: 'invalid', pais: 'US' }));
console.log('Validar pais fuera de rango (invalido):', validatePatient({ nombre: 'John Doe', email: 'john@test.com', pais: 'MX' as any }));

console.log('\n[REQUISITO 8] VALIDACION DE CUMPLIMIENTO (GDPR/HIPAA)');
console.log('Alice (US) cumple GDPR:', validarCumplimiento(pacientes[0]));
console.log('Oliver (UK con GDPR=true):', validarCumplimiento(pacientes[1]));

console.log('\n[REQUISITO 9] VALIDACION DE CITAS');
console.log('Cita 101 valida:', validarCitaHealthCore(citasDePrueba[0]));
console.log('Cita 102 valida:', validarCitaHealthCore(citasDePrueba[1]));

console.log('\n[REQUISITO 10] FILTRADO POR REGION (CUMPLIMIENTO GDPR/HIPAA)');
const citasUK: Cita[] = filtrarPorRegion(citasDePrueba, pacientes, 'UK');
const citasUS: Cita[] = filtrarPorRegion(citasDePrueba, pacientes, 'US');
console.log('Citas region UK:', citasUK.length, '(Pacientes: Oliver, Amina)');
console.log('Citas region US:', citasUS.length, '(Pacientes: Alice)');

console.log('\n[REQUISITO 11] AGREGACIONES - REPORTE EJECUTIVO');
const reporte = generarReporteEjecutivo(citasDePrueba);
console.log('Reporte Ejecutivo para Dra. Elena Rodriguez:');
console.log('  - Total de citas:', reporte?.totalCitas);
console.log('  - Tasa de no-show:', reporte?.tasaNoShow);
console.log('  - Tasa de rechazo por seguro:', reporte?.tasaRechazo);
console.log('  - Ingresos netos (facturadas):', reporte?.ingresosNetos);

console.log('\nSistema HealthCore - Todas las validaciones completadas exitosamente');