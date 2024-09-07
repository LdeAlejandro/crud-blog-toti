// SendMail('letzalet@gmail.com', 'Conta Criada Crud', 'Sua conta foi criada com sucesso');
export const RegisterUser = async (name, email, password) => {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
       // username,
        email,
        password,
      }),
    });
    
    if (res.ok) {
        return { success: true, status: res.status };
      } else if (res.status === 409) {
        return { success: false, status: res.status, message: "User already exists" };
      } else if (res.status === 400) {
        return { success: false, status: res.status, message: "Bad request." };
      } else {
        return { success: false, status: res.status, message: "Unknown registration error" };
      }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
