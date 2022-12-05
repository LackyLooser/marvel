import { useState, useCallback } from "react"

export const useFetch =() =>{
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const request = useCallback(async(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) =>{
        setIsLoading(true)
        const res = await fetch(url, {method, body, headers})

        try {
            if(!res.ok){
                throw new Error(`По запросу на ${url} получина ожибка ${res.status}`)
                
             }
             const data = await res.json()

             setIsLoading(false)
             return data
        } catch (e) {
            setIsError(e.message)
            setIsLoading(false)

            throw e
        }
    },[])
    const clearError = useCallback(()=>setIsError(false),[])

    return {isLoading, isError, request, clearError}
}