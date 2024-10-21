import axios from 'axios';

const API_KEY = 'AIzaSyArP-VzlCQpZGgLASUHXj543AmEneHvFLM';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText';

const PREDEFINED_PROMPT = `You are a medical chatbot for users in India. Based on the patient's description of their medical problem, suggest specific over-the-counter medicines available in India and provide relevant home remedies. Focus only on solutions, and do not suggest consulting a doctor. Provide the names of medicines, dosage, and any precautions.`;

const ChatBot = {
  async getMedicalAdvice(problem: string): Promise<string> {
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          prompt: `${PREDEFINED_PROMPT}\n\nPatient's problem: ${problem}`,
          temperature: 0.7,
          maxOutputTokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const generatedText = response.data.candidates[0].output;
      return generatedText.trim();
    } catch (error) {
      console.error('Error fetching medical advice:', error.response ? error.response.data : error.message);
      return 'Sorry, I couldn\'t process your request. Please try again later.';
    }
  },
};

export default ChatBot;
