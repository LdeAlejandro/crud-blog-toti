
    export const SendMail = async (email, subject, message, html) => {
        try {

          const baseUrl = process.env.SITE_URL
          const response = await fetch(`${baseUrl}/api/sendMail`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              subject,
              message,
              html
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

