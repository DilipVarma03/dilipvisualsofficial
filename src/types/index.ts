export type UserRole = 'OWNER' | 'TEAM_MEMBER' | 'CLIENT' | 'super_admin' | 'admin' | 'project_manager' | 'team_member' | 'client';

export interface ClientProfileData {
  id?: string;
  businessName?: string;
  website?: string;
  industry?: string;
  taxId?: string;
  billingAddress?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface TeamMemberData {
  id?: string;
  jobTitle?: string;
  department?: string;
  bio?: string;
  skills?: string;
  activeProjectsCount?: number;
}

export interface UserProfile {
  id: string;
  uid?: string;
  name: string;
  email: string;
  googleId?: string | null;
  profileImage?: string | null;
  photoURL?: string;
  avatarUrl?: string;
  phone?: string;
  country?: string;
  role: UserRole;
  isEmailVerified?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string | null;
  accountStatus?: 'active' | 'disabled';
  clientProfile?: ClientProfileData | null;
  teamMember?: TeamMemberData | null;
}

export type EnquiryStatus = 'new' | 'contacted' | 'in_discussion' | 'converted' | 'archived';

export interface Enquiry {
  id: string;
  enquiryNumber?: string;
  enquiryId?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  country: string;
  service: string;
  package?: string;
  budget?: string;
  budgetRange?: string;
  expectedDeadline?: string;
  description: string;
  preferredContact: 'whatsapp' | 'email' | 'phone' | 'call';
  status: EnquiryStatus;
  internalNotes?: string;
  assignedTeamId?: string;
  createdAt: string;
}

export type ProjectStatus =
  | 'Enquiry Received'
  | 'Discussion'
  | 'Quotation Sent'
  | 'Awaiting Approval'
  | 'Payment Pending'
  | 'Confirmed'
  | 'In Progress'
  | 'Under Review'
  | 'Review'
  | 'Revision'
  | 'Revision Required'
  | 'Completed'
  | 'Delivered'
  | 'Cancelled';

export interface ProjectDeliverable {
  id: string;
  title?: string;
  fileURL?: string;
  fileUrl?: string;
  fileName: string;
  originalName?: string;
  fileType: string;
  fileSize?: string;
  downloadCount?: number;
  uploadedAt?: string;
  createdAt?: string;
  status?: 'pending_review' | 'approved' | 'revision_requested';
  reviewNotes?: string;
  category?: string;
  accessLevel?: string;
}

export interface ProjectReferenceFile {
  id: string;
  fileName: string;
  originalName?: string;
  fileURL?: string;
  fileUrl?: string;
  fileSize?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  createdAt?: string;
}

export interface ProjectUpdateItem {
  id: string;
  title: string;
  content: string;
  authorName: string;
  progressAtUpdate: number;
  isClientVisible: boolean;
  createdAt: string;
}

export interface ProjectMessage {
  id: string;
  messageId?: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  message: string;
  attachmentURL?: string;
  attachmentName?: string;
  createdAt: string;
}

export interface RevisionRequestItem {
  id: string;
  projectId: string;
  clientId: string;
  title: string;
  description: string;
  timecodes?: string;
  priority: 'normal' | 'urgent';
  referenceFileUrl?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  adminResponse?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  projectId: string;
  projectNumber?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  client?: UserProfile;
  projectName: string;
  title?: string;
  service: string;
  serviceType?: string;
  description: string;
  status: ProjectStatus;
  progress: number; // 0 - 100
  assignedTeam?: string;
  startDate?: string;
  deliveryDate?: string;
  budget?: any;
  currency?: 'INR' | 'USD' | string;
  quotationAmount?: number;
  quotationNotes?: string;
  deliverables: ProjectDeliverable[];
  referenceFiles: ProjectReferenceFile[];
  files?: ProjectDeliverable[];
  updates?: ProjectUpdateItem[];
  revisionRequests?: RevisionRequestItem[];
  quotations?: Quotation[];
  invoices?: Invoice[];
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  enquiryId?: string;
  projectId?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  title: string;
  validUntil?: string;
  subtotal: number;
  discount: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
  currency: string;
  terms?: string;
  notes?: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  acceptedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  items?: QuotationItem[];
  project?: {
    id: string;
    title: string;
    projectNumber: string;
    status: string;
  };
  client?: UserProfile;
  createdAt: string;
  updatedAt?: string;
}

export interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface PaymentRecord {
  id: string;
  paymentNumber: string;
  invoiceId: string;
  clientId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionRef?: string;
  status: string;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId?: string;
  quotationId?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate?: string;
  subtotal: number;
  discount: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  currency: string;
  paymentTerms?: string;
  status: 'unpaid' | 'partially_paid' | 'paid' | 'overdue';
  paidAt?: string;
  notes?: string;
  items?: InvoiceItem[];
  payments?: PaymentRecord[];
  project?: {
    id: string;
    title: string;
    projectNumber: string;
  };
  client?: UserProfile;
  createdAt: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  serviceId?: string;
  slug?: string;
  title: string;
  subtitle?: string;
  description: string;
  deliverables: string[] | string;
  suitableFor: string[] | string;
  category?: string;
  startingPriceINR?: number;
  startingPriceUSD?: number;
  icon: string;
  active?: boolean;
  displayOrder?: number;
}

export interface PricingPackage {
  id: string;
  packageId?: string;
  name?: string;
  packageName?: string;
  category?: string;
  service?: string;
  description: string;
  startingPriceINR?: number;
  startingPriceUSD?: number;
  inrPrice?: number;
  usdPrice?: number;
  isCustomQuote?: boolean;
  billingCycle?: string;
  popular?: boolean;
  isRecommended?: boolean;
  features: string[] | string;
  revisions?: string;
  deliveryTime?: string;
  ctaText?: string;
  active?: boolean;
  displayOrder?: number;
}

export interface InAppNotification {
  id: string;
  notificationId?: string;
  userId?: string | null;
  title: string;
  message: string;
  link?: string;
  type?: string;
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  activityId?: string;
  performedBy?: string;
  userName?: string;
  performedByEmail?: string;
  action: string;
  targetId?: string;
  entityId?: string;
  targetType?: string;
  entityType?: string;
  details?: string;
  createdAt: string;
}

export interface WebsiteContent {
  announcement?: string;
  announcementText?: string;
  heroHeadline?: string;
  heroTitle?: string;
  heroSubheading?: string;
  heroSubtitle?: string;
  agencyName?: string;
  tagLine?: string;
  agencyPhone?: string;
  contactPhone?: string;
  agencyEmail?: string;
  contactEmail?: string;
  agencyAddress?: string;
  locationAddress?: string;
  whatsappNumber?: string;
  gstNumber?: string;
  founderName?: string;
  founderRole?: string;
  founderBio?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
}
