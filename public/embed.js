(function() {
  // 1. Create a button to open the modal
  var openButton = document.createElement('button');
  openButton.textContent = 'Open Chatbot';
  openButton.style.position = 'fixed';
  openButton.style.bottom = '20px';
  openButton.style.right = '20px';
  openButton.style.zIndex = '10000';
  document.body.appendChild(openButton);

  // 2. Create the modal container
  var modal = document.createElement('div');
  modal.id = 'my-chatbot-modal';
  modal.style.display = 'none'; // Hidden by default
  modal.style.position = 'fixed';
  modal.style.zIndex = '10000';
  modal.style.left = '0';
  modal.style.top = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.overflow = 'auto';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Black with opacity
  document.body.appendChild(modal);

  var modalContent = document.createElement('div');
  modalContent.id = 'my-chatbot-modal-content';
  modalContent.style.backgroundColor = '#fff';
  modalContent.style.margin = '10% auto';
  modalContent.style.padding = '20px';
  modalContent.style.border = '1px solid #ccc';
  modalContent.style.width = '80%';
  modalContent.style.maxWidth = '400px';
  modalContent.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
  modal.appendChild(modalContent);

  // Add close button to the modal
  var closeButton = document.createElement('span');
  closeButton.className = 'close';
  closeButton.textContent = '×';
  closeButton.style.color = '#aaa';
  closeButton.style.float = 'right';
  closeButton.style.fontSize = '28px';
  closeButton.style.fontWeight = 'bold';
  closeButton.style.cursor = 'pointer';
  modalContent.appendChild(closeButton);

  // 3. Load the chatbot UI into the modal
  var chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'my-chatbot-container';
  chatbotContainer.style.width = '100%';
  chatbotContainer.style.height = '400px';
  modalContent.appendChild(chatbotContainer);

  // 4. Add CSS to the document
  var style = document.createElement('style');
  style.innerHTML = `
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
    }
  `;
  document.head.appendChild(style);

  // 5. Handle button click to open the modal
  openButton.onclick = function() {
    modal.style.display = 'block';

    // Load the React app or chatbot into the container
    var iframe = document.createElement('iframe');
    iframe.src = 'https://world-exploration-table.vercel.app/'; // Replace with your React app URL
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    chatbotContainer.appendChild(iframe);
  };

  // 6. Handle close button click
  closeButton.onclick = function() {
    modal.style.display = 'none';
    chatbotContainer.innerHTML = ''; // Clear the iframe
  };

  // 7. Close the modal if the user clicks outside the modal content
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
      chatbotContainer.innerHTML = ''; // Clear the iframe
    }
  };
})();

