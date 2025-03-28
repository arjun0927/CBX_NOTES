export const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }
    
    #editor-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    #title-input {
      width: 100%;
      border: none;
      font-size: 22px;
      padding: 12px;
      padding-left: 15px;
      outline: none;
      font-weight: 600;
    }
    
    #title-divider {
      height: 1.5px;
      background-color: #F2F1F1;
      margin: 0 12px;
    }
    
    #editor {
      flex: 1;
      overflow-y: auto;
      min-height: 200px;
      font-size: 16px;
    }
    
    /* Hide the default toolbar */
    .ql-toolbar.ql-snow {
      display: none;
    }
    
    /* Define font family classes */
    .ql-editor .ql-font-arial {
      font-family: 'Arial', sans-serif;
    }
    
    .ql-editor .ql-font-times {
      font-family: 'Times New Roman', Times, serif;
    }
    
    .ql-editor .ql-font-courier {
      font-family: 'Courier New', Courier, monospace;
    }
    
    .ql-editor .ql-font-georgia {
      font-family: 'Georgia', serif;
    }
    
    .ql-editor .ql-font-verdana {
      font-family: 'Verdana', sans-serif;
    }
    
    /* Make sure content is visible */
    .ql-container.ql-snow {
      border: none;
      height: 100%;
    }
    
    .ql-editor {
      padding: 12px;
      min-height: 200px;
      overflow: hidden;
    }
    
    /* Define numeric font size classes */
    .ql-editor .ql-size-1 {
      font-size: 10px;
    }
    .ql-editor .ql-size-2 {
      font-size: 14px;
    }
    .ql-editor .ql-size-3 {
      font-size: 18px;
    }
    .ql-editor .ql-size-4 {
      font-size: 24px;
    }
    .ql-editor .ql-size-5 {
      font-size: 32px;
    }
    
    /* Make links stand out */
    .ql-editor a {
      color: #0066cc;
      text-decoration: underline;
      cursor: pointer;
    }
    .ql-editor .ql-checkbox {
      list-style-type: none;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }
    
    .ql-editor .ql-checkbox::before {
      content: '☐';
      margin-right: 8px;
      cursor: pointer;
    }
    
    .ql-editor .ql-checkbox.checked::before {
      content: '☑';
    }
    
  </style>
</head>
<body>
  <div id="editor-container">
    <div id="title-container">
      <input type="text" id="title-input" placeholder="Title">
      <div id="title-editor"></div>
    </div>
    <div id="title-divider"></div>
    <div id="editor"></div>
  </div>
  
  <script>
    // Size format
    const Size = Quill.import('formats/size');
    Size.whitelist = ['1', '2', '3', '4', '5'];
    Quill.register(Size, true);
    
    // Add font format support
    const Font = Quill.import('formats/font');
    Font.whitelist = ['arial', 'times', 'courier', 'georgia', 'verdana'];
    Quill.register(Font, true);

    const Checkbox = {
      add(quill, options) {
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('checkbox', () => {
          const range = quill.getSelection();
          if (range) {
            quill.format('checkbox', true);
          }
        });
      }
    };
    Quill.register('modules/checkbox', Checkbox);
    
    // Initialize Quill editor with hidden toolbar
    var quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: false,
        // checkbox: true
      },
      formats: [
        'bold', 'italic', 'underline', 'strike', 
        'font', 'size', 'list', 'link', 'color', 
        'checkbox'
      ],
      placeholder: 'Write something here...'
    });
    
    // Get title input element
    const titleInput = document.getElementById('title-input');
    
    // Function to get editor content and send to React Native
    function getEditorContent() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'content',
        data: {
          title: titleInput.value,
          body: quill.root.innerHTML
        }
      }));
    }
    
    // Title input event listener
    titleInput.addEventListener('input', function() {
      getEditorContent();
    });
    
    // Send content when editor changes
    quill.on('text-change', function() {
      getEditorContent();
      
      // Also send the current format
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'format',
        data: quill.getFormat()
      }));
    });
    
    // Send format when selection changes
    quill.on('selection-change', function(range) {
      if (range) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'format',
          data: quill.getFormat()
        }));
      }
    });
    
    // Rest of the existing script remains the same (executeCommand, message listener, etc.)
    // Function to format text based on command received from React Native
    function executeCommand(command, value) {
      const range = quill.getSelection() || { index: 0, length: 0 };
      
      // Make sure we have focus before executing any commands
      if (!range.length && command !== 'link') {
        quill.focus();
      }
      
      switch(command) {
        case 'bold':
          quill.format('bold', !quill.getFormat(range).bold);
          break;
        case 'italic':
          quill.format('italic', !quill.getFormat(range).italic);
          break;
        case 'underline':
          quill.format('underline', !quill.getFormat(range).underline);
          break;
        case 'strike':
          quill.format('strike', !quill.getFormat(range).strike);
          break;
        case 'font':
          quill.format('font', value);
          break;
        case 'size':
          quill.format('size', value);
          break;
        case 'color':
          quill.format('color', value);
          break;
        case 'list':
          const currentList = quill.getFormat(range).list;
          if (currentList === value) {
            quill.format('list', false);
          } else {
            quill.format('list', value);
          }
          break;
        case 'toggleList':
          const currentListType = quill.getFormat(range).list;
          console.log('Current list type:', currentListType);
          
          if (!currentListType) {
            quill.format('list', 'bullet');
            console.log('Setting list to bullet');
          } else if (currentListType === 'bullet') {
            quill.format('list', 'ordered');
            console.log('Setting list to ordered');
          } else {
            quill.format('list', false);
            console.log('Removing list formatting');
          }
          
          // Force refresh of format
          setTimeout(() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'format',
              data: quill.getFormat()
            }));
          }, 50);
          break;
          case 'checkbox':
          const checkboxElement = quill.getSelection().index;
          const currentLine = quill.getLine(checkboxElement)[0];
          const lineIndex = quill.getIndex(currentLine);
          
          const existingFormats = quill.getFormat(lineIndex);
          const isCurrentlyChecked = existingFormats.checkbox;
          
          quill.formatLine(lineIndex, 1, 'checkbox', !isCurrentlyChecked);
          break;
        case 'link':
          try {
            if (value) {
              let linkConfig;
              try {
                // Try to parse JSON if it's passed as a JSON string
                linkConfig = JSON.parse(value);
              } catch(e) {
                // If it's not JSON, use the value as URL directly (backwards compatibility)
                linkConfig = { url: value };
              }
              
              // If we have link text and a selection
              if (linkConfig.text && range.length === 0) {
                // Insert the link text with the link format
                quill.insertText(range.index, linkConfig.text, {
                  'link': linkConfig.url
                });
              } 
              // If there's text selected, apply link to selection
              else if (range.length > 0) {
                quill.format('link', linkConfig.url);
              } 
              // If no text is selected and no link text provided, insert the URL as link
              else {
                quill.insertText(range.index, linkConfig.url || value, {
                  'link': linkConfig.url || value
                });
              }
            } else {
              quill.format('link', false);
            }
          } catch(e) {
            console.error('Error handling link command', e);
            // Fallback to the old behavior
            if (value) {
              if (range.length > 0) {
                quill.format('link', value);
              } else {
                quill.insertText(range.index, value, {
                  'link': value
                });
              }
            } else {
              quill.format('link', false);
            }
          }
          break;
      } 
      
      // Send back the updated format
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'format',
        data: quill.getFormat(range)
      }));
      
      // Focus the editor after executing command
      quill.focus();
    }
    
    // Set up message listener for commands from React Native
    window.addEventListener('message', function(event) {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'command') {
          executeCommand(message.command, message.value);
        } else if (message.type === 'getFormat') {
          const range = quill.getSelection() || { index: 0, length: 0 };
          // Send current format back to React Native
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'format',
            data: quill.getFormat(range)
          }));
        }
      } catch (e) {
        console.error('Error processing command', e);
      }
    });
    
    // Add event listener for link clicks
    document.addEventListener('click', function(e) {
      let element = e.target;
      
      // Check if it's a link or a parent is a link
      while (element && element !== document.body) {
        if (element.tagName === 'A' && element.href) {
          e.preventDefault();
          
          // Send the URL to React Native
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'linkClicked',
            url: element.href
          }));
          
          return;
        }
        element = element.parentNode;
      }
    });
    
    // Focus the editor to make sure it's active
    quill.focus();
    
    // Let React Native know the editor is ready
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'ready',
      message: 'Editor initialized'
    }));
    
  </script>
</body>
</html>
  `;