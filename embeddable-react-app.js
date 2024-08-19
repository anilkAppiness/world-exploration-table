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

  // 2. Load the chatbot UI (assuming it's a React app or similar)
  var script = document.createElement('script');
  script.src = 'https://yourdomain.com/path/to/chatbot.js'; // Replace with your chatbot UI URL
  script.onload = function() {
    // Assuming your chatbot initializes automatically or call an init function here
  };
  document.body.appendChild(script);

  // 3. Optionally, add some CSS
  var style = document.createElement('style');
  style.innerHTML = `
    #my-chatbot-container iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `;
  document.head.appendChild(style);
})();
