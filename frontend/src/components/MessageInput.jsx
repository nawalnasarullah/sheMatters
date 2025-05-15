import { useState, useRef } from "react";
import { Box, TextField, IconButton, ThemeProvider } from "@mui/material";
import {
  Send,
  Image as ImageIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useSendMessageMutation } from "../redux/api/chatApi";
import theme from "./Theme";
import { useSelector } from "react-redux";

function MessageInput() {

  const selectedUser = useSelector((state) => state.chat.selectedUser);
  
  
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [sendMessage] = useSendMessageMutation();

   if (!selectedUser) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      console.log("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!text.trim() && !imagePreview) return;

  try {
    await sendMessage({
      userId: selectedUser._id, 
      messageData: {
        message: text.trim(),   
        image: imagePreview,
      },
    }).unwrap();

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        {imagePreview && (
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ position: "relative" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  position: "relative",
                  left: 90,
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  color: "primary.main",
                  top: -8,
                  left: 150,
                  padding: 1,
                  borderRadius: "50%",
                }}
                onClick={removeImage}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}

        {/* Message input row */}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "29px", 
                backgroundColor: "primary.light", 
                "& fieldset": {
                  borderColor: "primary.main", 
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: "13px 13px", 
              },
            }}
          />

          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <IconButton
            onClick={() => fileInputRef.current?.click()}
            sx={{ flexShrink: 0,
                 color: "primary.main", 
                 ":hover": {
                  backgroundColor: "primary.light", 
                },
              "& .MuiSvgIcon-root": {
                fontSize: "1.7rem",
                },
            }}
          >
            <ImageIcon />
          </IconButton>

          <IconButton
            type="submit"
            color="primary"
            disabled={!text.trim() && !imagePreview}
            sx={{
              backgroundColor: "primary.main",
              color: "white.main",
              "&:hover": {
                color: "primary.dark",
              },
              flexShrink: 0,
              "&:disabled": {
                color: "primary.main",
              },
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MessageInput;
