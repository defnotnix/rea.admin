import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export interface Agenda {
  id: number;
  title: string;
  category: string;
  status: string;
  phase: string;
  description: string;
  views: number;
  likes: number;
  shares: number;
}

// Demo data as fallback
const demoAgendas: Agenda[] = [
  {
    id: 1,
    title: "Constitutional Reform & Renewal Summit",
    category: "Politics",
    status: "ONGOING",
    phase: "Phase 2: Solution Draft Discussion",
    description:
      "A high-impact strategy session to reimagine the constitution for a new era-stronger amidst and built for the issues we care about today. Innovative ideas...",
    views: 22133,
    likes: 3.2,
    shares: 34,
  },
  {
    id: 2,
    title: "Environmental Protection Initiative",
    category: "Environment",
    status: "ONGOING",
    phase: "Phase 1: Problem Identification",
    description:
      "Collaborative effort to address environmental challenges across the nation...",
    views: 15420,
    likes: 2.8,
    shares: 28,
  },
  {
    id: 3,
    title: "Education System Modernization",
    category: "Education",
    status: "ONGOING",
    phase: "Phase 3: Implementation Planning",
    description:
      "Designing a comprehensive educational framework for the 21st century...",
    views: 18900,
    likes: 4.1,
    shares: 45,
  },
  {
    id: 4,
    title: "Nationwide Digital Complaint & Service Delay Reform",
    category: "Technology",
    status: "ONGOING",
    phase: "Phase 2: Solution Draft Discussion",
    description:
      "Building a unified digital platform for citizen grievances...",
    views: 12500,
    likes: 2.3,
    shares: 18,
  },
  {
    id: 5,
    title: "National Waste Management & Recycling Standardization",
    category: "Environment",
    status: "ONGOING",
    phase: "Phase 1: Problem Identification",
    description:
      "Comprehensive waste management strategy for all municipalities...",
    views: 14200,
    likes: 3.0,
    shares: 22,
  },
  {
    id: 6,
    title: "Public Transport Modernization & Integrated Network",
    category: "Infrastructure",
    status: "ONGOING",
    phase: "Phase 2: Solution Draft Discussion",
    description: "Creating an efficient public transportation ecosystem...",
    views: 16800,
    likes: 3.5,
    shares: 32,
  },
];

// Demo districts as fallback - All 77 districts of Nepal
const demoDistricts = [
  "Achham",
  "Arghakhanchi",
  "Bajhang",
  "Bajura",
  "Banke",
  "Bara",
  "Bardia",
  "Bhaktapur",
  "Chitwan",
  "Dailekh",
  "Dhading",
  "Dhanusha",
  "Doti",
  "Deukhuri",
  "Dolpa",
  "Gorkha",
  "Gulmi",
  "Gulariya",
  "Humla",
  "Ilam",
  "Jajarkot",
  "Janakpur",
  "Jhapa",
  "Jumla",
  "Kailali",
  "Kanchanpur",
  "Kaski",
  "Kathmandu",
  "Kavrepalanchok",
  "Khotang",
  "Lalitpur",
  "Lamjung",
  "Mahottari",
  "Makawanpur",
  "Morang",
  "Mugu",
  "Nawalpur",
  "Nepalgunj",
  "Nuwakot",
  "Okhaldhunga",
  "Palpa",
  "Panauti",
  "Panchthar",
  "Parsa",
  "Pokhara",
  "Pyuthan",
  "Ramechhap",
  "Rasuwa",
  "Rautahat",
  "Rolpa",
  "Rupandehi",
  "Salyan",
  "Sankhuwasabha",
  "Sarlahi",
  "Sindhuli",
  "Sindhupalchok",
  "Saptari",
  "Siraha",
  "Solukhumbu",
  "Sunsari",
  "Syangja",
  "Taplejung",
  "Udayapur",
];

/**
 * Fetch all agendas from the API
 * Falls back to demo data if API fails
 * @returns Promise<Agenda[]>
 */
export async function getAgendas(): Promise<Agenda[]> {
  try {
    const response = await axios.get<Agenda[]>(`${API_BASE}/api/agendas`);
    return response.data;
  } catch (error) {
    // Silently fall back to demo data if API is unavailable
    // Only log non-404 errors for debugging
    if (axios.isAxiosError(error) && error.response?.status !== 404) {
      console.error("Failed to fetch agendas from API:", error);
    }
    return demoAgendas;
  }
}

/**
 * Fetch all districts from the API
 * Falls back to demo districts if API fails
 * @returns Promise<string[]>
 */
export async function getDistricts(): Promise<string[]> {
  try {
    const response = await axios.get<string[]>(`${API_BASE}/api/districts`);
    return response.data;
  } catch (error) {
    // Silently fall back to demo data if API is unavailable
    // Only log non-404 errors for debugging
    if (axios.isAxiosError(error) && error.response?.status !== 404) {
      console.error("Failed to fetch districts from API:", error);
    }
    return demoDistricts.sort();
  }
}
