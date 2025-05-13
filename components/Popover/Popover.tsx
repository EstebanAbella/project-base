// import React, { useEffect, useState } from 'react'
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { CloudAlert } from '../../Icons/CloudAlert'
// import { Close } from '../../Icons'
// import NotificationService from '../../../../data/services/NotificationService'

// export const Popover = () => {
//   const [isVisible, setIsVisible] = useState(false)
//   const [message, setMessage] = useState('')

//   useEffect(() => {
//     const handleError = (msg: string) => {
//       setMessage(msg)
//       setIsVisible(true)
//     }
//     NotificationService.on('error', handleError)

//     return () => {
//       NotificationService.off('error', handleError)
//     }
//   }, [])

//   if (!isVisible) return null

//   return (
//     <View style={styles.containerPopover}>
//       <View style={styles.popover}>
//         <CloudAlert size={24} color="#F66363" />
//         <Text style={styles.popoverText}>{message}</Text>
//       </View>
//       <TouchableOpacity
//         style={styles.closeButton}
//         onPress={() => setIsVisible(false)}
//       >
//         <Close size={16} color="white" />
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   containerPopover: {
//     position: 'absolute',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     minWidth: 330,
//     height: 40,
//     bottom: 38,
//     alignSelf: 'center',
//     zIndex: 5,
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     backgroundColor: '#656565',
//   },
//   popover: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popoverText: {
//     marginLeft: 8,
//     marginBottom: 0,
//     fontSize: 14,
//     color: 'white',
//   },
//   closeButton: {
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })
// components/Popover.tsx
// components/Popover.tsx
import React, { useEffect, useState } from "react"
import NotificationService from "../../services/NotificationService"
import { Button } from "../Button"
import { ButtonType } from "../Button/Button"
// import { CloudAlert } from "../icons/CloudAlert"
// import { Close } from "../icons/Close"

export const Popover = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleError = (msg: string) => {
      setMessage(msg)
      setIsVisible(true)
    }

    NotificationService.on("error", handleError)

    return () => {
      NotificationService.off("error", handleError)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className='containerPopover'>
      <div className='popover'>
        <span className='popoverText'>{message ?? "Error"}</span>
      </div>

      <Button
        value={""}
        type={ButtonType.TERTIARY}
        icon={"icon-close"}
        onClick={() => setIsVisible(false)}
        aria-label='Cerrar'
        extraClassName='closeButton'
      ></Button>
    </div>
  )
}

export default Popover
