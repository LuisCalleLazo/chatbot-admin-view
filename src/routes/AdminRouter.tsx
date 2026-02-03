import { Routes, Route } from "react-router-dom"
import { AdminLayout } from "../components/layout/AdminLayout"
import { 
  AdminChatbotConversationView, 
  AdminChatbotInitView, 
  AdminChatbotQuestionsView, 
  AdminChatbotStatesView, 
  AdminSettingsBusinessView, 
  DashboardView,
  NotFoundView
} from "../views"

export const AdminRouter = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<DashboardView />} />

        {/* Chatbot */}
        <Route path="chatbot/init" element={<AdminChatbotInitView />} />
        <Route path="chatbot/questions-and-responses" element={<AdminChatbotQuestionsView />} />
        <Route path="chatbot/states" element={<AdminChatbotStatesView />} />
        <Route path="chatbot/conversations" element={<AdminChatbotConversationView />} />


        {/* Configuration */}
        <Route path="settings/business" element={<AdminSettingsBusinessView />} />



        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </AdminLayout>
  )
}