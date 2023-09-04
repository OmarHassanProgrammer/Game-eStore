import styles from './Chat.module.css';
import React, { useState } from 'react';
import Right from "../../../assets/icons/arrowRight.svg";
import Cross from "../../../assets/icons/cross.svg";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedChat from '../../Containers/AnimatedPage/AnimatedChat';
import AnimatedCard from '../../Containers/AnimatedPage/AnimatedCard';
import { useEffect } from 'react';
import axios from 'axios';

const Chat = props => {
    const {
        addPerson
    } = props;

    const [chatDisplayed, setChatDisplayed] = useState(true);
    const [people, setPeople] = useState(null);
    const [activeChat, setActiveChat] = useState(null);
    const [msg, setMsg] = useState("");
    const [chat, setChat] = useState([]);

    const handleCloseChat = () => {
        setChatDisplayed(false);
    }

    useEffect(() => {
        if(addPerson)
            addPersonF(addPerson);
    }, [addPerson]);

    const addPersonF = (id) => {
        let exist = false;
        people?.forEach(person => {
            if(person.id == id) exist = true;
        });
        if(exist) {
            changeChat(id);
        } else {
            const apiUrl = '/api/user/getSimpleData/'; // Replace with your actual API endpoint
            axios.post(apiUrl, {
                ids: [id]
            })
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
            axios.post(apiUrl, {
                ids
            })
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
            <div className={`${styles.chatWindow} ` + (chatDisplayed?styles.show:'')}>
                <div className={styles.top}>
                    <span className={chatDisplayed?styles.close:styles.open} onClick={toggleChat}>
                        C
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
                <div className={styles.middle}>
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