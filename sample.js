const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const cors = require('cors')



app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin:'http://localhost:6767'
}))

const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:6767', 
      methods: ['GET', 'POST'],
      credentials: true
    }
  });
  


io.on('connection', (socket) => {
  console.log('Client connected');
 
  socket.on('stream', (stream) => {
    console.log('Received screen stream');
    console.log(stream)
    socket.broadcast.emit('stream', stream);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// {
//   "type": "service_account",
//   "project_id": "xorostreams",
//   "private_key_id": "b5e07b8a1b4369a4a10a6f6c65349c9c6b298bd6",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDVsbGPzzHxmMYl\nl9E37u7RCl+dZ9F5d1T79DF4szixpnYIM/M914yz9l0gwYsvBuQJTzv23nen7EYl\n7Zu85F/LeMZffqnHo1GcqcIu1Qt6KdtNntALp8jMuVPyyL0S7IJaXGRYJHAtR8jW\naWZe1ykNrd3dePReelMVqoYEASUW9GjhRFzizylYhbnI9WTmIfTJmv8WC80Zxiik\nqLl75zzTQadj0mcaxftuhmd9dP5ihAYsY74PmIoR+WrFrwgrri4YoaHUNrGnA9Ul\n1C/HL0lfMMfbVGOpYLtTgih0BrAKWPGEWWD+OWEAwkFSDjnQtcij377BeKaNubAp\n06YOe0hnAgMBAAECggEADPhRKqDDnYtx9sdMJmKnSKMP+XQR9HKFufUelv6OT36U\nrtLGFvyFo/+/arKwAINFaajzw1eAxf2MFGk+9pm/AiMYvhHoTUPyqLS0/jYco6Ya\nJWtX6vicn/mB7SneeRgi6myJKFKt2giR7Ahz81EasMgkLXkMxRYUKFB9RURhF+rk\nvOiXna5enOiikZEuLoFOqXte9fW60o/hxrsg681EfN5Tu1lUftBxBvsHLgS8AtyE\nXl3vHveZMJiAoclsgJW/mxSK5WKSUuQlQS4ALU7YrzwSyywG0YFbFDn1pX5jo+7m\ndtBuvHdgQxnnB7zXqwUJ8tx7JrSPJ3gRBixTRBzyoQKBgQDuhvEjg7f+FRd+JmZJ\nAfLkynCUhBz3QmE3E3JX9yAXBO3XupSjMUCgpzbAHI9g6tXFz3BVVUCrjriWeZIe\nDcJCxPqODx4j64nLl0L5yQE2c3ZW3zOp0Ax7pflddJxB3c9tJIclp/kp+tAwaEev\nVF4f/sxRA4pPi2HjdwBmUhp1jQKBgQDlWRAJanlE8WTs5vqoumbsleQuiftJ9lVB\nUGQdxZ7uuYPEAWY6sMBkC+6lXKxVhbH6hesmJDssbeM6Y17RRh7OLvC5LRQV7mZt\nGUMMJi6SJK7MwOuaartCJn+Wsz/q4VAs9PvDRyWdlH+XX0i7ChHU7hFQMHicCVgG\neiO7t6g2wwKBgQCwO2lMqRQ3GRRLc0mdZWA1pFC7mkTgdt3m2GpiDcda2px0CHmr\nfUdXq1Prau6QV9FsHlDL63olhwRgwR+xLs85j9njPc4yEeO0VWT5soY/2d00YCMG\nsx2V+dIdN3v/ukd4R0XHD60rVBGfwlw8cWQ91X7V2HzHOp8vdYwJDV5ZPQKBgFR2\n4HkXRWImpMy6pEXPoGgxK8AYAPvURMGxIa31QfsZR3XALi4fOjueSV2NK8qzWkCx\nYVDCtyg9sBmozxqzgFTe5LjN6T/KdN5pF1A6H5yi9d1ij2JnPF+4XfTaPwf5wtVL\nxAy+/xNxxSuyY86+fqK0qpulvkV5C3oXMWHI2aKRAoGBAJ1FIrpl9K1u2OzQKbJO\no8XMiomubsAvN6CZMbs78evXIea6PNdrZd8/h5QVU13g+DZPhKXKGnEwlqTS1a6i\np0jneE7426DR9YaxRIaIruyvF2oaEoIhb+roWNemyVlheT2nTb0hFC0YKPurJWCt\n5EteFrwqbbtGlAA5K00sUQQ9\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-ea0ur@xorostreams.iam.gserviceaccount.com",
//   "client_id": "107029494334144726313",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ea0ur%40xorostreams.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }
