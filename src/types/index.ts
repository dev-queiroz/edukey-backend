// Tipos compartilhados para o backend do EducApp

export interface Correction {
    id: string;
    studentId: string;
    examId: string;
    correctedText: string;
    score: number;
    feedback: string;
    createdAt?: string; // ISO 8601 string (ex.: "2025-02-22T10:00:00Z")
}

// Questão gerada ou colaborativa
export interface Question {
    id: string;
    content: string;
    type: "multiple_choice" | "essay" | "true_false";
    difficulty: "easy" | "medium" | "hard";
    topicId: string;
    createdBy: string;
    isShared: boolean;
    createdAt?: string;
}

// Relatório de desempenho
export interface PerformanceReport {
    studentId: string;
    topics: Record<string, number>; // Ex.: { "matematica": 85, "portugues": 60 }
    averageScore: number;
}

// Simulação de prova
export interface Simulation {
    id: string;
    studentId: string;
    questionIds: string[]; // Array de IDs de questões
    score?: number;
    createdAt?: string;
}

// Mensagem do chatbot
export interface ChatMessage {
    id: string;
    studentId: string;
    question: string;
    response: string;
    createdAt?: string;
}

// Pontuação para gamificação
export interface Score {
    id: string;
    studentId: string;
    points: number;
    rank?: number;
    updatedAt?: string;
}

// Plano de aula
export interface LessonPlan {
  id: string;
  teacherId: string;
  content: string; // JSON com theme, objective, summary, activities
  createdAt?: string;
}

// Material didático
export interface StudyMaterial {
    id: string;
    type: "summary" | "slides" | "worksheet";
    content: string;
    createdAt?: string;
}

// Notificação
export interface Notification {
    id: string;
    userId: string;
    message: string;
    sentAt?: string;
}

// Resposta de aluno (para detecção de plágio)
export interface StudentResponse {
    id: string;
    studentId: string;
    content: string;
    isPlagiarized?: boolean;
    plagiarismSource?: string;
}

// Atividade interativa
export interface InteractiveActivity {
    id: string;
    classId: string;
    type: "quiz" | "poll" | "challenge";
    content: string;
    responses: Record<string, string>; // Ex.: { "studentId": "resposta" }
    createdAt?: string;
}

// Conteúdo acessível
export interface AccessibleContent {
    id: string;
    originalId: string; // ID do conteúdo original
    type: "audio" | "captions" | "adapted_text";
    content: string | Buffer; // Pode ser texto ou binário (áudio)
    createdAt?: string;
}

