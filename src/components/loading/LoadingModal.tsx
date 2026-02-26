import { useLoading } from "../../context/LoadingContext";
import * as Dialog from '@radix-ui/react-dialog';
import { Load } from "./Loading";

const LoadingModal = () => {
  const { loading } = useLoading();

  return (
    <Dialog.Root open={loading}>
      <Dialog.Portal>
        {/* Overlay con z-index y fondo semitransparente */}
        <Dialog.Overlay 
          className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        
        {/* Contenido del modal */}
        <Dialog.Content 
          className="fixed z-[10001] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen flex items-center justify-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-300"
          onInteractOutside={(e) => e.preventDefault()} // Evita cerrar al hacer click fuera
          onEscapeKeyDown={(e) => e.preventDefault()}  // Evita cerrar con ESC
        >
          <div className="relative">
            <Load width={400} height={400}/>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoadingModal;