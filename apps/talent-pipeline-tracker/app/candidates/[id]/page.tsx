'use client';

import Link from 'next/link';
import { useEffect, useState, use } from 'react';
import { HealthCoreAPI } from '../../../services/api';
import { Candidate, CandidateNote, CandidateStatus, PipelineStage } from '../../../types';

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export default function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [notes, setNotes] = useState<CandidateNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState<string>('');

  useEffect(() => {
    async function loadCandidateData() {
      try {
        setLoading(true);
        const candidateData = await HealthCoreAPI.getRecordById(id);
        setCandidate(candidateData);
        const notesData = await HealthCoreAPI.getNotes(id);
        setNotes(notesData);
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Error al cargar los datos del candidato.'));
      } finally {
        setLoading(false);
      }
    }
    loadCandidateData();
  }, [id]);

  const handleUpdateField = async (fields: Partial<Candidate>) => {
    if (!candidate) return;
    try {
      const updated = await HealthCoreAPI.patchRecord(id, fields);
      setCandidate(updated);
    } catch (err: unknown) {
      alert(`Error al actualizar el registro: ${getErrorMessage(err, 'Error desconocido')}`);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      const savedNote = await HealthCoreAPI.addNote(id, newNote);
      setNotes([...notes, savedNote]);
      setNewNote('');
    } catch (err: unknown) {
      alert(`No se pudo agregar la nota: ${getErrorMessage(err, 'Error desconocido')}`);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await HealthCoreAPI.deleteNote(id, noteId);
      setNotes(notes.filter((n) => n.id !== noteId));
    } catch (err: unknown) {
      alert(`No se pudo eliminar la nota: ${getErrorMessage(err, 'Error desconocido')}`);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Cargando expediente clinico-laboral...</div>;
  }

  if (error || !candidate) {
    return (
      <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error || 'Candidato no encontrado.'}
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl space-y-6 bg-slate-50 p-6">
      <Link href="/" className="text-sm font-semibold text-teal-600 hover:underline">
        &lt;- Volver al Listado Principal
      </Link>

      <div className="flex flex-col justify-between gap-4 rounded-xl border bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{candidate.name}</h1>
          <p className="text-sm text-slate-500">
            {candidate.role} - {candidate.location}, {candidate.country}
          </p>
        </div>
        <div className="flex gap-3">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Estado</label>
            <select
              value={candidate.status}
              onChange={(e) => handleUpdateField({ status: e.target.value as CandidateStatus })}
              className="rounded-lg border bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-950"
            >
              <option value="active">Active</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Etapa</label>
            <select
              value={candidate.stage}
              onChange={(e) => handleUpdateField({ stage: e.target.value as PipelineStage })}
              className="rounded-lg border bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-950"
            >
              <option value="applied">Applied</option>
              <option value="screening">Screening</option>
              <option value="clinical_technical">Clinical / Technical</option>
              <option value="compliance_check">Compliance Check</option>
              <option value="offer">Offer</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm md:col-span-1">
          <h2 className="border-b pb-2 text-lg font-bold text-slate-900">Informacion de Contacto</h2>
          <div>
            <span className="block text-xs font-semibold uppercase text-slate-400">Email</span>
            <span className="text-sm font-medium text-slate-900">{candidate.email}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold uppercase text-slate-400">Telefono</span>
            <span className="text-sm font-medium text-slate-900">{candidate.phone}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold uppercase text-slate-400">
              Anos de experiencia
            </span>
            <span className="text-sm font-medium text-slate-900">
              {candidate.years_of_experience} anos
            </span>
          </div>
          <div className="space-y-2 pt-2">
            <a
              href={candidate.linkedin}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg bg-blue-50 py-2 text-center text-xs font-bold text-blue-700 hover:bg-blue-100"
            >
              Ver Perfil LinkedIn
            </a>
            <a
              href={candidate.cv_url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg bg-emerald-50 py-2 text-center text-xs font-bold text-emerald-700 hover:bg-emerald-100"
            >
              Abrir Curriculum Vitae
            </a>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm md:col-span-2">
          <h2 className="border-b pb-2 text-lg font-bold text-slate-900">
            Notas de Seguimiento Corporativo
          </h2>

          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe un comentario sobre el cumplimiento o entrevista..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1 rounded-lg border bg-slate-50 px-3 py-2 text-sm text-slate-950 focus:bg-white focus:outline-teal-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Anadir
            </button>
          </form>

          <div className="space-y-3 pt-2">
            {notes.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-400">
                No hay anotaciones registradas para este postulante.
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-start justify-between rounded-lg border bg-slate-50 p-3"
                >
                  <div>
                    <p className="text-sm text-slate-800">{note.content}</p>
                    <span className="font-mono text-[10px] text-slate-400">
                      {new Date(note.created_at).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="px-2 py-1 text-xs font-bold text-red-500 hover:text-red-700"
                  >
                    Borrar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}