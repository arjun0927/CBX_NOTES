import { parseDocument } from 'htmlparser2';

const convertHtmlToStructuredJson = (htmlContent) => {
  const dom = parseDocument(htmlContent);
  const elements = [];
  
  // Function to extract text content
  const getTextContent = (node) => {
    if (node.type === 'text') return node.data;
    if (!node.children) return '';
    return node.children.map(getTextContent).join('');
  };
  
  // Function to extract elements
  const extractElements = (nodes) => {
    nodes.forEach(node => {
      if (node.type === 'tag' && ['p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.name)) {
        // Serialize the innerHTML (simplified)
        const html = node.children.map(child => {
          if (child.type === 'text') return child.data;
          if (child.type === 'tag') return `<${child.name}>${getTextContent(child)}</${child.name}>`;
          return '';
        }).join('');
        
        elements.push({
          text: getTextContent(node).trim(),
          html: html,
          elementTag: node.name
        });
      }
    });
  };
  
  // Extract elements from the DOM
  if (dom.children) {
    extractElements(dom.children);
  }
  
  // Continue with the same mapping logic as before
  return elements.map((element, index) => {
    // ... (same as in the previous code)
  });
};