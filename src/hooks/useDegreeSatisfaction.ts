import { SatisfactionOption } from "../components/StartRating"
import api from "../services/api"

export async function fetchSatisfactionDegrees() {
    const response = await api.get<SatisfactionOption[]>("/get/satisfaction")
    return response.data
}