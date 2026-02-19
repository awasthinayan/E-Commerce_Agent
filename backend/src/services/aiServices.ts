import axios from "axios";

const AI_BASE_URL = process.env.AI_BASE_URL as string;
const AI_TIMEOUT = Number(process.env.AI_TIMEOUT) || 5000;

let failureCount = 0;
let circuitOpen = false;
let lastFailureTime = 0;

const FAILURE_THRESHOLD = 3;
const RESET_TIMEOUT = 15000;

export class AIService {

  async research(query: string, mode: string = "deep") {

  if (circuitOpen) {
    const now = Date.now();

    if (now - lastFailureTime > RESET_TIMEOUT) {
      circuitOpen = false;
      failureCount = 0;
    } else {
      throw new Error("AI circuit is open. Try later.");
    }
  }

  try {

    const response = await axios.post(
      `${AI_BASE_URL}/research`,
      { query, mode },
      { timeout: AI_TIMEOUT }
    );

    failureCount = 0;
    return response.data;

  } catch (error: any) {

    failureCount++;
    lastFailureTime = Date.now();

    if (failureCount >= FAILURE_THRESHOLD) {
      circuitOpen = true;
      console.error("Circuit opened due to repeated AI failures");
    }

    throw new Error("AI service failed");
           }
       }

  }