import { ChatMessage } from "./chat.store";

// Realistic names and context
const USERS = {
  "user-001": { name: "Rajesh Kumar", initials: "RK" },
  "user-002": { name: "Priya Sharma", initials: "PS" },
  "user-003": { name: "Amit Patel", initials: "AP" },
  "user-004": { name: "Deepika Singh", initials: "DS" },
  "user-005": { name: "Vikram Rao", initials: "VR" },
  "user-006": { name: "Ananya Verma", initials: "AV" },
  "user-007": { name: "Rohan Gupta", initials: "RG" },
  "user-008": { name: "Neha Nair", initials: "NN" },
  "user-009": { name: "Arjun Desai", initials: "AD" },
  "user-010": { name: "Sanjana Reddy", initials: "SR" },
};

const MESSAGE_TEMPLATES = {
  "650e8400-e29b-41d4-a716-446655440001": [
    // Power & Energy Crisis - Realistic discussion thread
    "We need to urgently transition to renewable energy sources like solar and wind. Our current strategy is failing.",
    "Completely agree with the need for transition. The current coal dependency is unsustainable and harmful to our environment.",
    "I propose investing in hydroelectric power plants in the northern regions. We have great potential there that's being wasted.",
    "Good point about hydro. However, we also need to address transmission losses first. Grid modernization is critical - we need smart distribution systems.",
    "Solar panels should be mandated on all government buildings by 2025. This could serve as an example for private sector adoption.",
    "I support the solar mandate. Additionally, battery storage technology needs significant government funding and incentives.",
    "Storage is crucial but expensive. Why aren't we focusing more on geothermal energy potential? It's reliable baseload power.",
    "Geothermal has merit but requires specific geological conditions. The energy deficit is causing massive economic losses across industries. We need action on multiple fronts.",
    "Absolutely. Community-based renewable energy cooperatives could be a solution. They've worked well in other countries.",
    "Local solutions are good but won't solve our national crisis. We should implement energy efficiency standards for all new constructions as a baseline.",
    "All good points. Peak load management is being ignored in our planning. We lose so much during peak hours due to poor management.",
    "On peak load - private sector participation in renewable energy is essential. Government alone cannot fund this transition.",
    "Private sector will only come if there are clear incentives. Time to sunset coal subsidies and redirect those funds to clean energy development.",
    "Smart idea! Smart meters could reduce energy waste by 20-30%. This should be implemented in all urban centers immediately.",
    "Implementation won't work without trained personnel. Capacity building for technicians in renewable energy sector is urgent.",
    "Hiring challenge is real. Cross-border power trading could ease our energy deficit. We should negotiate with neighboring countries.",
    "Trading could work short-term but we need domestic capacity. Rooftop solar schemes should target low-income households. Equity matters.",
    "Excellent social angle. We're also losing money on transmission and distribution inefficiencies. Need immediate infrastructure audit.",
    "After all this discussion, should we revisit nuclear? Investment in nuclear energy should be reconsidered safely with proper safeguards.",
    "Perhaps, but let's focus on renewable first. Education on energy conservation must start from schools. Future generations need awareness.",
  ],
  "650e8400-e29b-41d4-a716-446655440002": [
    // Road Infrastructure
    "Our highway system is in terrible condition - potholes everywhere.",
    "Need to prioritize road maintenance over new highway projects.",
    "Public transportation integration with road planning is missing.",
    "Urban congestion costs our economy billions annually.",
    "Cycling infrastructure would reduce vehicle congestion significantly.",
    "Toll collection systems need modernization and transparency.",
    "Road safety measures are inadequate - speed limits aren't enforced.",
    "Bridge maintenance budgets are consistently underfunded.",
    "We need dedicated freight corridors to separate trucks from cars.",
    "Pedestrian walkways are missing on many major roads.",
    "Traffic management through AI-powered signals could ease congestion.",
    "Rural road connectivity should be a development priority.",
    "Accident blackspots need immediate intervention.",
    "Road width standards aren't enforced in urban areas.",
    "Pothole repair should be a regular maintenance cycle.",
    "Emergency lanes are being used for parking - enforcement needed.",
    "Last-mile connectivity in villages is still inadequate.",
    "Highway construction should include environmental impact assessments.",
    "Quality of construction materials is often compromised.",
    "Road expansion shouldn't come at the cost of green spaces.",
  ],
  "650e8400-e29b-41d4-a716-446655440003": [
    // Air Pollution
    "Industrial emissions are the primary source of air pollution.",
    "We must implement stricter vehicular emission standards immediately.",
    "Burning crop residue contributes significantly to seasonal pollution spikes.",
    "Air quality monitoring stations are inadequate - need more data.",
    "Public awareness campaigns on pollution impacts are lacking.",
    "Green spaces and urban forests help reduce pollution naturally.",
    "Manufacturing units should be relocated away from residential areas.",
    "Real-time air quality data should be made publicly accessible.",
    "Diesel vehicles should be phased out gradually.",
    "Industrial chimney height regulations aren't being enforced.",
    "Alternate fuels like CNG should be subsidized for vehicles.",
    "Air purifiers in schools and hospitals should be mandatory.",
    "Construction site dust management is often ignored.",
    "Pollution during festivals needs stricter control measures.",
    "Vehicle emission testing should be mandatory every 6 months.",
    "Factory inspections for emission compliance are too infrequent.",
    "Youth engagement in tree-planting drives is essential.",
    "Pollution masks shouldn't be a solution - we need prevention.",
    "Data transparency on emission sources is crucial.",
    "Inter-state pollution cooperation agreements are needed.",
  ],
  "650e8400-e29b-41d4-a716-446655440004": [
    // Water Scarcity
    "Groundwater depletion is reaching critical levels in many regions.",
    "Water harvesting systems should be promoted in every household.",
    "Agricultural practices need major reforms to conserve water.",
    "Dams and reservoirs are not being maintained properly.",
    "Wastewater treatment and reuse can significantly reduce scarcity.",
    "Illegal water extraction for industries must be stopped.",
    "Monsoon water capture could solve seasonal shortages.",
    "Irrigation efficiency improvements could save billions of liters.",
    "Water pricing should reflect its true value and scarcity.",
    "Groundwater regulation needs stricter enforcement.",
    "Lake restoration projects have shown great results.",
    "Borewell regulations require immediate government attention.",
    "Water infrastructure in rural areas is severely inadequate.",
    "Industrial water consumption needs strict monitoring.",
    "Saline water treatment technology should be promoted.",
    "Water distribution loss due to leakage is unacceptable.",
    "Public awareness about water conservation is insufficient.",
    "Desalination plants could be viable in coastal regions.",
    "Integrated river basin management is long overdue.",
    "Watershed development should be a national priority.",
  ],
  "650e8400-e29b-41d4-a716-446655440005": [
    // Education Quality
    "Teacher shortage is critical - we need immediate recruitment.",
    "Curriculum needs updating to include modern skills.",
    "Online education infrastructure in rural areas is non-existent.",
    "Student-teacher ratio in schools is dangerously high.",
    "Vocational training should be integrated with academic education.",
    "Exam-focused education is killing creativity and innovation.",
    "School infrastructure, especially sanitation, needs urgent improvement.",
    "Quality of teaching in government schools varies widely.",
    "Digital literacy programs should be mandatory for all students.",
    "Scholarship programs for underprivileged students need expansion.",
    "Teacher training and development is underfunded.",
    "Accessibility for differently-abled students is minimal.",
    "Private school fees are becoming unaffordable for middle class.",
    "Research funding for higher education is insufficient.",
    "Sports and extracurricular activities are being sidelined.",
    "English medium instruction is widening the inequality gap.",
    "Assessment methods should focus on practical skills.",
    "Dropout rates remain unacceptably high in rural areas.",
    "International collaboration in academia should increase.",
    "Early childhood education deserves more focus and funding.",
  ],
  "650e8400-e29b-41d4-a716-446655440006": [
    // Healthcare Access
    "Rural healthcare facilities are severely underfunded and understaffed.",
    "Infant and maternal mortality rates remain unacceptably high.",
    "Medical education capacity needs significant expansion.",
    "Essential medicines are being sold at exorbitant prices.",
    "Mental health services are almost non-existent in rural areas.",
    "Universal health coverage implementation is still incomplete.",
    "Vaccination programs coverage in remote areas is poor.",
    "Hospital beds and equipment in government facilities are outdated.",
    "Telemedicine could bridge the rural-urban healthcare gap.",
    "Disease surveillance systems need modernization.",
    "Healthcare workers face safety issues and inadequate training.",
    "Insurance schemes should cover more preventive care.",
    "Nutritional programs for children need better targeting.",
    "Communicable disease control requires inter-state coordination.",
    "Specialist doctors are concentrated only in urban centers.",
    "Hospital hygiene standards vary significantly.",
    "Patient data management systems are archaic.",
    "Generic medicines should be promoted and regulated.",
    "Emergency response systems in villages need improvement.",
    "Health education for basic hygiene is inadequate.",
  ],
  "650e8400-e29b-41d4-a716-446655440007": [
    // Unemployment
    "Job creation in formal sector is declining year-on-year.",
    "Skill gaps between education and job market are widening.",
    "Manufacturing sector could absorb millions if properly supported.",
    "Self-employment should be encouraged through better financing.",
    "Youth entrepreneurship programs need more government support.",
    "Labor laws are outdated for the gig economy.",
    "Women's participation in workforce remains critically low.",
    "Migration for jobs is placing stress on urban infrastructure.",
    "Agricultural transformation requires support for farmers.",
    "Tourism sector has huge employment potential.",
    "Start-up ecosystem needs better investment mechanisms.",
    "Digital skills training should reach grassroots level.",
    "Wage growth isn't keeping pace with inflation.",
    "Unemployment insurance doesn't adequately protect workers.",
    "Apprenticeship programs need revival and scaling.",
    "Informal sector workers need better social protection.",
    "Urban planning should include livelihood considerations.",
    "Foreign companies should hire local talent.",
    "Creative industries have been largely neglected.",
    "Collective bargaining rights for workers need strengthening.",
  ],
  "650e8400-e29b-41d4-a716-446655440008": [
    // Corruption
    "Government transparency mechanisms remain weak.",
    "Public fund auditing processes need complete overhaul.",
    "Whistleblower protection laws aren't adequately implemented.",
    "Competitive bidding procedures are often circumvented.",
    "Conflict of interest rules for officials are too lenient.",
    "Digital governance can significantly reduce corruption.",
    "Asset declaration and verification of officials is insufficient.",
    "Awareness of anti-corruption laws among citizens is low.",
    "Land allotment procedures involve massive red tape.",
    "Customs procedures provide opportunities for bribery.",
    "Construction project oversight is critically weak.",
    "Public procurement transparency is still lacking.",
    "Political party funding lacks proper regulation.",
    "Penalty for corruption isn't severe enough as deterrent.",
    "Case disposal in anti-corruption courts is very slow.",
    "International cooperation on asset recovery is needed.",
    "Real-time financial tracking of government contracts required.",
    "Citizen participation in governance oversight should increase.",
    "Media freedom to report corruption should be protected.",
    "Integrity in elections requires stronger enforcement mechanisms.",
  ],
  "650e8400-e29b-41d4-a716-446655440009": [
    // Natural Disasters
    "Disaster preparedness in vulnerable regions is inadequate.",
    "Early warning systems for floods need wider coverage.",
    "Emergency response infrastructure is poorly distributed.",
    "Climate change is intensifying natural disasters.",
    "Cyclone shelters aren't properly equipped or maintained.",
    "Displacement and rehabilitation after disasters is slow.",
    "Insurance products for disaster victims should be subsidized.",
    "Weather forecasting accuracy needs improvement.",
    "Earthquake-resistant construction standards aren't enforced.",
    "Community-based disaster management programs work well.",
    "Water harvesting reduces drought impacts significantly.",
    "Landslide-prone areas need better monitoring systems.",
    "Disaster drills in communities should be mandatory.",
    "Post-disaster agricultural support is insufficient.",
    "Livestock insurance for farmers should be expanded.",
    "Forest management could reduce natural disaster impacts.",
    "Urban areas need better flood management infrastructure.",
    "Cross-border disaster coordination agreements are essential.",
    "Traditional knowledge in disaster management is being ignored.",
    "Climate adaptation strategies should guide all development.",
  ],
  "650e8400-e29b-41d4-a716-446655440010": [
    // Child Labor
    "Child labor laws enforcement remains very weak.",
    "Poverty is the root cause driving child labor.",
    "Education accessibility is key to reducing child labor.",
    "Hazardous work by children must be completely eliminated.",
    "Agricultural sector accounts for highest child labor.",
    "Family support programs could enable school enrollment.",
    "Child labor investigations and prosecutions are too few.",
    "Rehabilitation programs for rescued children need funding.",
    "Awareness about child rights among communities is low.",
    "Migrant families are most vulnerable to child labor.",
    "Manufacturing sector needs stricter labor compliance audits.",
    "Supply chain transparency should include labor practices.",
    "NGOS doing grassroots work need government support.",
    "Child labor in domestic work is often invisible.",
    "Night schooling options could help working children learn.",
    "Penalties for employers involved in child labor are weak.",
    "Skill training programs should target vulnerable youth.",
    "International cooperation on child labor standards is weak.",
    "Monitoring and accountability mechanisms are insufficient.",
    "Community incentive programs encourage school attendance.",
  ],
};

function generateMockMessages(chatId: string): ChatMessage[] {
  const templates = MESSAGE_TEMPLATES[chatId as keyof typeof MESSAGE_TEMPLATES] || [];
  const messages: ChatMessage[] = [];

  templates.forEach((text, index) => {
    const userId = Object.keys(USERS)[index % Object.keys(USERS).length];
    const now = new Date();
    const createdAt = new Date(now.getTime() - (20 - index) * 60 * 1000); // Spread over 20 minutes

    messages.push({
      messageId: `msg-${chatId}-${index + 1}`,
      chatId,
      userId,
      messageText: text,
      isSolution: Math.random() > 0.8, // 20% chance
      upvoteCount: Math.floor(Math.random() * 15),
      downvoteCount: Math.floor(Math.random() * 3),
      totalVotes: 0, // Will be calculated
      isDeleted: false,
      createdAt,
      updatedAt: createdAt,
    });
  });

  return messages;
}

export function generateAllMockMessages(): ChatMessage[] {
  const chatIds = Object.keys(MESSAGE_TEMPLATES);
  const allMessages: ChatMessage[] = [];

  chatIds.forEach((chatId) => {
    allMessages.push(...generateMockMessages(chatId));
  });

  return allMessages;
}

export { USERS };
