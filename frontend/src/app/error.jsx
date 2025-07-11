'use client' // Error boundaries must be Client Components
 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    if(error.name == "ProfileIncompleteError") router.replace('/patient/registerfull?msg=' + encodeURI("Complete o cadastro para continuar"));
  }, [error])
 
}