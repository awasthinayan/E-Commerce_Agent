import axios from "axios";

let failureCount = 0;
let circuitOpen = false;
let lastFailureTime = 0;

const FAILURE_THRESHOLD = 3;
const RESET_TIMEOUT = 15000;

export class AIService {

  private getBaseUrl() {
    const url = process.env.AI_SERVICE_URL;
    if (!url) {
      throw new Error("AI_SERVICE_URL is not defined in environment");
    }
    return url;
  }

  private getTimeout() {
    return Number(process.env.AI_TIMEOUT) || 30000;  // ✅ Increased to 30 seconds
  }

  // ✅ UPDATED: Accept conversation context as parameter
  async research(
    query: string,
    mode: string = "thorough",
    conversationContext: string = ""  // New parameter
  ) {

    const AI_BASE_URL = this.getBaseUrl();
    const AI_TIMEOUT = this.getTimeout();

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
      // ✅ Enhanced: Include conversation context in the request
      const payload = {
        query,
        mode,
        context: conversationContext  // Send previous messages
      };

      const response = await axios.post(
        `${AI_BASE_URL}/research`,
        payload,
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

      console.error("AI Service Error:", error.message);

      throw new Error("AI service failed");
    }
  }
}