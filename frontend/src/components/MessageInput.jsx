import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import {
  Send,
  Image as ImageIcon,
  Close as CloseIcon,
  EmojiEmotions as EmojiIcon,
} from "@mui/icons-material";
import { useSendMessageMutation } from "../redux/api/chatApi";
import theme from "./Theme";
import { useSelector } from "react-redux";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useSocket } from "../context/SocketContext";


function MessageInput() {
  const { socket } = useSocket()
  const user = useSelector((state) => state.auth?.user?.user || state.psychologistAuth?.psychologist )
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [sendMessage] = useSendMessageMutation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji.native);
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
      socket.emit("send-message" , { message : text.trim() ,  reciever : selectedUser._id , sender : user._id })
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", position: "relative", px: isSmallScreen ? 1 : 4 }}>
        {imagePreview && (
          <Box sx={{ 
            mb: 2, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            position: "relative" 
          }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
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
                right: -8,
                padding: 1,
                borderRadius: "50%",
                backgroundColor: "white",
              }}
              onClick={removeImage}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <Box
            ref={emojiPickerRef}
            sx={{
              position: "absolute",
              bottom: 70,
              left: isSmallScreen ? 10 : 70,
              zIndex: 9999,
            }}
          >
            <Picker 
              data={data} 
              onEmojiSelect={handleEmojiSelect} 
              theme="light" 
              previewPosition="none"
              skinTonePosition="none"
            />
          </Box>
        )}

        {/* Message input row - always horizontal */}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: "100%",
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

          <Box sx={{ 
            display: "flex", 
            gap: 1,
            flexShrink: 0,
            ml: isSmallScreen ? 0 : 1
          }}>
            <IconButton
              onClick={() => fileInputRef.current?.click()}
              sx={{
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
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              sx={{
                color: "primary.main",
                ":hover": {
                  backgroundColor: "primary.light",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.7rem",
                },
              }}
            >
              <EmojiIcon />
            </IconButton>

            <IconButton
              type="submit"
              color="primary"
              disabled={!text.trim() && !imagePreview}
              sx={{
                backgroundColor: "primary.main",
                color: "white.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                "&:disabled": {
                  color: "primary.main",
                },
              }}
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MessageInput;