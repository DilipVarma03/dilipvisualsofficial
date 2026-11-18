import {
  Enquiry,
  ServiceItem,
  PricingPackage,
  WebsiteContent
} from '../types';
import { api } from './api';
import {
  initialServices,
  initialPricingPackages,
  initialWebsiteContent
} from './mockData';

const STORAGE_KEYS = {
  ENQUIRIES: 'dv_enquiries_v2',
  SERVICES: 'dv_services_v2',
  PRICING: 'dv_pricing_v2',
  CONTENT: 'dv_content_v2'
};

function getLocalData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage save error:', e);
  }
}

// 1. Services
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await api.getServices();
    if (res.services && res.services.length) {
      const mapped = res.services.map((s: any) => ({
        ...s,
        deliverables: typeof s.deliverables === 'string' ? JSON.parse(s.deliverables) : s.deliverables,
        suitableFor: typeof s.suitableFor === 'string' ? JSON.parse(s.suitableFor) : s.suitableFor
      }));
      setLocalData(STORAGE_KEYS.SERVICES, mapped);
      return mapped;
    }
  } catch {}
  return getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
}

// 2. Pricing Packages
export async function getPricingPackages(): Promise<PricingPackage[]> {
  try {
    const res = await api.getPricing();
    if (res.packages && res.packages.length) {
      const mapped = res.packages.map((p: any) => ({
        ...p,
        packageName: p.name || p.packageName,
        inrPrice: p.startingPriceINR || p.inrPrice,
        usdPrice: p.startingPriceUSD || p.usdPrice,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
      }));
      setLocalData(STORAGE_KEYS.PRICING, mapped);
      return mapped;
    }
  } catch {}
  return getLocalData<PricingPackage[]>(STORAGE_KEYS.PRICING, initialPricingPackages);
}

// 3. Website Content
export async function getWebsiteContent(): Promise<WebsiteContent> {
  try {
    const res = await api.getContent();
    if (res.content) {
      setLocalData(STORAGE_KEYS.CONTENT, res.content);
      return res.content;
    }
  } catch {}
  return getLocalData<WebsiteContent>(STORAGE_KEYS.CONTENT, initialWebsiteContent);
}

// 4. Create Enquiry
export async function createEnquiry(enquiryInput: Omit<Enquiry, 'id' | 'enquiryId' | 'status' | 'createdAt'>): Promise<Enquiry> {
  try {
    const res = await api.submitEnquiry(enquiryInput);
    if (res.enquiryNumber) {
      const created: Enquiry = {
        ...enquiryInput,
        id: res.enquiryNumber,
        enquiryNumber: res.enquiryNumber,
        enquiryId: res.enquiryNumber,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      const current = getLocalData<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
      setLocalData(STORAGE_KEYS.ENQUIRIES, [created, ...current]);
      return created;
    }
  } catch {}

  const refNumber = `DV-ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const fallbackEnquiry: Enquiry = {
    ...enquiryInput,
    id: refNumber,
    enquiryId: refNumber,
    enquiryNumber: refNumber,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  const current = getLocalData<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
  setLocalData(STORAGE_KEYS.ENQUIRIES, [fallbackEnquiry, ...current]);
  return fallbackEnquiry;
}
