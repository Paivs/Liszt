import Loader from "@/components/loader";

export default function Loading(){
  return(<>
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Loader/>
    </div>
  </>)
}