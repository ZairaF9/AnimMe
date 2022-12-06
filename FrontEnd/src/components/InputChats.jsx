import React, { useState, useContext, useRef } from 'react';
import { useParams } from "react-router-dom";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../Firebase";
import { AuthContext } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { faPaperclip, faClose } from '@fortawesome/free-solid-svg-icons'
import { faFaceLaughSquint } from '@fortawesome/free-solid-svg-icons'
import EmojiPicker from 'emoji-picker-react';
import CryptoJS from "crypto-js";

const InputChat = () => {

    const params = useParams();
    let MessageGroupId = uuidv4();
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [fileI, setFileI] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const descifrar = (texto) => {
        var bytes = CryptoJS.AES.decrypt(texto, '@borjascript');
        var textoDescrifrado = bytes.toString(CryptoJS.enc.Utf8);
        return textoDescrifrado;
    }

    const onEmojiClick = (event, emojiObject) => {
        setText(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const handleSend = async () => {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        if (img) {
            const storageRef = ref(storage, MessageGroupId);

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log(text);
                        if (text === "") {
                            if (text === "" && !img) {

                            } else if (text === "" && img) {
                                await updateDoc(doc(db, "GroupsChat", params.uid), {
                                    Messages: arrayUnion({
                                        id: MessageGroupId,
                                        uid: params.uid,
                                        senderId: currentUser.uid,
                                        senderPhoto: currentUser.photoURL,
                                        senderName:currentUser.displayName,
                                        date: today,
                                        photoMessage: downloadURL,
                                    }),
                                });
                            }

                        } else {
                            await updateDoc(doc(db, "GroupsChat", params.uid), {
                                Messages: arrayUnion({
                                    id: MessageGroupId,
                                    uid: params.uid,
                                    text,
                                    senderId: currentUser.uid,
                                    senderPhoto: currentUser.photoURL,
                                    senderName: currentUser.displayName,
                                    date: today,
                                    photoMessage: downloadURL,
                                }),
                            });
                        }
                    });
                }
            );

        } else if (fileI) {
            const storageRef = ref(storage, MessageGroupId);

            const uploadTask = uploadBytesResumable(storageRef, fileI);

            uploadTask.on(
                (error) => {
                    //setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log(text);
                        if (text === "") {
                            if (text === "" && !fileI) {

                            } else if (text === "" && fileI) {
                                await updateDoc(doc(db, "GroupsChat", params.uid), {
                                    Messages: arrayUnion({
                                        uid: params.uid,
                                        senderId: currentUser.uid,
                                        senderPhoto: currentUser.photoURL,
                                        senderName: currentUser.displayName,
                                        date: today,
                                        fileMessage: downloadURL,
                                    }),
                                });
                            }

                        } else {
                            await updateDoc(doc(db, "GroupsChat", params.uid), {
                                Messages: arrayUnion({
                                    uid: params.uid,
                                    text,
                                    senderId: currentUser.uid,
                                    senderPhoto: currentUser.photoURL,
                                    senderName: currentUser.displayName,
                                    date: today,
                                    fileMessage: downloadURL,
                                }),
                            });
                        }
                    });
                }
            );
        }
        else {
            if (text === "") {

            } else {
                await updateDoc(doc(db, "GroupsChat", params.uid), {
                    Messages: arrayUnion({
                        uid: params.uid,
                        text,
                        senderId: currentUser.uid,
                        senderPhoto: currentUser.photoURL,
                        senderName: currentUser.displayName,
                        date: today,
                    }),
                });
            }
        }


        setText("");
        setImg(null);
        setFileI(null);
    };

    return (


        <div className='input-grupo'>
            <FontAwesomeIcon icon={faFaceLaughSquint} style={{ color: "gray" }} onClick={() => setShowPicker(val => !val)} />
            {showPicker && <EmojiPicker
                pickerStyle={{ width: '100%', height: '80vh' }}
                onEmojiClick={onEmojiClick} />}

            <input type="text" placeholder='Type something...' onChange={e => setText(e.target.value)} value={text} />
            <div className="send">
                <input type="file" accept='file/*' style={{ display: "none" }} id="file-id" onChange={e => setFileI(e.target.files[0])} />
                <label htmlFor='file-id'>
                    <FontAwesomeIcon icon={faPaperclip} />
                </label>
                <input type="file" style={{ display: "none" }} id="file" onChange={e => setImg(e.target.files[0])} />
                <label htmlFor='file'>
                    <FontAwesomeIcon icon={faImages} />
                </label>
                <button onClick={handleSend}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </div>
    );

}

export default InputChat;