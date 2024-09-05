//export ResetPassword(currentpassword, email, newpassword)

   export const ChangePassword = async (currentPassword, email,newPassword) => {
      try {
        const res = await fetch("/api/auth/changePassword", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            email,
            newPassword, 
          }),
        });

        if (res.status === 201 ) {
          return { message: 'Password updated successfully', status: res.status };
        }else if (res.status === 401) {
          return { message: 'Wrong password', status: res.status };
        } else {
          return { message: `Error updating password: ${responseData.message || res.status}`, status: res.status };
        
        }
      } catch (error) {
        console.error('Error in ChangePassword:', error);
        return { message: 'Error in ChangePassword', status: 500 };
    
      }
    };

   
