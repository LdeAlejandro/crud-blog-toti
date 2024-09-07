export const VerifyEmail = async (token) => {
    try {
      
      const res = await fetch(`/api/tokenVerification?token=${encodeURIComponent(token)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const resText= await res.text();
      if (res.ok) {

    
          return { success: true, status: res.status };
        } else if (res.status === 409) {
        
          return { success: false, status: res.status, message: "Account already verified" };
        } else if (res.status === 400) {
        
          return { success: false, status: res.status, message: "Bad request." };
        }else if (res.status === 404) {
       
          return { success: false, status: res.status, message: "Invalid token." };
        }  else {
         
          return { success: false, status: res.status, message: "Unknown Verification error" };
        }
    } catch (error) {
     
      return { success: false, message: error.message };
    }
  };