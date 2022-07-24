import {
  Center,
  Button,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton
} from "@chakra-ui/react"
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState, useContext } from "react"
import { ImageContext } from "../helpers/ImageContext";
import axios from "axios";

const UploadPicture = () => {
  const [image, setImage] = useState();
  const fileInputRef = useRef();

  const { imageState, setImageState } = useContext(ImageContext)
  
  const deletePicture = () => {
    axios.post("/api/auth/updatePicture", {
      image: "https://i.postimg.cc/Kjqfbv2m/Screenshot-2022-05-28-at-5-59-42-PM.png"
    },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }
    ).then((res => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        setImageState("https://i.postimg.cc/Kjqfbv2m/Screenshot-2022-05-28-at-5-59-42-PM.png")
      }
    }))
  }
  

  const updatePicture = (text) => {
    axios.post("/api/auth/updatePicture", {
      image: text
    },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }
    ).then((res => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
      }
    }))
  }

  useEffect(() => {
    axios.get('/api/auth/getPicture', {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
      } else {
        setImageState(response.data)
      }
    })
  }, [])

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePicture(reader.result)
        setImageState(reader.result);
      }
      reader.readAsDataURL(image);
    } else {

    }
  }, [image])

  return (
    <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={imageState}>
              {imageState === "https://i.postimg.cc/Kjqfbv2m/Screenshot-2022-05-28-at-5-59-42-PM.png"
              ? <></>
              : <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
                onClick={() => deletePicture()}
              />}
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" onClick={() => fileInputRef.current.click()}>Change Icon</Button>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.substring(0,5) === "image") {
                    setImage(file);
                  }
                }} />
            </Center>
          </Stack>
    )
}

export default UploadPicture;