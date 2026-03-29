const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const api = {
	itemsUrl: `${apiBaseUrl}/items`,
	llmStreamUrl: `${apiBaseUrl}/llm/stream`,
};
