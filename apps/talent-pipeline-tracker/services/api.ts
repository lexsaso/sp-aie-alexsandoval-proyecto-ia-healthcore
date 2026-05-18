import { Candidate, CandidateInput, CandidateNote } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type UnknownRecord = Record<string, unknown>;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const detail =
      errorData && typeof errorData === 'object' && 'detail' in errorData
        ? String(errorData.detail)
        : `Error del servidor: ${response.status}`;
    throw new Error(detail);
  }
  if (response.status === 204) return {} as T;
  return response.json();
}

function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === 'object' && 'data' in value) {
    const inner = (value as UnknownRecord).data;
    if (Array.isArray(inner)) return inner as T[];
  }
  return [];
}

function mapStatusToInternal(status: unknown): Candidate['status'] {
  if (status === 'hired' || status === 'rejected' || status === 'active') return status;
  return 'active';
}

function mapStageToInternal(stage: unknown): Candidate['stage'] {
  if (
    stage === 'applied' ||
    stage === 'screening' ||
    stage === 'clinical_technical' ||
    stage === 'compliance_check' ||
    stage === 'offer'
  ) {
    return stage;
  }

  const normalized = String(stage || '').toLowerCase();
  if (normalized === 'pending') return 'applied';
  if (normalized === 'review') return 'screening';
  if (normalized.includes('interview')) return 'clinical_technical';
  if (normalized.includes('compliance') || normalized.includes('background')) {
    return 'compliance_check';
  }
  if (normalized === 'offer') return 'offer';
  return 'applied';
}

function mapStatusToApi(status: CandidateInput['status']): string {
  if (status === 'hired') return 'hired';
  if (status === 'rejected') return 'rejected';
  return 'in_progress';
}

function mapStageToApi(stage: CandidateInput['stage']): string {
  if (stage === 'applied') return 'pending';
  if (stage === 'screening') return 'review';
  if (stage === 'clinical_technical') return 'interview';
  if (stage === 'compliance_check') return 'compliance_check';
  return 'offer';
}

function mapRole(value: unknown): Candidate['role'] {
  if (
    value === 'Physician' ||
    value === 'Nurse Practitioner' ||
    value === 'Nurse' ||
    value === 'Medical Assistant' ||
    value === 'AI Engineer' ||
    value === 'Clinical Data Developer' ||
    value === 'Billing Specialist' ||
    value === 'Compliance Officer'
  ) {
    return value;
  }
  return 'Medical Assistant';
}

function mapLocation(value: unknown): Candidate['location'] {
  if (
    value === 'Austin' ||
    value === 'Florida' ||
    value === 'Georgia' ||
    value === 'London' ||
    value === 'Manchester'
  ) {
    return value;
  }
  return 'Austin';
}

function mapCountry(value: unknown): Candidate['country'] {
  if (value === 'US' || value === 'UK') return value;
  return 'US';
}

function mapRecordToCandidate(record: UnknownRecord): Candidate {
  return {
    id: String(record.id ?? ''),
    name: String(record.name ?? record.full_name ?? ''),
    email: String(record.email ?? ''),
    phone: String(record.phone ?? ''),
    role: mapRole(record.role ?? record.position),
    country: mapCountry(record.country),
    location: mapLocation(record.location),
    linkedin: String(record.linkedin ?? record.linkedin_url ?? ''),
    cv_url: String(record.cv_url ?? ''),
    years_of_experience: Number(record.years_of_experience ?? record.experience_years ?? 0),
    status: mapStatusToInternal(record.status),
    stage: mapStageToInternal(record.stage),
    created_at: String(record.created_at ?? record.applied_at ?? new Date().toISOString()),
  };
}

function mapCandidateToApiPayload(candidate: Partial<CandidateInput>): UnknownRecord {
  return {
    full_name: candidate.name,
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    position: candidate.role,
    role: candidate.role,
    country: candidate.country,
    location: candidate.location,
    linkedin_url: candidate.linkedin,
    linkedin: candidate.linkedin,
    cv_url: candidate.cv_url,
    experience_years: candidate.years_of_experience,
    years_of_experience: candidate.years_of_experience,
    status: candidate.status ? mapStatusToApi(candidate.status) : undefined,
    stage: candidate.stage ? mapStageToApi(candidate.stage) : undefined,
  };
}

export const HealthCoreAPI = {
  async getRecords(): Promise<Candidate[]> {
    const response = await fetch(`${API_BASE_URL}/records`, { cache: 'no-store' });
    const data = await handleResponse<unknown>(response);
    return asArray<UnknownRecord>(data).map(mapRecordToCandidate);
  },

  async getRecordById(id: string): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/records/${id}`, { cache: 'no-store' });
    const data = await handleResponse<UnknownRecord>(response);
    return mapRecordToCandidate(data);
  },

  async createRecord(candidate: CandidateInput): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapCandidateToApiPayload(candidate)),
    });
    const data = await handleResponse<UnknownRecord>(response);
    return mapRecordToCandidate(data);
  },

  async updateRecord(id: string, candidate: CandidateInput): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/records/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapCandidateToApiPayload(candidate)),
    });
    const data = await handleResponse<UnknownRecord>(response);
    return mapRecordToCandidate(data);
  },

  async patchRecord(id: string, updates: Partial<CandidateInput>): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/records/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapCandidateToApiPayload(updates)),
    });
    const data = await handleResponse<UnknownRecord>(response);
    return mapRecordToCandidate(data);
  },

  async deleteRecord(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/records/${id}`, { method: 'DELETE' });
    await handleResponse<void>(response);
  },

  async getNotes(recordId: string): Promise<CandidateNote[]> {
    const response = await fetch(`${API_BASE_URL}/records/${recordId}/notes`, {
      cache: 'no-store',
    });
    const data = await handleResponse<unknown>(response);
    return asArray<CandidateNote>(data);
  },

  async addNote(recordId: string, content: string): Promise<CandidateNote> {
    const response = await fetch(`${API_BASE_URL}/records/${recordId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    return await handleResponse<CandidateNote>(response);
  },

  async deleteNote(recordId: string, noteId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/records/${recordId}/notes/${noteId}`, {
      method: 'DELETE',
    });
    await handleResponse<void>(response);
  },
};