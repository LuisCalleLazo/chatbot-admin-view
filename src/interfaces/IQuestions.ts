export interface QuestionToCustomer {
  id: number
  statePresent: string
  orderNumber: number
  question: string
  options?: string[]
  questionsToCustomerEntities?: QuestionToCustomer[]
}

export interface ResponseOfCustomer {
  id: number
  response: string
  questionId: number
  customerId: number
}

export interface QuestionPayload {
  statePresent: string
  orderNumber: number
  question: string
  options?: string[]
  parentQuestionId?: number
}

export interface ExportExcelOptions {
  includeQuestions: boolean
  includeResponses: boolean
  includePhone: boolean
  includePaymentStatus: boolean
  includeWantsServiceButNotPaid: boolean
  includePaid: boolean
  includeSchedule: boolean
}
