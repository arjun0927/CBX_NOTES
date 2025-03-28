import React, { useEffect, useState } from "react";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import { GrMonospace } from "react-icons/gr";
import { Button, Input } from "antd";
const CustomWhatsAppEditor = ({ onMessageChange, initialMessage, handleInputFocus }) => {

  const [waMessage, setWaMessage] = useState("");
  const textareaRef = React.createRef();

  const handleInputChange = () => {
    const inputValue = textareaRef.current.value;
    setWaMessage(inputValue);
    onMessageChange(inputValue);
  };

  useEffect(() => {
    if (initialMessage) {
      setWaMessage(initialMessage)
    }
  }, [initialMessage])


  const insertText = (openTag, closeTag) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const selectedText = value.substring(start, end);
    const modifiedValue = ${value.substring(0, start)}${openTag}${selectedText}${closeTag}${value.substring(end)};
    textarea.value = modifiedValue;
    textarea.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);
    textarea.focus();
    handleInputChange();
  };

  const formatPreview = (text) => {
    return text
      .replace(/\(.?)\*/g, (match, p1) => <strong>${p1}</strong>)
      .replace(/(.*?)/g, (match, p1) => <em>${p1}</em>)
      .replace(/(.*?)/g, (match, p1) => <del>${p1}</del>)
      .replace(/(.*?)/g, (match, p1) => `<code>${p1}</code>`);
  };

  return (
    <div>
      <div style={{ border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ borderBottom: "1px solid #ccc", padding: "8px", display: "flex", gap: '2rem', alignItems: "center", justifyContent: "center" }}>
          <Button> <FormatBoldIcon style={{ cursor: "pointer" }} onClick={() => insertText("", "")} /></Button>
          <Button> <FormatItalicIcon style={{ cursor: "pointer" }} onClick={() => insertText("", "")} /></Button>
          <Button> <FormatStrikethroughIcon style={{ cursor: "pointer" }} onClick={() => insertText("", "")} /></Button>
          <Button> <GrMonospace onClick={() => insertText("", "")} style={{ cursor: "pointer", fontSize: "20px" }} /></Button>
        </div>

        <Input.TextArea
          ref={textareaRef}
          onChange={handleInputChange}
          placeholder="WhatsApp Message"
          value={waMessage}
          onFocus={() => handleInputFocus('WAMessage')}
          style={{
            fontFamily: "Roboto, sans-serif",
            maxWidth: "100%",
            minWidth: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            minHeight: "100px",
            padding: "8px",
            border: "none",
            outline: "none",
            resize: "vertical"
          }}
        />
      </div>


      {
        waMessage?.length > 0 && <div style={{ marginTop: "10px" }}>
          <strong>Preview:</strong>
          <div style={{ minHeight: "100px", padding: "10px", overflowY: "auto" }} dangerouslySetInnerHTML={{ __html: formatPreview(waMessage) }}></div>
        </div>
      }
    </div>
  );
};

export default CustomWhatsAppEditor;