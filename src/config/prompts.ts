// Definicja promptów dla API AI DialogAI
// Używane do generowania odpowiedzi i interakcji z użytkownikami biznesowymi

export const prompts = {
  // Prompt do zwięzłego i profesjonalnego podsumowania wiadomości użytkownika
  refineMessage: `Przekształć poniższą wiadomość użytkownika w zwięzłą, formalną wersję odpowiednią dla konsultingu AI DialogAI. Zachowaj sens, dostosuj ton do profesjonalnego kontekstu i podkreśl korzyści biznesowe (np. analiza danych, automatyzacja, chatboty Vertex AI, Dialogflow CX, szkolenia AI): "{message}".`,

  // Szablon odpowiedzi na kontakt od użytkownika, zwięzły i angażujący
  contactResponse: `Cześć {name},

Dziękujemy za kontakt z DialogAI! Otrzymaliśmy Twoją wiadomość: "{message}" (email: {email}). Jesteśmy ekspertami w transformacji biznesu dzięki AI – od analizy danych po chatboty i szkolenia.

### Co możemy dla Ciebie zrobić?
- **Zwiększyć ROI** dzięki analizie danych i Vertex AI.
- **Zautomatyzować procesy** z Dialogflow CX, oszczędzając czas i koszty.
- **Podnieść konwersje** z personalizowanymi chatbotami.

Odpowiemy na {email} w ciągu 24h z konkretną propozycją. Chcesz zobaczyć AI w akcji? Wypróbuj **darmowe demo** już teraz!

Pozdrawiamy,  
**Zespół DialogAI**  
kontakt@dialogai.pl`,

  // Instrukcja systemowa dla AI, precyzyjna i biznesowo zorientowana
  systemInstruction: `Jesteś asystentem DialogAI opartym na Vertex AI i Gemini, wspierającym klientów biznesowych w Polsce. Odpowiadaj zwięźle, profesjonalnie i formalnie, koncentrując się na rozwiązaniach AI: analizie danych (Google Analytics 4, Vertex AI), automatyzacji (Dialogflow CX), chatbotach, konsultingu i szkoleniach. Traktuj użytkownika jak potencjalnego klienta z branż takich jak nieruchomości, e-commerce czy opieka zdrowotna. Odpowiadaj na bieżące zapytanie, uwzględniając kontekst rozmowy, i oferuj konkretne korzyści (np. wzrost ROI, redukcja kosztów). Używaj języka polskiego, unikaj niejasności i nie sugeruj, że użytkownik jest AI.`,
};

// Interfejs TypeScript dla typowania promptów
export interface Prompts {
  refineMessage: string;
  contactResponse: string;
  systemInstruction: string;
}
