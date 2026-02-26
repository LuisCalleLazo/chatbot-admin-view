
export const LoadingValidate = () =>{
  return (
    <div className="w-full h-screen flex items-center flex-col justify-center bg-[var(--bg-color2)]">
      <div className="rounded-full border-[10px] border-transparent border-t-[var(--tx-color2)] 
        border-b-[var(--tx-color2)] animate-loading w-[300px] h-[300px] mb-28">
      </div>
      <div className="font-semibold text-3xl text-white">
        <h2>
          VALIDANDO TU ACCESO . . .
        </h2>
      </div>
    </div>
  )
}