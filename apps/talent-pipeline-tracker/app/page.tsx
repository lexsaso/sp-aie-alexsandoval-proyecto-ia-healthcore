'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { HealthCoreAPI } from '../services/api';
import { Candidate } from '../types';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Error al obtener registros.';
}

function TalentPipelineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const currentStatus = searchParams.get('status') || 'all';
  const currentStage = searchParams.get('stage') || 'all';

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const data = await HealthCoreAPI.getRecords();
        setCandidates(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const updateFilters = (key: 'status' | 'stage', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete(key);
    else params.set(key, value);
    router.push(`/?${params.toString()}`);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = currentStatus === 'all' || candidate.status === currentStatus;
    const matchesStage = currentStage === 'all' || candidate.stage === currentStage;
    return matchesSearch && matchesStatus && matchesStage;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="mb-8 flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">HealthCore Digital</h1>
          <p className="text-sm text-slate-500">Talent Pipeline Tracker - Panel de Control de Seleccion</p>
        </div>
        <Link href="/candidates/new" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700">
          + Nuevo Candidato
        </Link>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 rounded-xl border bg-white p-4 shadow-sm md:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Filtrar por Nombre o Email</label>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border bg-slate-50 px-3 py-2 text-sm text-slate-950 focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Estado</label>
          <select value={currentStatus} onChange={(e) => updateFilters('status', e.target.value)} className="w-full rounded-lg border bg-slate-50 px-3 py-2 text-sm text-slate-950 focus:outline-none">
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="hired">Contratados</option>
            <option value="rejected">Rechazados</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Etapa del Pipeline</label>
          <select value={currentStage} onChange={(e) => updateFilters('stage', e.target.value)} className="w-full rounded-lg border bg-slate-50 px-3 py-2 text-sm text-slate-950 focus:outline-none">
            <option value="all">Todas las etapas</option>
            <option value="applied">Aplicado</option>
            <option value="screening">Filtro inicial</option>
            <option value="clinical_technical">Entrevista Clinica/Tecnica</option>
            <option value="compliance_check">Verificacion Legal</option>
            <option value="offer">Oferta</option>
          </select>
        </div>
      </section>

      {loading && <p className="py-10 text-center text-slate-500">Cargando pipeline de seleccion...</p>}
      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

      {!loading && !error && (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b bg-slate-50 text-xs font-bold uppercase text-slate-700">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Rol</th>
                <th className="px-6 py-3">Ubicacion</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Etapa</th>
                <th className="px-6 py-3 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No se encontraron registros.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {c.name}
                      <div className="text-xs font-normal text-slate-400">{c.email}</div>
                    </td>
                    <td className="px-6 py-4">{c.role}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                      {c.location} ({c.country})
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          c.status === 'hired'
                            ? 'bg-green-100 text-green-800'
                            : c.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-600">{c.stage}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/candidates/${c.id}`} className="font-semibold text-teal-600 hover:underline">
                        Ver ficha -&gt;
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function TalentPipelinePage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Cargando modulo de busqueda...</div>}>
      <TalentPipelineContent />
    </Suspense>
  );
}
