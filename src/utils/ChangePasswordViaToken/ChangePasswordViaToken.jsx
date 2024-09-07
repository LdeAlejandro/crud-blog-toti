

//export ResetPassword(token, email, newpassword)

   export const ChangePasswordViaToken = async (token, newPassword) => {
      try {
        const res = await fetch("/api/auth/resetPasswordViaToken", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword, 
          }),
        });

        if (res.status === 201 ) {
          return { message: 'Password updated successfully', status: res.status };
        } else {
          return { message: `Error updating password: ${message || res.status}`, status: res.status };
        
        }
      } catch (error) {
        console.error('Error in ChangePassword:', error);
        return { message: 'Error in ChangePassword', status: 500 };
    
      }
    };

    
   export const RequestPasswordReset = async (email) => {
    try {
      const res = await fetch("/api/auth/resetPasswordViaToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        }),
      });

      if (res.status === 201 ) {
        return { message: 'Password updated successfully', status: res.status };
      } else {
        return { message: `Error updating password: ${message || res.status}`, status: res.status };
      
      }
    } catch (error) {
      console.error('Error in ChangePassword:', error);
      return { message: 'Error in ChangePassword', status: 500 };
  
    }
  };

   
