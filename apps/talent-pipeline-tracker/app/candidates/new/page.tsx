'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HealthCoreAPI } from '../../../services/api';
import {
  CandidateInput,
  HealthCoreRole,
  HealthCoreLocation,
  HealthCoreCountry,
} from '../../../types';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocurrio un error al guardar en la API.';
}

export default function NewCandidatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<CandidateInput>({
    name: '',
    email: '',
    phone: '',
    role: 'Physician',
    country: 'US',
    location: 'Austin',
    linkedin: '',
    cv_url: '',
    years_of_experience: 0,
    status: 'active',
    stage: 'applied',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.linkedin || !form.cv_url) {
      setError('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await HealthCoreAPI.createRecord(form);
      router.push('/');
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-slate-50 p-6">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Registrar Candidatura Clinica / Tecnica</h1>
      <p className="mb-6 text-sm text-slate-500">
        Anade perfiles para mitigar el tiempo de contratacion de la red HealthCore.
      </p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nombre Completo *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border px-3 py-2 text-sm text-slate-950 focus:outline-teal-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email Corporativo/Personal *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm text-slate-950 focus:outline-teal-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Telefono de Contacto *</label>
            <input
              type="text"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm text-slate-950 focus:outline-teal-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Puesto Solicitado</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as HealthCoreRole })}
              className="w-full rounded-lg border px-3 py-2 text-sm text-slate-950 focus:outline-none"
            >
              <option value="Physician">Medico (Physician)</option>
              <option value="Nurse Practitioner">Enfermero Especializado</option>
              <option value="Nurse">Enfermero/a</option>
              <option value="Medical Assistant">Auxiliar Medico</option>
              <option value="AI Engineer">Ingeniero de IA</option>
              <option value="Compliance Officer">Oficial de Cumplimiento</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Pais</label>
            <select
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value as HealthCoreCountry })}
              className="w-full rounded-lg border px-3 py-2 text-sm text-slate-950 focus:outline-none"
            >
              <option value="US">Estados Unidos (US)</option>
              <option value="UK">Reino Unido (UK)</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Sede de Trabajo</label>
            <select
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value as HealthCoreLocation })}
              className="w-full rounded-lg border px-3 py-2 text-sm text-slate-950 focus:outline-none"
            >
              <option value="Austin">Austin</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Enlace de LinkedIn *</label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm text-slate-950 focus:outline-teal-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Enlace al CV (Cloud/Drive) *
            </label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={form.cv_url}
              onChange={(e) => setForm({ ...form, cv_url: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm text-slate-950 focus:outline-teal-500"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Anos de Experiencia Relevante
          </label>
          <input
            type="number"
            min={0}
            value={form.years_of_experience}
            onChange={(e) =>
              setForm({ ...form, years_of_experience: Number(e.target.value) })
            }
            className="w-full rounded-lg border px-3 py-2 text-sm text-slate-950 focus:outline-teal-500"
          />
        </div>
        <div className="flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Crear Registro'}
          </button>
        </div>
      </form>
    </div>
  );
}