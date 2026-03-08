import { Routes, Route } from "react-router-dom"
import { AdminLayout } from "../components/layout/AdminLayout"
import { 
  AdminChatbotConversationView, 
  AdminChatbotInitView, 
  AdminChatbotQuestionsView, 
  AdminChatbotStatesView, 
  AdminSettingsBusinessView, 
  DashboardView,
} from "../views"
import { RedirectorAdmin } from "../components/redirect/AdminRedirect"
import { ChatbotSettingsView } from "../views/admin/settings/ChatbotSettingsView"

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
        <Route path="settings/chatbot" element={<ChatbotSettingsView />} />



        <Route path="/*" element={<RedirectorAdmin />} />
      </Routes>
    </AdminLayout>
  )
}