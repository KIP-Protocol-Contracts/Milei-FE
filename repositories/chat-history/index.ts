import axios from 'axios';

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
    //console.log('🚀 ~ getChatHistory resp:', resp.data);
    return resp.data.data;
  } catch (error) {
    console.error('error', error);
    return [];
  }
}

export async function getChatDogsHistory(
  params: IChatHistoryParam
): Promise<IChatHistory[]> {
  try {
    const resp = await axios.get(
      `${process.env.MILEI_DOG_API_URL}/chat/history/${params.session_id}`
    );
    //console.log('🚀 ~ getChatDogsHistory resp:', resp.data);
    return resp.data.data;
  } catch (error) {
    console.error('error', error);
    return [];
  }
}
