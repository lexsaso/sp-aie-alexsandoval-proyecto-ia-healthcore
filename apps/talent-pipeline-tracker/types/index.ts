export type HealthCoreCountry = 'US' | 'UK';
export type HealthCoreLocation =
  | 'Austin'
  | 'Florida'
  | 'Georgia'
  | 'London'
  | 'Manchester';

export type HealthCoreRole =
  | 'Physician'
  | 'Nurse Practitioner'
  | 'Nurse'
  | 'Medical Assistant'
  | 'AI Engineer'
  | 'Clinical Data Developer'
  | 'Billing Specialist'
  | 'Compliance Officer';

export type CandidateStatus = 'active' | 'hired' | 'rejected';
export type PipelineStage =
  | 'applied'
  | 'screening'
  | 'clinical_technical'
  | 'compliance_check'
  | 'offer';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: HealthCoreRole;
  country: HealthCoreCountry;
  location: HealthCoreLocation;
  linkedin: string;
  cv_url: string;
  years_of_experience: number;
  status: CandidateStatus;
  stage: PipelineStage;
  created_at: string;
}

export interface CandidateNote {
  id: string;
  record_id: string;
  content: string;
  created_at: string;
}

export interface CandidateInput {
  name: string;
  email: string;
  phone: string;
  role: HealthCoreRole;
  country: HealthCoreCountry;
  location: HealthCoreLocation;
  linkedin: string;
  cv_url: string;
  years_of_experience: number;
  status: CandidateStatus;
  stage: PipelineStage;
}