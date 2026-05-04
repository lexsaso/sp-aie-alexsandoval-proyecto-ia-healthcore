import { Cita, Paciente } from '../types/models';

/**
 * Validar que una cita sea consistente según reglas de HealthCore.
 * Reglas:
 * - Si está programada, la fecha no puede ser pasada.
 * - El costo debe ser no-negativo.
 */
export const validarCitaHealthCore = (cita: Cita): boolean => {
    const ahora: Date = new Date();

    if (cita.estado === 'programada' && cita.fecha < ahora) return false;
    if (cita.costo < 0) return false;

    return true;
};

/**
 * Validar cumplimiento de regulaciones (GDPR/HIPAA).
 * Regla:
 * - Si el paciente es de UK, debe cumplir con GDPR.
 */
export const validarCumplimiento = (paciente: Paciente): boolean => {
    if (paciente.pais === 'UK' && !paciente.cumpleGDPR) return false;
    return true;
};

/**
 * Validación extendida de datos del paciente (HealthCore).
 * Verifica campos básicos requeridos:
 * - Nombre: mínimo 3 caracteres
 * - Email: debe contener @
 * - País: solo US o UK permitidos (según CONTEXT)
 */
export const validatePatient = (paciente: Partial<Paciente>): boolean => {
    // Validar nombre: requerido y mínimo 3 caracteres
    if (!paciente.nombre || paciente.nombre.length < 3) return false;

    // Validar email: requerido y debe contener @
    if (!paciente.email || !paciente.email.includes('@')) return false;

    // Validar país: requerido y debe ser un valor válido (US o UK)
    if (!paciente.pais || (paciente.pais !== 'US' && paciente.pais !== 'UK')) return false;

    return true;
};