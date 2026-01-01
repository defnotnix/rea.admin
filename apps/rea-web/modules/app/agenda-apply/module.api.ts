// API calls for agenda applications

interface AgendaApplyPayload {
  title: string;
  problemStatement: string;
  description: string;
  district: string;
}

export async function submitAgendaApplication(data: AgendaApplyPayload) {
  try {
    // TODO: Replace with actual API endpoint once backend is ready
    const response = await fetch("/api/agenda/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to submit agenda application:", error);
    throw error;
  }
}

export async function getRecords() {
  try {
    const response = await fetch("/api/agenda/apply");
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch agenda applications:", error);
    throw error;
  }
}
