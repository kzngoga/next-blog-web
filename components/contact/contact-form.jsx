import React, { useEffect, useRef, useState } from "react";
import styles from "./contact-form.module.css";
import Notification from "../ui/notification";

export default function ContactForm() {
  const [activeNotification, setActiveNotification] = useState(null);

  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const messageInputRef = useRef(null);

  function clearForm() {
    emailInputRef.current.value = null;
    nameInputRef.current.value = null;
    messageInputRef.current.value = null;
  }

  async function submitHandler(e) {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const name = nameInputRef.current.value;
    const message = messageInputRef.current.value;

    if (
      !email.trim() === "" ||
      !email.includes("@") ||
      !name.trim() === "" ||
      !message.trim() === ""
    ) {
      return setActiveNotification({
        message: "Pls fill all fields in the form!",
        title: "Form Validation Error",
        status: "success",
      });
    }

    try {
      const payload = { email, name, message };

      setActiveNotification({
        message: "Your message is being sent...",
        title: "Message sending",
        status: "pending",
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) throw result;

      clearForm();
      setActiveNotification({
        message: "Your message was sent successfully!",
        title: "Message sent",
        status: "success",
      });
    } catch (error) {
      setActiveNotification({
        message: "Your message failed to send successfully!",
        title: error.message || "Message not sent!",
        status: "error",
      });
    }
  }

  useEffect(() => {
    if (
      activeNotification &&
      ["success", "error"].includes(activeNotification.status)
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  return (
    <>
      <section className={styles.contact}>
        <h1>How can I help you?</h1>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.controls}>
            <div className={styles.control}>
              <label htmlFor="email">Your Email</label>
              <input ref={emailInputRef} type="email" id="email" />
            </div>
            <div className={styles.control}>
              <label htmlFor="email">Your Name</label>
              <input ref={nameInputRef} type="text" id="name" />
            </div>
          </div>

          <div className={styles.control}>
            <label htmlFor="email">Your Message</label>
            <textarea ref={messageInputRef} id="message" rows={5} />
          </div>

          <div className={styles.actions}>
            <button>Send Message</button>
          </div>
        </form>
      </section>

      {activeNotification && (
        <Notification
          message={activeNotification.message}
          status={activeNotification.status}
          title={activeNotification.title}
        />
      )}
    </>
  );
}
