import Journal from "@/components/blocks/journal/journal";
import { apiServer } from "@/lib/api-server";

export default async function JournalWrapperServer() {
  let dreams = [];
  let emotions = [];
  
  try {
    dreams = await apiServer.get("journal/dream");
    emotions = await apiServer.get("journal/emotion");  
  } catch (err) {
    console.error("Erro ao buscar sonhos:", err.message);
  }

  return <Journal initialDreams={dreams} initialEmotions={emotions} />;
}
