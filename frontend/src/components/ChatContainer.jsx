import React from "react"
import { useRef, useEffect, useState, useMemo, useCallback } from "react"
import { useSelector } from "react-redux"
import { useGetMessagesQuery } from "../redux/api/chatApi"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import {
  Box,
  Avatar,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { connectSocket, disconnectSocket } from "../utils/socket"

const MessageBubble = React.memo(
  ({ message, user, selectedUser, setPreviewImage }) => {
    const formatTime = useCallback((timestamp) => {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    }, [])

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: message.senderId === user._id ? "row-reverse" : "row",
          alignItems: "baseline",
          marginRight: message.senderId === user._id ? 6 : 1,
        }}
      >
        <Avatar
          src={
            message.senderId === user._id
              ? user.avatar || "/avatar.png"
              : selectedUser.avatar || "/avatar.png"
          }
          alt="profile pic"
          sx={{ width: 50, height: 50 }}
        />

        <Box sx={{ maxWidth: "70%" }}>
          <Box
            sx={{
              backgroundColor:
                message.senderId === user._id
                  ? "primary.chatBar"
                  : "secondary.chatBar",
              borderRadius: 2,
              p: "14px",
              marginRight: message.senderId === user._id ? 2 : 0,
              marginLeft: message.senderId === user._id ? 0 : 2,
              display: "flex",
              flexDirection: "column",
              wordWrap: "break-word",
            }}
          >
            {message.image && (
              <Box
                component="img"
                src={message.image}
                alt="Attachment"
                onClick={() => setPreviewImage(message.image)}
                sx={{
                  maxWidth: 200,
                  borderRadius: 1,
                  mb: 2,
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              />
            )}
            {message.message && (
              <Typography variant="body2">{message.message}</Typography>
            )}
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: "grey.main",
              mt: 1,
              display: "flex",
              justifyContent:
                message.senderId === user._id ? "flex-end" : "flex-start",
            }}
          >
            {formatTime(message.createdAt)}
          </Typography>
        </Box>
      </Box>
    )
  }
)

const ChatContainer = ({ user }) => {
  const selectedUser = useSelector((state) => state.chat.selectedUser)
  console.log(" i the user known as : " , user)
  console.log("has selected the chat of : " , selectedUser)
  const messageEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(null)

  const {
    data: messages = [],
    isLoading: isMessagesLoading,
    refetch,
  } = useGetMessagesQuery(selectedUser?._id, {
    skip: !selectedUser,
  })


  // Memoized socket connection
  useEffect(() => {
    //if (!selectedUser) return

    const handleNewMessage = (newMessage) => {
      const isForThisChat =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id

      if (true) {
        if (messagesContainerRef.current) {
          setScrollPosition(
            messagesContainerRef.current.scrollHeight -
              messagesContainerRef.current.scrollTop
          )
        }
        refetch()
      } else {
        console.log("New message in another chat:", newMessage)
      }
  }

    let socket = connectSocket(user._id)

    socket.on("newMessage", (message) => {
      console.log("handling new message : " , message)
      handleNewMessage(message)
    })

    return () => {
      socket.off("newMessage", handleNewMessage)
    }
  }, [selectedUser?._id, user._id])

  useEffect(() => {
    if (!messagesContainerRef.current) return

    if (scrollPosition) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight - scrollPosition
      setScrollPosition(null)
    } else if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, scrollPosition])

  if (isMessagesLoading || !selectedUser) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ width: "80%", maxWidth: 400 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            sx={{ mb: 2 }}
          />
          {[...Array(5)].map((_, i) => (
            <Box key={i} sx={{ display: "flex", mb: 2 }}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ mr: 2 }}
              />
              <Skeleton variant="rectangular" width="70%" height={80} />
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "background.paper",
        }}
      >
        <ChatHeader currentUser={user} />
      </Box>

      <Box
        ref={messagesContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 4,
          pl: 12,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
            user={user}
            selectedUser={selectedUser}
            setPreviewImage={setPreviewImage}
          />
        ))}
        <div ref={messageEndRef} />
      </Box>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 10,
          bgcolor: "background.paper",
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <MessageInput refetchMessages={refetch} />
      </Box>

      {/* Image Preview Dialog */}
      <Dialog
        open={!!previewImage}
        onClose={() => setPreviewImage(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ position: "relative", p: 0 }}>
          <IconButton
            onClick={() => setPreviewImage(null)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={previewImage}
            alt="Preview"
            sx={{
              width: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
              display: "block",
            }}
            loading="lazy"
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default React.memo(ChatContainer)
