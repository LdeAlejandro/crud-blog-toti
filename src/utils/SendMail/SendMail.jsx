
    export const SendMail = async (email, subject, message) => {
        try {

          const baseUrl = 'http://localhost:3000'
          const response = await fetch(`${baseUrl}/api/sendMail`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              subject,
              message,
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log('******************************************************************\nEmail sent:', data, '\n******************************************************************');
        } catch (error) {
          console.error('*****************************\nError sending email:', error, '\n******************************************************************');
        }
      };

