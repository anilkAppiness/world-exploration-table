    (function() {
  // 1. Create a container for the chatbot
  var chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'my-chatbot-container';
  chatbotContainer.style.position = 'fixed';
  chatbotContainer.style.bottom = '20px';
  chatbotContainer.style.right = '20px';
  chatbotContainer.style.width = '300px';
  chatbotContainer.style.height = '400px';
  chatbotContainer.style.backgroundColor = '#fff';
  chatbotContainer.style.border = '1px solid #ccc';
  chatbotContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
  chatbotContainer.style.zIndex = '10000';
  
  document.body.appendChild(chatbotContainer);

  // 2. Load the chatbot UI into an iframe
  var iframe = document.createElement('iframe');
  iframe.src = 'https://world-exploration-table.vercel.app/'; // Replace with your chatbot UI URL
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  chatbotContainer.appendChild(iframe);

  // 3. Optionally, add additional CSS for the container or iframe
  var style = document.createElement('style');
  style.innerHTML = `
    /* You can add more custom styles here */
  `;
  document.head.appendChild(style);
})();
