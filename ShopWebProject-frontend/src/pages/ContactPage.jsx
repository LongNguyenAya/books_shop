import './ContactPage.css';

function ContactPage() {
  return (
    <section className='contact-page'>
      <div className='contact-page__container'>
        <div className='contact-card'>
          <div className='contact-card__hero'>
            <h1>Contact Us</h1>
            <p>Have a question, feedback, or need help with an order? Send us a message and we’ll get back to you soon.</p>
          </div>

          <form className='contact-form'>
            <div className='form-row'>
              <label htmlFor='name'>Name</label>
              <input id='name' type='text' placeholder='Your name' />
            </div>

            <div className='form-row'>
              <label htmlFor='email'>Email</label>
              <input id='email' type='email' placeholder='Your email address' />
            </div>

            <div className='form-row'>
              <label htmlFor='message'>Message</label>
              <textarea
                id='message'
                placeholder='Write your message here...'
                rows='8'
              />
            </div>

            <button type='submit' className='btn-submit'>Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
