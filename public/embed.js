 (function() {
  // 1. Create a button to open the modal
  var openButton = document.createElement('button');
  openButton.style.position = 'fixed';
  openButton.style.bottom = '65px';
  openButton.style.right = '40px';
  openButton.style.zIndex = '10000';
  openButton.style.backgroundColor = 'transparent';
  openButton.style.border = 'none';
  openButton.style.cursor = 'pointer';
  document.body.appendChild(openButton);

  // Set the image for the button
  var buttonImage = document.createElement('img');
  // buttonImage.src = 'https://static.wixstatic.com/media/1bb8f4_c1a66c16027a4eada675c06f38e787be~mv2.png/v1/crop/x_82,y_0,w_7516,h_2628/fill/w_143,h_50,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Relanto%20Logo.png';
  // buttonImage.src ="https://img.icons8.com/?size=100&id=hCvhdugyicF1&format=png&color=000000";
  buttonImage.src="https://img.icons8.com/?size=100&id=XTk8kozwO49R&format=png&color=000000"
  buttonImage.alt = 'Open Chatbot';
  buttonImage.style.width = '50px'; // Adjust size as needed
  buttonImage.style.height = '50px';
  openButton.appendChild(buttonImage);

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
  modalContent.style.width = '100%';
  modalContent.style.height = 'auto';
  modalContent.style.maxWidth = '1000px';
  modalContent.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
  modalContent.style.borderRadius = '15px'; 
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
  chatbotContainer.style.height = '450px';
  chatbotContainer.style.borderRadius = '15px'; // Ensure the content also has rounded corners
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
    iframe.style.height = '90%';
    // iframe.style.marginBottom="60px";
    iframe.style.border = 'none';
    iframe.style.borderRadius = '15px'; // Ensure iframe content also has rounded corners
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

