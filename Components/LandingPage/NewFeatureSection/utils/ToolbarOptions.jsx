export const toolbarOptions = [
	{ id: 'text-format', icon: 'Aa', label: 'Text Format' },
	{ id: 'font', icon: 'F', label: 'Font' },
	{ id: 'size', icon: 'Size', label: 'Size' },
	{ id: 'list', icon: '≡', label: 'Lists' },
	{ id: 'color', icon: '🎨', label: 'Color' },
	{ id: 'special', icon: '✓', label: 'Special' },
  ];
  
  // 6. Editor HTML Content (constants/EditorHtmlContent.js)
  // Parent Editor HTML Content
  export const parentEditorHtml = `
  <!DOCTYPE html>
  <html>
  <head>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
	<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
	<style>
	  /* Editor styles */
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
	  
	  /* Make sure content is visible */
	  .ql-container.ql-snow {
		border: none;
		height: 100%;
	  }
	  
	  .ql-editor {
		padding: 12px;
		min-height: 200px;
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
	  
	  /* Updated Checkbox styles - more touch-friendly */
	  .ql-editor .ql-ui-checkbox {
		margin-right: 8px;
		cursor: pointer;
		font-size: 24px; /* Larger size */
		padding: 5px; /* Add padding for larger touch target */
		display: inline-block;
	  }
	  
	  .checkbox-item {
		padding: 5px 0; /* Add vertical padding for the entire item */
	  }
	  
	  /* Custom list indent styles */
	  .ql-editor ul, .ql-editor ol {
		padding-left: 1.5em;
	  }
	  
	  .ql-editor li > ul, .ql-editor li > ol {
		margin-bottom: 0;
		padding-left: 1.5em;
	  }
	  
	  /* Nested field styles */
	  .nested-field {
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 8px;
		margin: 8px 0;
		background-color: #f9f9f9;
	  }
	</style>
  </head>
  <body>
	<div id="editor-container">
	  <div id="editor"></div>
	</div>
	
	<script>
	  // Register custom blot for checkbox list
	  const Block = Quill.import('blots/block');
	  
	  // Size format
	  const Size = Quill.import('formats/size');
	  Size.whitelist = ['1', '2', '3', '4', '5'];
	  Quill.register(Size, true);
	  
	  // Add font format support
	  const Font = Quill.import('formats/font');
	  Font.whitelist = ['arial', 'times', 'courier', 'georgia', 'verdana'];
	  Quill.register(Font, true);
	  
	  // Checkbox implementation
	  class CheckboxItem extends Block {
		static create(value) {
		  const node = super.create();
		  node.setAttribute('data-checked', value ? 'true' : 'false');
		  
		  // Create the checkbox UI
		  const checkbox = document.createElement('span');
		  checkbox.classList.add('ql-ui-checkbox');
		  checkbox.innerHTML = value ? '☑' : '☐';
		  
		  node.appendChild(checkbox);
		  return node;
		}
		
		static formats(node) {
		  return node.getAttribute('data-checked') === 'true';
		}
	  }
	  
	  CheckboxItem.blotName = 'checkbox';
	  CheckboxItem.tagName = 'DIV';
	  CheckboxItem.className = 'checkbox-item';
	  
	  // Nested field implementation
	  class NestedField extends Block {
		static create(value) {
		  const node = super.create();
		  node.classList.add('nested-field');
		  return node;
		}
	  }
	  
	  NestedField.blotName = 'nestedfield';
	  NestedField.tagName = 'DIV';
	  
	  // Register the custom formats
	  Quill.register(CheckboxItem);
	  Quill.register(NestedField);
	  
	  // Initialize Quill editor with minimal toolbar (we'll use our custom toolbar)
	  var quill = new Quill('#editor', {
		theme: 'snow',
		modules: {
		  toolbar: false  // Disable default toolbar
		},
		placeholder: 'Write something here.'
	  });
	  
	  // UPDATED: Handler for both click and touch events on checkboxes
	  const editorElement = document.querySelector('#editor');
  
	  // Handle both click and touchend events
	  ['click', 'touchend'].forEach(eventType => {
		editorElement.addEventListener(eventType, function(e) {
		  // Find the checkbox - either the target or a parent with the class
		  const checkbox = e.target.classList.contains('ql-ui-checkbox') 
			? e.target 
			: e.target.closest('.ql-ui-checkbox');
			
		  if (checkbox) {
			const checkboxItem = checkbox.closest('.checkbox-item');
			if (checkboxItem) {
			  const isChecked = checkboxItem.getAttribute('data-checked') === 'true';
			  checkboxItem.setAttribute('data-checked', !isChecked ? 'true' : 'false');
			  checkbox.innerHTML = !isChecked ? '☑' : '☐';
			}
			e.preventDefault();
			e.stopPropagation();
		  }
		});
	  });
	  
	  // Enhanced keyboard handling for indentation
	  quill.keyboard.addBinding({ key: 'Tab' }, (range) => {
		quill.format('indent', '+1');
		return false;
	  });
	  
	  quill.keyboard.addBinding({ key: 'Tab', shiftKey: true }, (range) => {
		quill.format('indent', '-1');
		return false;
	  });
	  
	  // Function to get editor content and send to React Native
	  function getEditorContent() {
		window.ReactNativeWebView.postMessage(JSON.stringify({
		  type: 'content',
		  content: quill.root.innerHTML,
		  selection: quill.getSelection()
		}));
	  }
	  
	  // Function to handle commands from React Native
	  function handleCommand(command, value) {
		const selection = quill.getSelection(true);
		
		if (selection) {
		  switch(command) {
			case 'bold':
			  quill.format('bold', !quill.getFormat().bold);
			  break;
			case 'underline':
			  quill.format('underline', !quill.getFormat().underline);
			  break;
			case 'strike':
			  quill.format('strike', !quill.getFormat().strike);
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
			  quill.format('list', value);
			  break;
			case 'checkbox':
			  quill.insertText(selection.index, '\\n');
			  quill.clipboard.dangerouslyPasteHTML(
				selection.index + 1, 
				'<div class="checkbox-item" data-checked="false"><span class="ql-ui-checkbox">☐</span> </div>'
			  );
			  quill.setSelection(selection.index + 2, 0);
			  break;
			case 'nestedfield':
			  quill.clipboard.dangerouslyPasteHTML(
				selection.index,
				'<div class="nested-field"><p>Nested content here</p></div>'
			  );
			  break;
		  }
		}
		
		// Send updated content back to React Native
		getEditorContent();
	  }
	  
	  // Expose the method to handle commands from React Native
	  window.handleEditorCommand = function(commandData) {
		try {
		  const data = JSON.parse(commandData);
		  handleCommand(data.command, data.value);
		} catch (e) {
		  console.error("Error processing command:", e);
		}
	  };
	  
	  // Send content when editor changes
	  quill.on('text-change', function() {
		getEditorContent();
	  });
	  
	  quill.on('selection-change', function(range) {
		if (range) {
		  const format = quill.getFormat();
		  window.ReactNativeWebView.postMessage(JSON.stringify({
			type: 'format',
			format: format
		  }));
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
  
  // Tool Editor HTML content generator function
  export const getToolEditorHtml = (toolType) => `
  <!DOCTYPE html>
  <html>
  <head>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<style>
	  body {
		margin: 0;
		padding: 8px;
		height: 100%;
		font-family: Arial, sans-serif;
	  }
	  
	  .tool-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	  }
	  
	  .tool-options {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	  }
	  
	  .option-btn {
		padding: 10px;
		margin: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
		text-align: center;
		cursor: pointer;
	  }
	  
	  .option-btn:hover, .option-btn.active {
		background-color: #f0f0f0;
	  }
	  
	  .color-option {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid #ddd;
	  }
	  
	  .size-option {
		padding: 10px;
		width: 40px;
	  }
	  
	  .font-option {
		min-width: 80px;
		font-weight: bold;
	  }
	  
	  /* Font samples */
	  .font-arial {
		font-family: 'Arial', sans-serif;
	  }
	  
	  .font-times {
		font-family: 'Times New Roman', Times, serif;
	  }
	  
	  .font-courier {
		font-family: 'Courier New', Courier, monospace;
	  }
	  
	  .font-georgia {
		font-family: 'Georgia', serif;
	  }
	  
	  .font-verdana {
		font-family: 'Verdana', sans-serif;
	  }
	  
	  /* Size samples */
	  .size-1 { font-size: 10px; }
	  .size-2 { font-size: 14px; }
	  .size-3 { font-size: 18px; }
	  .size-4 { font-size: 24px; }
	  .size-5 { font-size: 32px; }
	  
	  /* Color samples */
	  .apply-button {
		padding: 12px;
		background-color: #4CAF50;
		color: white;
		border: none;
		border-radius: 4px;
		margin-top: 10px;
		cursor: pointer;
		font-size: 16px;
	  }
	</style>
  </head>
  <body>
	<div class="tool-container">
	  <div class="tool-options" id="options-container">
		<!-- Options will be dynamically added based on the tool type -->
	  </div>
	</div>
  
	<script>
	  // Function to apply selected option to parent editor
	  function applyOption(command, value) {
		window.ReactNativeWebView.postMessage(JSON.stringify({
		  type: 'command',
		  command: command,
		  value: value
		}));
	  }
	  
	  // Function to initialize tool options based on tool type
	  function initializeToolOptions(toolType) {
		const container = document.getElementById('options-container');
		
		switch(toolType) {
		  case 'text-format':
			container.innerHTML = \`
			  <div class="option-btn" onclick="applyOption('bold')">Bold</div>
			  <div class="option-btn" onclick="applyOption('underline')">Underline</div>
			  <div class="option-btn" onclick="applyOption('strike')">Strike</div>
			\`;
			break;
			
		  case 'font':
			container.innerHTML = \`
			  <div class="option-btn font-option font-arial" onclick="applyOption('font', 'arial')">Arial</div>
			  <div class="option-btn font-option font-times" onclick="applyOption('font', 'times')">Times</div>
			  <div class="option-btn font-option font-courier" onclick="applyOption('font', 'courier')">Courier</div>
			  <div class="option-btn font-option font-georgia" onclick="applyOption('font', 'georgia')">Georgia</div>
			  <div class="option-btn font-option font-verdana" onclick="applyOption('font', 'verdana')">Verdana</div>
			\`;
			break;
			
		  case 'size':
			container.innerHTML = \`
			  <div class="option-btn size-option size-1" onclick="applyOption('size', '1')">1</div>
			  <div class="option-btn size-option size-2" onclick="applyOption('size', '2')">2</div>
			  <div class="option-btn size-option size-3" onclick="applyOption('size', '3')">3</div>
			  <div class="option-btn size-option size-4" onclick="applyOption('size', '4')">4</div>
			  <div class="option-btn size-option size-5" onclick="applyOption('size', '5')">5</div>
			\`;
			break;
			
		  case 'list':
			container.innerHTML = \`
			  <div class="option-btn" onclick="applyOption('list', 'ordered')">Numbered List</div>
			  <div class="option-btn" onclick="applyOption('list', 'bullet')">Bullet List</div>
			  <div class="option-btn" onclick="applyOption('list', false)">Clear List</div>
			\`;
			break;
			
		  case 'color':
			container.innerHTML = \`
			  <div class="option-btn color-option" style="background-color: #000000;" onclick="applyOption('color', '#000000')"></div>
			  <div class="option-btn color-option" style="background-color: #e60000;" onclick="applyOption('color', '#e60000')"></div>
			  <div class="option-btn color-option" style="background-color: #2ca02c;" onclick="applyOption('color', '#2ca02c')"></div>
			  <div class="option-btn color-option" style="background-color: #1f77b4;" onclick="applyOption('color', '#1f77b4')"></div>
			  <div class="option-btn color-option" style="background-color: #9467bd;" onclick="applyOption('color', '#9467bd')"></div>
			  <div class="option-btn color-option" style="background-color: #ff7f0e;" onclick="applyOption('color', '#ff7f0e')"></div>
			\`;
			break;
			
		  case 'special':
			container.innerHTML = \`
			  <div class="option-btn" onclick="applyOption('checkbox')">Add Checkbox</div>
			  <div class="option-btn" onclick="applyOption('nestedfield')">Add Nested Field</div>
			\`;
			break;
		}
		
		// Let React Native know the tool editor is ready
		window.ReactNativeWebView.postMessage(JSON.stringify({
		  type: 'tool-ready',
		  toolType: toolType
		}));
	  }
	  
	  // Initialize tool options based on the tool type from URL
	  function getToolTypeFromUrl() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('toolType') || 'text-format';
	  }
	  
	  // Initialize on load
	  document.addEventListener('DOMContentLoaded', function() {
		const toolType = getToolTypeFromUrl();
		initializeToolOptions(toolType);
	  });
	</script>
  </body>
  </html>
  `;