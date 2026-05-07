import { buscarPacientePorId, filtrarPorRegion } from '../utils/collections';
import {
  busquedaBinaria,
  busquedaLineal,
  findPatientByName,
  sortPatientsByIdAsc,
  sortPatientsByIdDesc,
  sortPatientsByName,
  sortPatientsByNameDesc,
} from '../utils/search';
import { generarReporteEjecutivo } from '../utils/transformations';
import { validarCitaHealthCore, validarCumplimiento, validatePatient } from '../utils/validations';
import { Cita, Paciente } from '../types/models';

type TestCase = {
  name: string;
  run: () => void;
};

function assert(condition: unknown, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

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

const citas: Cita[] = [
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

const tests: TestCase[] = [
  {
    name: 'findPatientByName soporta case-insensitive',
    run: () => {
      const found = findPatientByName(pacientes, 'oliver whitfield');
      assert(found?.id === 2, 'Debio encontrar al paciente con id=2');
    },
  },
  {
    name: 'busquedas por id retornan null cuando no existe',
    run: () => {
      const sorted = sortPatientsByIdAsc(pacientes);
      assert(busquedaLineal(pacientes, 999) === null, 'Busqueda lineal debio retornar null');
      assert(busquedaBinaria(sorted, 999) === null, 'Busqueda binaria debio retornar null');
      assert(buscarPacientePorId(sorted, 999) === null, 'Busqueda binaria de collections debio retornar null');
    },
  },
  {
    name: 'ordenamientos por nombre e id funcionan en ambos sentidos',
    run: () => {
      const az = sortPatientsByName(pacientes).map((p) => p.nombre);
      const za = sortPatientsByNameDesc(pacientes).map((p) => p.nombre);
      const idAsc = sortPatientsByIdAsc(pacientes).map((p) => p.id);
      const idDesc = sortPatientsByIdDesc(pacientes).map((p) => p.id);

      assert(az[0] === 'Alice Carter' && az[2] === 'Oliver Whitfield', 'Orden A-Z invalido');
      assert(za[0] === 'Oliver Whitfield' && za[2] === 'Alice Carter', 'Orden Z-A invalido');
      assert(idAsc.join(',') === '1,2,3', 'Orden ID ascendente invalido');
      assert(idDesc.join(',') === '3,2,1', 'Orden ID descendente invalido');
    },
  },
  {
    name: 'validaciones de paciente y cumplimiento regulatorio',
    run: () => {
      assert(validatePatient(pacientes[0]) === true, 'Paciente valido fue rechazado');
      assert(validatePatient({ nombre: 'Al', email: 'a@b.com', pais: 'US' }) === false, 'Nombre corto debio fallar');
      assert(validatePatient({ nombre: 'John Doe', email: 'invalido', pais: 'US' }) === false, 'Email invalido debio fallar');
      assert(validarCumplimiento(pacientes[1]) === true, 'Paciente UK con GDPR=true debio cumplir');
      assert(
        validarCumplimiento({ ...pacientes[1], cumpleGDPR: false }) === false,
        'Paciente UK sin GDPR debio fallar',
      );
    },
  },
  {
    name: 'validacion de cita y filtrado por region',
    run: () => {
      assert(validarCitaHealthCore(citas[0]) === true, 'Cita valida fue rechazada');
      assert(
        validarCitaHealthCore({
          ...citas[2],
          estado: 'programada',
          fecha: new Date(Date.now() - 1000 * 60 * 60),
        }) === false,
        'Cita programada en el pasado debio fallar',
      );
      assert(validarCitaHealthCore({ ...citas[0], costo: -10 }) === false, 'Costo negativo debio fallar');

      const citasUk = filtrarPorRegion(citas, pacientes, 'UK');
      const citasUs = filtrarPorRegion(citas, pacientes, 'US');
      assert(citasUk.length === 2, 'Filtrado UK debio devolver 2 citas');
      assert(citasUs.length === 1, 'Filtrado US debio devolver 1 cita');
    },
  },
  {
    name: 'reporte ejecutivo calcula metricas esperadas',
    run: () => {
      const reporte = generarReporteEjecutivo(citas);
      assert(reporte !== null, 'Reporte no debio ser null');
      assert(reporte?.totalCitas === 3, 'Total de citas incorrecto');
      assert(reporte?.tasaNoShow === '33.33%', 'Tasa no-show incorrecta');
      assert(reporte?.tasaRechazo === '33.33%', 'Tasa rechazo incorrecta');
      assert(reporte?.ingresosNetos === '$200', 'Ingresos netos incorrectos');
      assert(generarReporteEjecutivo([]) === null, 'Reporte para lista vacia debio ser null');
    },
  },
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    test.run();
    console.log(`PASS: ${test.name}`);
    passed += 1;
  } catch (error) {
    console.error(`FAIL: ${test.name}`);
    if (error instanceof Error) {
      console.error(`  ${error.message}`);
    } else {
      console.error('  Error desconocido');
    }
    failed += 1;
  }
}

console.log(`\nResultado: ${passed}/${tests.length} pruebas pasaron.`);

if (failed > 0) {
  throw new Error(`Fallaron ${failed} prueba(s).`);
}