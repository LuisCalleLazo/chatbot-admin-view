import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "../components";
import { NotFoundView, HomeView, ServiceView, ContactView, CharacteristicsView, PricesView } from "../views";

export const HomeRouter = () =>
{
  return (
    <HomeLayout>
      <Routes>
        <Route index element={<HomeView /> }/>
        <Route path="home" element={<HomeView /> }/>
        <Route path="services" element={<ServiceView /> }/>
        <Route path="contact" element={<ContactView /> }/>
        <Route path="characteristics" element={<CharacteristicsView /> }/>
        <Route path="prices" element={<PricesView /> }/>

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </HomeLayout>
  );
}