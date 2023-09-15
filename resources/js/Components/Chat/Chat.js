import styles from './Chat.module.css';
import React, { useState } from 'react';
import Right from "../../../assets/icons/arrowRight.svg";
import Cross from "../../../assets/icons/cross.svg";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedChat from '../../Containers/AnimatedPage/AnimatedChat';
import AnimatedCard from '../../Containers/AnimatedPage/AnimatedCard';
import { useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = props => {
    const {
        setAddPerson,
        addPerson
    } = props;

    const [chatDisplayed, setChatDisplayed] = useState(true);
    const [people, setPeople] = useState(null);
    const [activeChat, setActiveChat] = useState(null);
    const [msg, setMsg] = useState("");
    const [chat, setChat] = useState([]);

    const divRef = useRef(null);
    const scrollToBottom = () => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    };
    
    const handleCloseChat = () => {
        setChatDisplayed(false);
    }

    useEffect(() => {
        if(addPerson)
            addPersonF(addPerson);
    }, [addPerson]);

    const addPersonF = (id) => {
        setChatDisplayed(true);
        let exist = false;
        people?.forEach(person => {
            if(person.id == id) exist = true;
        });
        console.log("aaa");
        console.log(exist?"yeah":"nope");
        if(exist) {
            changeChat(id);
        } else {
            console.log("ggg");
            const apiUrl = '/api/user/getSimpleData/'; // Replace with your actual API endpoint
            axios.post(apiUrl/*, {
                ids: [id]
            }*/)
            .then(response => {
                if(response.data.msg = "done") {
                    localStorage.setItem('people', localStorage.getItem('people')?localStorage.getItem('people') + ',' + id:id);
                    if(people)
                        setPeople([...people, response.data.people[0]]);
                    else 
                        setPeople([response.data.people[0]]);
                    changeChat(id);
                    if(!chatDisplayed) setChatDisplayed(true);
                }
                setAddPerson("");
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        }
    }

    useEffect(() => {
        let ids = localStorage.getItem('people')?.split(',');
        if(ids && ids.length != 0) {
            const apiUrl = '/api/user/getSimpleData/'; // Replace with your actual API endpoint
            axios.post(apiUrl/*, {
                ids
            }*/)
            .then(response => {
                if(response.data.msg = "done") {
                    setPeople(response.data.people);
                }
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        }
        let a = localStorage.getItem('activeChat');
        if(a) {
            setActiveChat(a);

            loadChat(a);
        }
    }, []);

    useEffect(() => {
        setInterval(() => {
            loadChat(null, false);
        }, 3000);
    }, []);

    const loadChat = (a, change = false) => {
        let ac = localStorage.getItem("activeChat");
        if(ac || a) {
            if(!a) {
                a = ac;
            } 
            const apiUrl = '/api/chat/get/' + a; // Replace with your actual API endpoint
            axios.get(apiUrl)
            .then(response => {
                if(response.data.msg = "done") {
                    setChat(response.data.chat);
                    scrollToBottom();
                    if(change) {
                        setActiveChat(a);
                        localStorage.setItem("activeChat", a);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }

    const changeChat = (id, e) => {
        if(activeChat != id)
            loadChat(id, true);
    }

    const toggleChat = () => {
        setChatDisplayed(!chatDisplayed);
    }

    const handleMsg = (e) => {
        setMsg(e.target.value);
    }

    const sendMsg = () => {
        const apiUrl = '/api/chat/send'; // Replace with your actual API endpoint
        axios.post(apiUrl, {
            id: activeChat,
            msg
        })
        .then(response => {
            if(response.data.msg == "done") {
                setChat([...chat, response.data.message]);
            }
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
        setMsg("");
    }

    const closeChat = (key, id, e) => {
        if(id == activeChat) {
            if(people.length == 1) {
                setPeople(null);
                setActiveChat(null);
                localStorage.removeItem("activeChat");
                localStorage.removeItem("people");
            } else {
                let k = people[(key + 1) % people.length].id;
                setActiveChat(k);
                localStorage.setItem("activeChat", k);
                let p = people;
                p.splice(key, 1);
                setPeople([...p]);
                let ids = "";
                p.forEach(person => {
                    ids += person.id + ","
                });
                localStorage.setItem("people", ids.slice(0, ids.length - 1));
            }
        } else {
            let p = people;
            p.splice(key, 1);
            setPeople([...p]);
            let ids = "";
            p.forEach(person => {
                ids += person.id + ","
            });
            localStorage.setItem("people", ids.slice(0, ids.length - 1));
        }
    }

    return (
        people?<AnimatedChat>
            <span className={`${styles.chatBtn} ` + (chatDisplayed?styles.show:'')} onClick={toggleChat}>
                <svg viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g id="Communication / Chat_Circle"><path id="Vector" d="M7.50977 19.8018C8.83126 20.5639 10.3645 21 11.9996 21C16.9702 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.6351 3.43604 15.1684 4.19819 16.4899L4.20114 16.495C4.27448 16.6221 4.31146 16.6863 4.32821 16.7469C4.34401 16.804 4.34842 16.8554 4.34437 16.9146C4.34003 16.9781 4.3186 17.044 4.27468 17.1758L3.50586 19.4823L3.50489 19.4853C3.34268 19.9719 3.26157 20.2152 3.31938 20.3774C3.36979 20.5187 3.48169 20.6303 3.62305 20.6807C3.78482 20.7384 4.02705 20.6577 4.51155 20.4962L4.51758 20.4939L6.82405 19.7251C6.95537 19.6813 7.02214 19.6591 7.08559 19.6548C7.14475 19.6507 7.19578 19.6561 7.25293 19.6719C7.31368 19.6887 7.37783 19.7257 7.50563 19.7994L7.50977 19.8018Z" /></g></svg>
            </span>
            <div className={`${styles.chatWindow} ` + (chatDisplayed?styles.show:'')}>
                <div className={styles.top}>
                    <span className={chatDisplayed?styles.close:styles.open} onClick={toggleChat}>
                        <svg className={styles.cross} version="1.1" id="Capa_1" fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 94.926 94.926" xmlSpace="preserve"><g><path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0 c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096 c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476 c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62 s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                    </span>
                    {people.map((person, key) => {
                        return <div className={`${styles.person} ` + (person.id == activeChat?styles.active:"")} key={key}>
                            <span className={styles.c} onClick={closeChat.bind(this, key, person.id)}>x</span>
                            { person.imgType!=null?
                                <img className={styles.img} src={"../../assets/users/" + person.id + "." + person.imgType} onClick={changeChat.bind(this,person.id)} />:
                                <svg className={styles.img} viewBox="-1 -1 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={changeChat.bind(this,person.id)} ><path fillRule="evenodd" clipRule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" fill="#eee"/></svg>
                            }
                            <span className={styles.name}>{person.name}</span>
                        </div>
                    })}
                </div>
                <div className={styles.middle} ref={divRef}>
                    {
                        chat.map((msg, key) => {
                            return <div key={key} 
                                className={`${styles.chat_text} ` + 
                                    (msg.to == activeChat?styles.me:styles.him) + " " +
                                    (chat[key + 1]?.to != msg.to?styles.end:"") + " " +
                                    (chat[key - 1]?.to != msg.to?styles.start:"")}>
                                <span className={styles.msg}>{msg.msg}</span>
                            </div>
                        })
                    }
                </div>
                <div className={styles.bottom}>
                    <input className={styles.input} value={msg} onChange={handleMsg}/>
                    <button className={styles.send} onClick={sendMsg}>{'>'}</button>
                </div>
        </div>
        </AnimatedChat>:null
    );
  }
  
  export default Chat;