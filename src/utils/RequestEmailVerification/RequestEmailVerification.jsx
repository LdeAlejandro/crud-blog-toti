export const RequestEmailVerification = async (email) => {
    try {
      
        const res = await fetch("/api/auth/requestEmailVerification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             email,
            }),
          });
    

      if (res.ok) {

          return { success: true, status: res.status };
        }  else {
         
          return { success: false, status: res.status, message: "Unknown Verification error" };
        }
    } catch (error) {
     
      return { success: false, message: error.message };
    }
  };