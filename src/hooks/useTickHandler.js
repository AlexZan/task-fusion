export function useTickHandler(callback) {
    const { registerTickHandler, unregisterTickHandler } = useTimeContext();
  
    useEffect(() => {
      registerTickHandler(callback);
      return () => {
        unregisterTickHandler(callback);
      };
    }, [callback, registerTickHandler, unregisterTickHandler]);
  }
  