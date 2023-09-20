import React from 'react'
import newsletterSectionClasses from "./newsLetterClassNames";
const NewsLetter = () => {
    return (
        <section className={newsletterSectionClasses.container}>
            <h2 className={newsletterSectionClasses.heading}>
                Stay in the loop
            </h2>
            <p className={newsletterSectionClasses.subHeading}>
                Subscribe to Our Newsletter for Exclusive Game Updates, Offers, and
                Tips.
            </p>

            <div className={newsletterSectionClasses.cardContainer}>
                <div className={newsletterSectionClasses.cardLeft}>
                    <h3 className={newsletterSectionClasses.cardHeading}>
                        Sign Up for Our Newsletter
                    </h3>
                    <p className={newsletterSectionClasses.cardSubHeading}>
                        Get the latest news and updates delivered straight to your inbox.
                    </p>
                </div>
            </div>
            <form className={newsletterSectionClasses.formContainer}>
                <input 
                    className={newsletterSectionClasses.inputField} 
                    type="email" 
                    placeholder='Enter your email' />
                    <button type="button" className={newsletterSectionClasses.button}>Subscribe</button>
            </form>
        </section>
    )
}

export default NewsLetter