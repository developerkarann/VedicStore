import React, { useEffect, useState } from 'react'
import './contact.css'
import { contactSubmit } from '../../../actions/contactAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { CONTACT_RESET } from '../../../constants/contactConstants'


export default function ContactUs() {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, isSubmit } = useSelector((state) => state.contact)

    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        description: "",
    })

    const { name, email, subject, description } = contact

    const contactDataChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    const contactSubmitHandler = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.set('name', name)
        myForm.set('email', email)
        myForm.set('subject', subject)
        myForm.set('description', description)

        dispatch(contactSubmit(myForm))
    }

    useEffect(() => {
      if (isSubmit) {
        alert.success('Message has been sent successfully!')
        dispatch({type: CONTACT_RESET})
      }
    }, [isSubmit, alert,dispatch, ])
    

    return (
        <>
            <section className="contact" id="contact">
                <div className="max-width">
                    <h2 className="title">Contact Us</h2>
                    <div className="contact-content">
                        <div className="column left">
                            <div className="text">Get In Touch</div>
                            <p>
                                Here are our details which can help you to connect with us! Choose a best and comfortable way...
                            </p>
                            <div className="icons">
                                <div className="row">
                                    <i className="fas fa-user"></i>
                                    <div className="info">
                                        <div className="head">Name</div>
                                        <div className="sub-title">Karan Pal</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div className="info">
                                        <div className="head">Address</div>
                                        <div className="sub-title">Shiva Studio, Moradabad City, Uttar Pradesh, India</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <i className="fas fa-envelope"></i>
                                    <div className="info">
                                        <div className="head">Email</div>
                                        <div className="sub-title">karanpal03040@gmail.com</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <a href="https://www.linkedin.com/in/karan-pal-developer/" rel="noreferrer" target='_blank' style={{ marginRight: "25px" }}><i class="fa-brands fa-linkedin"></i></a>
                                    <a href="https://github.com/karanpal03040" target='_blank' rel="noreferrer" style={{ marginRight: "25px" }}><i class="fa-brands fa-github"></i></a>
                                    <a href="https://www.instagram.com/karan_sanatanii/" target='_blank' rel="noreferrer" style={{ marginRight: "25px" }}><i class="fa-brands fa-instagram"></i></a>
                                </div>

                            </div>
                        </div>
                        <div className="column right">
                            <div className="text">Message Us</div>
                            <form onSubmit={contactSubmitHandler}>
                                <div className="fields">
                                    <div className="field name">
                                        <input value={name} onChange={contactDataChange} type="text" placeholder="Name" name="name" required />
                                    </div>
                                    <div className="field email">
                                        <input value={email} onChange={contactDataChange} type="email" placeholder="E-mail" name="email" required />
                                    </div>
                                </div>
                                <div className="field sub">
                                    <input type="text" value={subject} onChange={contactDataChange} placeholder="Subject" name="subject" required />
                                </div>
                                <div className="field textarea">
                                    <textarea
                                        cols="30"
                                        rows="10"
                                        placeholder="Description..."
                                        name="description"
                                        onChange={contactDataChange}
                                        value={description}
                                        required
                                    ></textarea>
                                </div>
                                <div className="button">
                                    <button type="submit" disabled={loading ? true : false} >{loading ? 'Loading!' : 'Send Message'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
