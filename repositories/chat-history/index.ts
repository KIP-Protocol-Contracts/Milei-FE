import axios from "axios";
import { milaiAPIClient } from "../apiClient";

interface IChatHistoryParam {
  session_id: string;
}

export interface IChatHistory {
  message: string;
  sender: string;
  created_at: string;
}

export async function getChatHistory(
  params: IChatHistoryParam
): Promise<IChatHistory[]> {
  try {
    const resp = await axios.get(
      `${process.env.MILEI_API_URL}/chat/history/${params.session_id}`
    );
    return resp.data.data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}
