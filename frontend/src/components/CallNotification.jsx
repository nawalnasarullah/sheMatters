import { useSocket } from "../context/SocketContext"
import { getPeerId } from "../utils/utils"
import { IconButton, Avatar, Typography, Box } from "@mui/material"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';

const CallNotification = () => {
  const { ongoingCall, handleJoinCall, handleHangup, onlineUsers } = useSocket()

  if (!ongoingCall?.isRinging) return

  const callerUserId = onlineUsers.find(
    (user) => user.peerId === ongoingCall.callerPeerId
  )

  return (
    <div className="absolute bg-slate-500 w-screen h-screen top-0 bottom-0 flex items-center justify-center bg-opacity-70">
      <div className="bg-white min-w-[300px] min-h-[100px] flex flex-col items-center justify-center rounded p-4">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              marginRight: 2,
            }}
            src={"/avatar.png"}
          />
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "primary.main", fontSize: 18 }}
            >
              {callerUserId?.userId}
            </Typography>
          </Box>
        </Box>
        <p className="text-sm mb-2">Incoming Call <br /> Yo phone Linging Pick up da phone</p>
        <div className="flex gap-8">
          <button
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
            onClick={() => handleJoinCall()}
          >
            <LocalPhoneIcon fontSize="medium" />
          </button>
          <button
            className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white"
            onClick={() => handleHangup()}
          >
            <PhoneDisabledIcon fontSize="medium" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallNotification
